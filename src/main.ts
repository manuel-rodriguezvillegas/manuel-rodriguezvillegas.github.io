import { portfolioData, siteContent, timelineData } from './content.js';
import type { Award, Education, Experience, Project, TimelineDate, TimelineEvent } from './types.js';

function getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) throw new Error(`Missing required element: ${selector}`);
    return element;
}

// ===================================
// DOM Content Loaded
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupThemeToggle();
    setupReadingProgress();
    setupJourneyLinking();
    setupTimelineResize();
});

// ===================================
// Theme (light / dark)
// ===================================
// The blocking theme script applies the initial preference before paint.
// This module wires up the navbar switch.
function setupThemeToggle(): void {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    updateThemeLabel();
    btn.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        savePreference('preferredTheme', next);
        updateThemeLabel();
    });
}

// Theme preferences are optional when browser storage is unavailable.
function savePreference(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch (_) { /* Keep the page usable. */ }
}

function updateThemeLabel(): void {
    const dark = document.documentElement.dataset.theme === 'dark';
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.setAttribute('aria-label', 'Dark mode');
    button.setAttribute('aria-checked', String(dark));
}

// ===================================
// Initialize portfolio content
// ===================================
function initializePortfolio(): void {
    // Old language-specific links continue to work as the English page.
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
        url.searchParams.delete('lang');
        window.history.replaceState(null, '', url);
    }
    renderTimeline();
    renderExperience();
    renderEducation();
    renderProjects();
    renderSkills();
    renderAwards();
    getElement('footer .copyright').textContent = `© ${new Date().getFullYear()} Manuel Rodríguez Villegas. All rights reserved.`;
    setupScrollAnimations();
}

// ===================================
// Render Timeline (Journey Section)
// ===================================
function parseYearMonth(ym: TimelineDate): { year: number; month: number } {
    // Accepts "YYYY-MM" or "present"
    if (ym === 'present') {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() + 1 };
    }
    const [year, month] = ym.split('-');
    return { year: Number(year), month: Number(month) };
}

