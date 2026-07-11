// ===================================
// Minimal 3D mesh viewer — no libraries
// ===================================
// Renders an icosphere on <canvas id="mesh-canvas"> with three modes
// (solid / wireframe / points), drag-to-rotate and idle auto-rotation.
// Colors are read from the CSS theme variables so the mesh follows
// light/dark mode automatically.
(function () {
    'use strict';

    const canvas = document.getElementById('mesh-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // --- Geometry: icosphere (subdivided icosahedron) ---
    function normalize(v) {
        const l = Math.hypot(v[0], v[1], v[2]);
        return [v[0] / l, v[1] / l, v[2] / l];
    }

    function buildIcosphere(subdivisions) {
        const t = (1 + Math.sqrt(5)) / 2;
        const verts = [
            [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
            [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
            [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
        ].map(normalize);
        let faces = [
            [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
            [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
            [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
            [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
        ];

        for (let s = 0; s < subdivisions; s++) {
            const midCache = new Map();
            const midpoint = (a, b) => {
                const key = a < b ? `${a}_${b}` : `${b}_${a}`;
                if (midCache.has(key)) return midCache.get(key);
                const va = verts[a], vb = verts[b];
                verts.push(normalize([
                    (va[0] + vb[0]) / 2,
                    (va[1] + vb[1]) / 2,
                    (va[2] + vb[2]) / 2
                ]));
                midCache.set(key, verts.length - 1);
                return verts.length - 1;
            };
            const next = [];
            for (const [a, b, c] of faces) {
                const ab = midpoint(a, b), bc = midpoint(b, c), ca = midpoint(c, a);
                next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
            }
            faces = next;
        }

        // Unique edges (for wireframe mode)
        const edgeSet = new Set();
        const edges = [];
        for (const [a, b, c] of faces) {
            for (const [u, v] of [[a, b], [b, c], [c, a]]) {
                const key = u < v ? `${u}_${v}` : `${v}_${u}`;
                if (!edgeSet.has(key)) {
                    edgeSet.add(key);
                    edges.push([u, v]);
                }
            }
        }
        return { verts, faces, edges };
    }

    const mesh = buildIcosphere(2); // 320 faces — clean low-poly look

    // --- Theme colors (re-read on theme change) ---
    let accentRGB = [212, 165, 116];
    let mutedColor = 'rgba(184, 147, 95, 0.7)';

    function hexToRgb(hex) {
        const h = hex.trim().replace('#', '');
        if (h.length !== 6) return null;
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }

    function readThemeColors() {
        const styles = getComputedStyle(document.documentElement);
        accentRGB = hexToRgb(styles.getPropertyValue('--accent')) || accentRGB;
        const dark = document.documentElement.dataset.theme === 'dark';
        mutedColor = dark ? 'rgba(212, 165, 116, 0.55)' : 'rgba(184, 147, 95, 0.6)';
    }
    readThemeColors();
    window.addEventListener('themechange', () => { readThemeColors(); requestRender(); });

    // --- State ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mode = 'solid';
    let rotX = 0.42, rotY = 0.6;
    let velY = 0;                 // drag inertia
    const AUTO_SPIN = prefersReducedMotion ? 0 : 0.0035;
    let dragging = false;
    let visible = false;
    let rafId = null;

    // --- Sizing (device-pixel aware) ---
    let width = 0, height = 0;
    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        requestRender();
    }
    window.addEventListener('resize', resize);

    // --- Projection ---
    const CAMERA = 4; // camera distance; sphere has radius 1
    function project(v, sinX, cosX, sinY, cosY, scale, cx, cy) {
        // Rotate around Y, then X
        const x1 = v[0] * cosY + v[2] * sinY;
        const z1 = -v[0] * sinY + v[2] * cosY;
        const y2 = v[1] * cosX - z1 * sinX;
        const z2 = v[1] * sinX + z1 * cosX;
        const persp = CAMERA / (CAMERA - z2);
        return [cx + x1 * persp * scale, cy - y2 * persp * scale, z2];
    }

    // --- Render ---
    function render() {
        ctx.clearRect(0, 0, width, height);
        if (width === 0 || height === 0) return;

        const cx = width / 2, cy = height / 2;
        const scale = Math.min(width, height) * 0.36;
        const sinX = Math.sin(rotX), cosX = Math.cos(rotX);
        const sinY = Math.sin(rotY), cosY = Math.cos(rotY);

        const projected = mesh.verts.map(v => project(v, sinX, cosX, sinY, cosY, scale, cx, cy));

        if (mode === 'solid') {
            // Painter's algorithm: sort faces back-to-front, flat shading
            const lit = [0.45, 0.65, 0.61]; // light direction (view space)
            const order = [];
            for (let i = 0; i < mesh.faces.length; i++) {
                const [a, b, c] = mesh.faces[i];
                const depth = projected[a][2] + projected[b][2] + projected[c][2];
                order.push([depth, i]);
            }
            order.sort((p, q) => p[0] - q[0]);

            for (const [, i] of order) {
                const [a, b, c] = mesh.faces[i];
                const pa = projected[a], pb = projected[b], pc = projected[c];
                // Backface culling via 2D winding
                const cross = (pb[0] - pa[0]) * (pc[1] - pa[1]) - (pb[1] - pa[1]) * (pc[0] - pa[0]);
                if (cross >= 0) continue;

                // Face normal in view space (average of rotated vertices ≈ normal for a sphere)
                const va = mesh.verts[a], vb = mesh.verts[b], vc = mesh.verts[c];
                const n = normalize([
                    (va[0] + vb[0] + vc[0]) / 3,
                    (va[1] + vb[1] + vc[1]) / 3,
                    (va[2] + vb[2] + vc[2]) / 3
                ]);
                const nx1 = n[0] * cosY + n[2] * sinY;
                const nz1 = -n[0] * sinY + n[2] * cosY;
                const ny2 = n[1] * cosX - nz1 * sinX;
                const nz2 = n[1] * sinX + nz1 * cosX;
                const intensity = Math.max(nx1 * lit[0] + ny2 * lit[1] + nz2 * lit[2], 0) * 0.72 + 0.28;

                const r = Math.round(accentRGB[0] * intensity);
                const g = Math.round(accentRGB[1] * intensity);
                const bl = Math.round(accentRGB[2] * intensity);
                ctx.fillStyle = `rgb(${r}, ${g}, ${bl})`;
                ctx.beginPath();
                ctx.moveTo(pa[0], pa[1]);
                ctx.lineTo(pb[0], pb[1]);
                ctx.lineTo(pc[0], pc[1]);
                ctx.closePath();
                ctx.fill();
                // Hairline stroke in the same color hides antialiasing seams
                ctx.strokeStyle = ctx.fillStyle;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        } else if (mode === 'wireframe') {
            ctx.strokeStyle = mutedColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (const [a, b] of mesh.edges) {
                ctx.moveTo(projected[a][0], projected[a][1]);
                ctx.lineTo(projected[b][0], projected[b][1]);
            }
            ctx.stroke();
        } else {
            // points — size and opacity fall off with depth
            for (const p of projected) {
                const depth = (p[2] + 1) / 2; // 0 (far) → 1 (near)
                const radius = 1.4 + depth * 1.8;
                ctx.globalAlpha = 0.35 + depth * 0.65;
                ctx.fillStyle = `rgb(${accentRGB[0]}, ${accentRGB[1]}, ${accentRGB[2]})`;
                ctx.beginPath();
                ctx.arc(p[0], p[1], radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }
    }

    // --- Animation loop (runs only while visible) ---
    function tick() {
        rafId = null;
        if (!dragging) {
            rotY += AUTO_SPIN + velY;
            velY *= 0.95; // inertia decay
            if (Math.abs(velY) < 0.0001) velY = 0;
        }
        render();
        const animating = visible && !document.hidden && (AUTO_SPIN !== 0 || velY !== 0 || dragging);
        if (animating) rafId = requestAnimationFrame(tick);
    }

    function requestRender() {
        if (rafId === null) rafId = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible) requestRender();
    }, { threshold: 0.05 });
    io.observe(canvas);

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) requestRender();
    });

    // --- Drag to rotate (vertical page scroll stays native via touch-action) ---
    let lastX = 0, lastY = 0;
    canvas.addEventListener('pointerdown', (e) => {
        dragging = true;
        velY = 0;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        requestRender();
    });
    canvas.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        rotY += dx * 0.006;
        rotX = Math.max(-1.35, Math.min(1.35, rotX + dy * 0.006));
        velY = dx * 0.0006;
        requestRender();
    });
    const endDrag = () => { dragging = false; requestRender(); };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    // --- Mode buttons ---
    document.querySelectorAll('.mesh-mode').forEach(btn => {
        btn.addEventListener('click', () => {
            mode = btn.dataset.mode;
            document.querySelectorAll('.mesh-mode').forEach(b =>
                b.classList.toggle('active', b === btn));
            requestRender();
        });
    });

    resize();
})();