function renderTimeline(): void {
    const container = getElement('#timeline-container');
    const labels = siteContent.journey;
    const events = timelineData.events;
    const monthIndex = (value: TimelineDate) => {
        const { year, month } = parseYearMonth(value);
        return year * 12 + month - 1;
    };
    const start = Math.floor(Math.min(...events.map(event => monthIndex(event.start))) / 12) * 12;
    const end = Math.ceil(Math.max(...events.map(event => monthIndex(event.end) + 1)) / 12) * 12;
    const span = end - start;
    const width = Math.max(1, container.clientWidth);
    const labelWidth = Math.min(width, width < 600 ? 140 : 170);
    const laneHeight = 88;
    const position = (month: number) => (month - start) / span * 100;
    const years: string[] = [];
    for (let year = start / 12; year < end / 12; year++) {
        years.push(`<span style="left:${position(year * 12)}%">${year}</span>`);
    }
    function renderHalf(list: TimelineEvent[], side: 'above' | 'below'): string {
        const lanes: number[] = [];
        const placedLabels: { lane: number; left: number; right: number }[] = [];
        const paths = [...list].sort((a,b) => a.start.localeCompare(b.start)).map(event => {
            const left = position(monthIndex(event.start));
            const length = (monthIndex(event.end) + 1 - monthIndex(event.start)) / span * 100;
            const midpoint = (left + length / 2) / 100 * width;
            const labelLeft = Math.max(0, Math.min(midpoint - labelWidth / 2, width - labelWidth));
            const occupiedStart = Math.min(labelLeft, left / 100 * width);
            const occupiedEnd = Math.max(labelLeft + labelWidth, (left + length) / 100 * width) + 14;
            let lane = lanes.findIndex(end => end <= occupiedStart);
            if (lane < 0) lane = lanes.length;
            lanes[lane] = occupiedEnd;
            // Keep long stems clear of labels closer to the shared baseline.
            let corridors: [number, number][] = [[Math.max(labelLeft + 6, left / 100 * width),
                Math.min(labelLeft + labelWidth - 6, (left + length) / 100 * width)]];
            for (const label of placedLabels.filter(label => label.lane < lane)) {
                corridors = corridors.flatMap(([from, to]): [number, number][] => {
                    if (to <= label.left - 6 || from >= label.right + 6) return [[from, to]];
                    const segments: [number, number][] = [[from, Math.min(to, label.left - 6)],
                        [Math.max(from, label.right + 6), to]];
                    return segments.filter(([a, b]) => b > a);
                });
            }
            const connector = corridors.map(([from, to]) => Math.max(from, Math.min(midpoint, to)))
                .sort((a, b) => Math.abs(a - midpoint) - Math.abs(b - midpoint))[0] ?? midpoint;
            placedLabels.push({ lane, left: labelLeft, right: labelLeft + labelWidth });
            const endLabel = event.end === 'present' ? labels.present : formatMonthYear(event.end);
            const name = event.ref === 'bsc-math-ai'
                ? 'ICAI · BEng'
                : event.ref === 'msc-ai'
                    ? 'ICAI · Master’s'
                    : event.institution === 'Imperial College London' ? 'Imperial' : event.institution;
            const startLabel = event.end !== 'present' && event.start.slice(0, 4) === event.end.slice(0, 4)
                ? formatMonthYear(event.start).split(' ')[0]
                : formatMonthYear(event.start);
            const description = `${event.institution}, ${event.title}, ${formatMonthYear(event.start)} — ${endLabel}`;
            return `<a class="journey-milestone compact-event compact-${event.type}" href="${event.type === 'professional' ? '#experience' : '#education'}" data-ref="${event.ref}" aria-label="${description}" title="${event.title}"
                style="--bar-left:${left}%;--bar-width:${length}%;--label-left:${labelLeft}px;--label-width:${labelWidth}px;--connector-left:${connector}px;--label-offset:${lane * laneHeight}px;${side === 'above' ? 'bottom' : 'top'}:0px">
                <span class="compact-label"><img src="${event.logo}" alt="" width="24" height="24" loading="lazy" decoding="async"><span><strong>${name}</strong><small>${startLabel} – ${endLabel}</small></span></span>
                <span class="compact-connector" aria-hidden="true"></span>
                <span class="compact-bar" aria-hidden="true"></span>
            </a>`;
        }).join('');
        return `<div class="compact-half compact-${side}" style="height:${lanes.length * laneHeight}px">${paths}</div>`;
    }
    container.innerHTML = `<div class="compact-timeline">
        ${renderHalf(events.filter(event => event.type !== 'professional'), 'above')}
        <div class="compact-axis" aria-hidden="true">${years.join('')}</div>
        ${renderHalf(events.filter(event => event.type === 'professional'), 'below')}
        <div class="compact-legend"><span>${labels.academic}</span><span>${labels.professional}</span></div>
    </div>`;
}

function setupTimelineResize(): void {
    const container = getElement('#timeline-container');
    let width = container.clientWidth;
    let frame = 0;
    new ResizeObserver(() => {
        if (width === container.clientWidth) return;
        width = container.clientWidth;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(renderTimeline);
    }).observe(container);
}

function formatMonthYear(ym: TimelineDate): string {
    if (ym === 'present') return siteContent.journey.present;
    const { year, month } = parseYearMonth(ym);
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${monthsEn[month - 1]} ${year}`;
}

// ===================================
// Render Experience Section
// ===================================
function renderExperience(): void {
    const container = getElement('#experience-container');
    const data = portfolioData.experience;

    data.forEach(exp => {
        const card = createExperienceCard(exp);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createExperienceCard(exp: Experience): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'card';
    if (exp.id) card.dataset.itemId = exp.id;

    const linkText = siteContent.links.viewWebsite;
    const linkHTML = exp.link
        ? `<a href="${exp.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';

    const logoHTML = exp.logo
        ? `<img src="${exp.logo}" alt="${exp.company}" class="card-logo" loading="lazy" decoding="async">`
        : '';

    card.innerHTML = `
        <div class="card-header">
            <div class="card-header-content">
                ${logoHTML}
                <div>
                    <h3 class="card-title">${exp.title}</h3>
                    <p class="card-subtitle">${exp.company}</p>
                </div>
            </div>
            <div class="card-meta"><span class="card-date">${exp.date}</span><span class="card-location">${exp.location}</span></div>
        </div>
        <p class="card-description">${exp.description}</p>
        ${linkHTML}
    `;

    return card;
}

// ===================================
// Render Education Section
// ===================================
function renderEducation(): void {
    const container = getElement('#education-container');
    const data = portfolioData.education;

    data.forEach(edu => {
        const card = createEducationCard(edu);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createEducationCard(edu: Education): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'card';
    if (edu.id) card.dataset.itemId = edu.id;

    const linkText = siteContent.links.viewProgram;
    const linkHTML = edu.link
        ? `<a href="${edu.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';

    const logoHTML = edu.logo
        ? `<img src="${edu.logo}" alt="${edu.institution}" class="card-logo" loading="lazy" decoding="async">`
        : '';

    // Handle honors section separately if it exists
    const honorsHTML = edu.honors
        ? `<p class="card-description card-honors"> ${edu.honors}</p>`
        : '';

    card.innerHTML = `
        <div class="card-header">
            <div class="card-header-content">
                ${logoHTML}
                <div>
                    <h3 class="card-title">${edu.degree}</h3>
                    <p class="card-subtitle">${edu.institution}</p>
                </div>
            </div>
            <div class="card-meta"><span class="card-date">${edu.date}</span><span class="card-location">${edu.location}</span></div>
        </div>
        <p class="card-description">${edu.description}</p>
        ${honorsHTML}
        ${linkHTML}
    `;

    return card;
}

// ===================================
// Render Projects Section
// ===================================
function renderProjects(): void {
    const container = getElement('#projects-container');
    const data = portfolioData.projects;

    data.forEach((project, index) => {
        const card = createProjectCard(project, index);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createProjectCard(project: Project, index: number): HTMLElement {
    const card = document.createElement('article');
    card.className = 'work-card';
    card.id = project.imageId;
    card.setAttribute('aria-labelledby', `${project.imageId}-title`);
    const labels = siteContent.projects;
    const linkHTML = project.link
        ? `<a href="${project.link}" class="work-link" target="_blank" rel="noopener" aria-label="View code: ${project.title}">View code <span aria-hidden="true">↗</span></a>`
        : `<span class="work-private">${labels.private}</span>`;
    const titleHTML = project.link
        ? `<a href="${project.link}" class="work-title-link" target="_blank" rel="noopener">${project.title}</a>`
        : project.title;
    const imageHTML = `<img src="${project.image}" alt="${project.imageAlt || project.title}" width="${project.imageWidth}" height="${project.imageHeight}" loading="lazy" decoding="async">`;
    const pictureHTML = project.imageWebp
        ? `<picture><source srcset="${project.imageWebpSrcset || project.imageWebp}" sizes="(max-width: 620px) calc(100vw - 2rem), 340px" type="image/webp">${imageHTML}</picture>`
        : imageHTML;
    const creditHTML = project.imageCredit
        ? `<a class="work-credit" href="${project.imageCredit.url}" target="_blank" rel="noopener nofollow">${project.imageCredit.text}</a>`
        : '';
    card.innerHTML = `
        <figure class="work-figure">
            <a class="work-image" href="${project.image}" target="_blank" rel="noopener" aria-label="Open image: ${project.title}">${pictureHTML}<span class="work-image-expand" aria-hidden="true">↗</span></a>
            ${creditHTML ? `<figcaption>${creditHTML}</figcaption>` : ''}
        </figure>
        <div class="work-content">
            <p class="work-category"><span class="work-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${project.category}</p>
            <h3 class="work-title" id="${project.imageId}-title">${titleHTML}</h3>
            <p class="work-deck">${project.summary}</p>
            <div class="work-actions">
                <details class="work-details">
                    <summary>${labels.about}<span aria-hidden="true">+</span></summary>
                    <div class="work-description"><p>${project.description}</p><p class="work-tech"><span class="sr-only">${labels.technologies}: </span>${project.tech}</p></div>
                </details>
                ${linkHTML}
            </div>
        </div>
    `;
    return card;
}

// ===================================
// Render Skills Section
// ===================================
function renderSkills(): void {
    const container = getElement('#skills-container');
    const data = portfolioData.skills;

    Object.entries(data).forEach(([category, skills]) => {
        const skillCard = createSkillCard(category, skills);
        skillCard.classList.add('reveal');
        container.appendChild(skillCard);
    });
}

// Mapping: skill name (normalized) -> icon file in assets/icons/tech.
// Most are Simple Icons (CC0); JAX uses its official project SVG. Served
// from this repo rather than a CDN: one
// less third party in the critical path, works offline, and no visitor IPs
// leaking to someone else's server. Brand colors are baked into each SVG.
// Skills not in this map render as plain text tags — that's intentional for
// abstract concepts (Deep Learning, Linear Algebra, Robotics, PINNs, etc.)
// and for technologies without a suitable local logo.
const SKILL_ICONS = {
    "python":      "python",
    "pytorch":     "pytorch",
    "jax":         "jax",
    "ros":         "ros",
    "git":         "git",
    "docker":      "docker",
    "n8n":         "n8n"
};

const SKILL_ICON_PATH = 'assets/icons/tech';

function getSkillIcon(skillName: string): string | null {
    const lower = skillName.toLowerCase().trim();
    // Match either exact, or with a space/parenthesis/number right after the key.
    // This prevents false positives like "Robotics" matching "ros", or
    // "Python (Advanced)" still matching "python".
    const entries = Object.entries(SKILL_ICONS).sort(([a], [b]) => b.length - a.length);
    for (const [key, icon] of entries) {
        if (lower === key) {
            return `${SKILL_ICON_PATH}/${icon}.svg`;
        }
        // Allow: "python (advanced)", "ros 2", "sql (postgres)"
        // Disallow: "robotics" matching "ros"
        const nextChar = lower.charAt(key.length);
        if (lower.startsWith(key) && (nextChar === ' ' || nextChar === '(' || /[0-9]/.test(nextChar))) {
            return `${SKILL_ICON_PATH}/${icon}.svg`;
        }
    }
    return null;
}

function createSkillCard(category: string, skills: string[]): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'skill-category';

    const skillTags = skills
        .map(skill => {
            const iconUrl = getSkillIcon(skill);
            const iconHTML = iconUrl
                ? `<img src="${iconUrl}" alt="" class="skill-tag-icon" loading="lazy" decoding="async">`
                : '';
            return `<span class="skill-tag${iconUrl ? ' has-icon' : ''}">${iconHTML}${skill}</span>`;
        })
        .join('');

    card.innerHTML = `
        <h3>${category}</h3>
        <div class="skill-tags">
            ${skillTags}
        </div>
    `;

    return card;
}

// ===================================
// Render Awards Section
// ===================================
function renderAwards(): void {
    const container = getElement('#awards-container');
    const data = portfolioData.awards;

    data.forEach(award => {
        const card = createAwardCard(award);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createAwardCard(award: Award): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'award-card';

    const linkText = siteContent.links.viewAward;
    const linkHTML = (award.link !== null && award.link !== undefined)
        ? `<a href="${award.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';

    // Use image if available, otherwise use icon as SVG
    const iconHTML = award.image
        ? `<img src="${award.image}" alt="${award.title}" class="award-image" loading="lazy" decoding="async">`
        : `<img src="${award.icon}" alt="${award.title}" class="award-icon-svg" loading="lazy" decoding="async">`;

    card.innerHTML = `
        ${iconHTML}
        <div class="award-content">
            <h3 class="award-title">${award.title}</h3>
            <p class="award-year">${award.year}</p>
            <p class="award-description">${award.description}</p>
            ${linkHTML}
        </div>
    `;

    return card;
}

// ===================================
// Smooth Scrolling for Navigation
// ===================================
function setupSmoothScrolling(): void {
    // Delegated listener: also covers anchors rendered later
    // (timeline milestones and dynamically rendered cards).
    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const anchor = e.target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (!targetId) return;

        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            return;
        }

        // A timeline milestone goes to its own card rather than the section heading,
        // and flags it on arrival. Falls back to the section if there's no ref.
        const linkedCard = findLinkedCard(anchor.closest('.journey-milestone'));
        const targetElement = linkedCard || document.querySelector<HTMLElement>(targetId);

        if (targetElement) {
            const navHeight = getElement('#navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            history.replaceState(null, '', targetId);
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus({ preventScroll: true });
            if (linkedCard) flashLinkedCard(linkedCard);
        }
    });
}

// ===================================
// Journey <-> card cross-linking
// ===================================
// Timeline events carry a "ref" matching the "id" of an experience/education
// entry, so a bar and its card can find each other reliably.
const LINK_FLASH_MS = 1800;
let linkFlashTimer: number | undefined;

function findLinkedCard(timelineEvent: Element | null): HTMLElement | null {
    const ref = timelineEvent?.getAttribute('data-ref');
    return ref ? document.querySelector<HTMLElement>(`[data-item-id="${ref}"]`) : null;
}

function flashLinkedCard(card: HTMLElement): void {
    clearTimeout(linkFlashTimer);
    document.querySelectorAll('.is-flash').forEach(el => el.classList.remove('is-flash'));
    // The card may still be waiting on the scroll observer
    card.classList.add('is-visible', 'is-flash');
    linkFlashTimer = window.setTimeout(() => card.classList.remove('is-flash'), LINK_FLASH_MS);
}

// Hovering (or tabbing to) a timeline milestone marks its card. Bound to the
// container, which outlives the re-renders of its contents.
function setupJourneyLinking(): void {
    const container = getElement('#timeline-container');

    const setHighlight = (on: boolean) => (e: Event): void => {
        if (!(e.target instanceof Element)) return;
        const card = findLinkedCard(e.target.closest('.journey-milestone'));
        if (card) card.classList.toggle('is-linked', on);
    };

    container.addEventListener('mouseover', setHighlight(true));
    container.addEventListener('mouseout', setHighlight(false));
    container.addEventListener('focusin', setHighlight(true));
    container.addEventListener('focusout', setHighlight(false));
}

// ===================================
// Navbar Scroll Effect
// ===================================
function setupNavbarScroll(): void {
    const navbar = getElement('#navbar');
    let scrolled = false;

    const onScroll = () => {
        const isScrolled = window.scrollY > 0;
        if (isScrolled !== scrolled) {
            scrolled = isScrolled;
            navbar.classList.toggle('is-scrolled', scrolled);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ===================================
// Utility Functions
// ===================================

// Intersection Observer for scroll animations — adds "is-visible"
// to any element carrying the "reveal" class when it enters the viewport.
let revealObserver: IntersectionObserver | null = null;

function setupScrollAnimations(): void {
    // Disconnect before observing to keep repeated setup safe.
    if (revealObserver) revealObserver.disconnect();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.01,
        rootMargin: '0px 0px 140px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealObserver = observer;

    // Observe any element flagged as .reveal
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Safety: if for any reason the observer never fires for some elements
    // (e.g., print view, headless screenshot, prefers-reduced-motion already applied),
    // reveal anything still hidden after a short fallback interval.
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 1.35) {
                el.classList.add('is-visible');
            }
        });
    }, 600);
}

// ===================================
// Reading progress bar
// ===================================
function setupReadingProgress(): void {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);

    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = height > 0 ? (scrollTop / height) * 100 : 0;
        bar.style.transform = `scaleX(${pct / 100})`;
    };

    // Coalesce scroll events into one style write per frame
    let ticking = false;
    const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    new ResizeObserver(requestUpdate).observe(document.body);
    update();
}
