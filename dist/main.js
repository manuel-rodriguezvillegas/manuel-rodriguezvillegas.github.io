import { portfolioData, siteContent, timelineData } from './content.js';
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Missing required element: ${selector}`);
    return element;
}
// ===================================
// DOM Content Loaded
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupSmoothScrolling();
    setupNavigationMenu();
    setupMobileNavigationScroll();
    setupThemeToggle();
    setupTimelineInteraction();
    setupTimelineResize();
});
// ===================================
// Theme (light / dark)
// ===================================
// The blocking theme script applies the initial preference before paint.
// This module wires up the navbar switch.
function setupThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn)
        return;
    updateThemeLabel();
    btn.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        savePreference('preferredTheme', next);
        updateThemeLabel();
    });
}
// Theme preferences are optional when browser storage is unavailable.
function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch (_) { /* Keep the page usable. */ }
}
function updateThemeLabel() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const button = document.querySelector('.theme-toggle');
    if (!button)
        return;
    button.setAttribute('aria-label', 'Dark mode');
    button.setAttribute('aria-checked', String(dark));
}
// ===================================
// Initialize portfolio content
// ===================================
function initializePortfolio() {
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
function parseYearMonth(ym) {
    // Accepts "YYYY-MM" or "present"
    if (ym === 'present') {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() + 1 };
    }
    const [year, month] = ym.split('-');
    return { year: Number(year), month: Number(month) };
}
function timelineName(event) {
    if (event.ref === 'bsc-math-ai')
        return 'ICAI · BEng';
    if (event.ref === 'msc-ai')
        return 'ICAI · Master’s';
    if (event.institution === 'Imperial College London')
        return 'Imperial';
    if (event.institution === 'Cornell University')
        return 'Cornell';
    if (event.institution === 'Azzulei Technologies')
        return 'Azzulei';
    return event.institution;
}
function renderTimeline() {
    const container = getElement('#timeline-container');
    const labels = siteContent.journey;
    const events = [...timelineData.events].sort((a, b) => a.start.localeCompare(b.start));
    const monthIndex = (value) => {
        const { year, month } = parseYearMonth(value);
        return year * 12 + month - 1;
    };
    const start = Math.floor(Math.min(...events.map(event => monthIndex(event.start))) / 12) * 12;
    const end = Math.ceil(Math.max(...events.map(event => monthIndex(event.end) + 1)) / 12) * 12;
    const position = (month) => (month - start) / (end - start) * 100;
    const years = [];
    for (let year = start / 12; year < end / 12; year++) {
        years.push(`<span style="--year-position:${position(year * 12)}%">${year}</span>`);
    }
    const milestones = events.map(event => {
        const professional = event.type === 'professional';
        const dates = `${formatMonthYear(event.start)} – ${formatMonthYear(event.end)}`;
        const left = position(monthIndex(event.start));
        const length = position(monthIndex(event.end) + 1) - left;
        return `<li class="journey-milestone journey-${professional ? 'professional' : 'academic'}${event.type === 'exchange' ? ' journey-exchange' : ''}" data-ref="${event.ref}"
            style="--date-position:${left}%;--duration:${length}%">
            <span class="journey-duration" aria-hidden="true"></span>
            <div class="journey-marker">
            <button class="journey-node" id="journey-${event.ref}" type="button" aria-expanded="false"
                aria-controls="journey-detail-${event.ref}" aria-label="${event.institution}, ${event.title}, ${dates}">
                <span class="journey-logo"><img src="${event.logo}" alt="" width="36" height="36" loading="lazy" decoding="async"></span>
                <span class="journey-node-text"><strong>${timelineName(event)}</strong></span>
            </button>
            <div class="journey-detail" id="journey-detail-${event.ref}" role="region" aria-labelledby="journey-${event.ref}" hidden>
                <a href="#${professional ? 'experience' : 'education'}" class="journey-detail-link">
                    <span class="journey-detail-brand"><img src="${event.logo}" alt="" width="30" height="30"><span>${event.institution}</span></span>
                    <strong>${event.title}</strong><span class="journey-dates">${dates}</span>
                </a>
            </div>
            </div>
        </li>`;
    }).join('');
    container.innerHTML = `<div class="journey-legend"><span>${labels.academic}</span><span>${labels.professional}</span></div>
        <div class="journey-chart"><div class="journey-axis" aria-hidden="true">${years.join('')}</div>
            <ol class="journey-events">${milestones}</ol></div>`;
    layoutTimeline();
}
// Labels stay over their own duration bar. Where short periods are close,
// use the space within the next bar rather than adding lanes or connectors.
function layoutTimeline() {
    const container = getElement('#timeline-container');
    const width = container.clientWidth;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const length = mobile ? getElement('.journey-chart').clientHeight : width;
    const gap = mobile ? 76 : Math.min(84, width * .095);
    for (const category of ['academic', 'professional']) {
        const labelWidth = mobile ? 76 : category === 'academic' ? 110 : Math.min(76, gap - 6);
        let previous = -gap;
        const items = container.querySelectorAll(`.journey-${category}`);
        items.forEach(item => {
            const start = Number.parseFloat(item.style.getPropertyValue('--date-position')) / 100 * length;
            const duration = Number.parseFloat(item.style.getPropertyValue('--duration')) / 100 * length;
            const center = Math.min(start + duration, Math.max(start + duration / 2, previous + gap));
            previous = center;
            item.style.setProperty('--node-width', `${labelWidth}px`);
            item.style.setProperty('--node-position', `${center / length * 100}%`);
            const markerX = mobile ? width / 2 + (category === 'academic' ? -89 : 89) : center;
            const detailWidth = Math.min(236, width);
            const detailLeft = Math.max(0, Math.min(markerX - detailWidth / 2, width - detailWidth));
            item.style.setProperty('--detail-offset', `${detailLeft - markerX + labelWidth / 2}px`);
            item.style.setProperty('--detail-origin', `${markerX - detailLeft}px`);
        });
    }
}
function setupTimelineResize() {
    const container = getElement('#timeline-container');
    let width = container.clientWidth;
    let frame = 0;
    new ResizeObserver(() => {
        if (width === container.clientWidth)
            return;
        width = container.clientWidth;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(layoutTimeline);
    }).observe(container);
}
function setupTimelineInteraction() {
    const container = getElement('#timeline-container');
    const select = (button) => {
        container.querySelectorAll('.journey-node').forEach(node => {
            const active = node === button;
            node.setAttribute('aria-expanded', String(active));
            node.closest('.journey-milestone')?.classList.toggle('is-active', active);
            getElement(`#${node.getAttribute('aria-controls')}`).hidden = !active;
        });
    };
    const close = (restoreFocus) => {
        const active = container.querySelector('.journey-node[aria-expanded="true"]');
        select(null);
        if (restoreFocus)
            active?.focus({ preventScroll: true });
    };
    // The logo and its expanded card share a hover boundary, so moving onto
    // the detail link keeps it open. Touch continues to use the click handler.
    container.addEventListener('pointerover', event => {
        if (event.pointerType !== 'mouse' || !(event.target instanceof Element))
            return;
        const marker = event.target.closest('.journey-marker');
        if (!marker || (event.relatedTarget instanceof Node && marker.contains(event.relatedTarget)))
            return;
        if (container.querySelector('.journey-detail:focus-within'))
            return;
        select(marker.querySelector('.journey-node'));
    });
    container.addEventListener('pointerout', event => {
        if (event.pointerType !== 'mouse' || !(event.target instanceof Element))
            return;
        const marker = event.target.closest('.journey-milestone.is-active .journey-marker');
        if (!marker || (event.relatedTarget instanceof Node && marker.contains(event.relatedTarget)))
            return;
        if (!marker.contains(document.activeElement))
            close(false);
    });
    container.addEventListener('click', event => {
        if (!(event.target instanceof Element))
            return;
        const button = event.target.closest('.journey-node');
        if (button)
            select(button.getAttribute('aria-expanded') === 'true' ? null : button);
        if (event.target.closest('.journey-detail-link'))
            close(false);
    });
    document.addEventListener('click', event => {
        if (event.target instanceof Element && !event.target.closest('.journey-marker'))
            close(false);
    });
    container.addEventListener('keydown', event => {
        if (event.key === 'Escape')
            close(true);
    });
    container.addEventListener('focusout', event => {
        const active = container.querySelector('.journey-milestone.is-active');
        if (active && event.relatedTarget instanceof Node && !active.contains(event.relatedTarget))
            close(false);
    });
}
function formatMonthYear(ym) {
    if (ym === 'present')
        return siteContent.journey.present;
    const { year, month } = parseYearMonth(ym);
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthsEn[month - 1]} ${year}`;
}
// ===================================
// Render Experience Section
// ===================================
function renderExperience() {
    const container = getElement('#experience-container');
    const data = portfolioData.experience;
    data.forEach(exp => {
        const card = createExperienceCard(exp);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}
function createExperienceCard(exp) {
    const card = document.createElement('div');
    card.className = 'card';
    if (exp.id)
        card.dataset.itemId = exp.id;
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
function renderEducation() {
    const container = getElement('#education-container');
    const data = portfolioData.education;
    data.forEach(edu => {
        const card = createEducationCard(edu);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}
function createEducationCard(edu) {
    const card = document.createElement('div');
    card.className = 'card';
    if (edu.id)
        card.dataset.itemId = edu.id;
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
function renderProjects() {
    const container = getElement('#projects-container');
    const data = portfolioData.projects;
    data.forEach((project, index) => {
        const card = createProjectCard(project, index);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}
function createProjectCard(project, index) {
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
function renderSkills() {
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
    "python": "python",
    "pytorch": "pytorch",
    "jax": "jax",
    "ros": "ros",
    "git": "git",
    "docker": "docker",
    "n8n": "n8n"
};
const SKILL_ICON_PATH = 'assets/icons/tech';
function getSkillIcon(skillName) {
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
function createSkillCard(category, skills) {
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
function renderAwards() {
    const container = getElement('#awards-container');
    const data = portfolioData.awards;
    data.forEach(award => {
        const card = createAwardCard(award);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}
function createAwardCard(award) {
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
            <p class="award-meta"><span class="award-year">${award.year}</span><span class="award-location">${award.location}</span></p>
            <p class="award-description">${award.description}</p>
            ${linkHTML}
        </div>
    `;
    return card;
}
// ===================================
// Smooth Scrolling for Navigation
// ===================================
function setupSmoothScrolling() {
    // Delegated listener: also covers anchors rendered later
    // (timeline milestones and dynamically rendered cards).
    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element))
            return;
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
            return;
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (!targetId)
            return;
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            return;
        }
        // A timeline milestone goes to its own card rather than the section heading,
        // falling back to the section if there's no ref.
        const milestone = anchor.closest('.journey-milestone');
        const linkedCard = findLinkedCard(milestone);
        const targetElement = linkedCard || document.querySelector(targetId);
        if (targetElement) {
            const scrollOffset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 24;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - scrollOffset;
            window.scrollTo({ top: targetPosition, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            history.replaceState(null, '', targetId);
            // Timeline links only scroll; focusing the destination can draw a frame.
            if (!milestone) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
            }
            if (linkedCard)
                linkedCard.classList.add('is-visible');
        }
    });
}
// ===================================
// Journey <-> card cross-linking
// ===================================
// Timeline events carry a "ref" matching the "id" of an experience/education
// entry, so a bar and its card can find each other reliably.
function findLinkedCard(timelineEvent) {
    const ref = timelineEvent?.getAttribute('data-ref');
    return ref ? document.querySelector(`[data-item-id="${ref}"]`) : null;
}
// ===================================
// Collapsible page navigation
// ===================================
function setupNavigationMenu() {
    const navbar = getElement('#navbar');
    const button = getElement('.menu-toggle');
    const menu = getElement('#page-menu');
    const setOpen = (open) => {
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        menu.hidden = !open;
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => {
        if (!(event.target instanceof Element))
            return;
        if (event.target.closest('a') && !(event instanceof MouseEvent &&
            (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey))) {
            setOpen(false);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || menu.hidden)
            return;
        const restoreFocus = menu.contains(document.activeElement);
        setOpen(false);
        if (restoreFocus)
            button.focus();
    });
    document.addEventListener('click', (event) => {
        if (event.target instanceof Node && !navbar.contains(event.target))
            setOpen(false);
    });
    navbar.addEventListener('focusout', (event) => {
        if (event.relatedTarget instanceof Node && !navbar.contains(event.relatedTarget))
            setOpen(false);
    });
}
// The mobile header follows scroll direction; the desktop sidebar stays fixed.
function setupMobileNavigationScroll() {
    const navbar = getElement('#navbar');
    const button = getElement('.menu-toggle');
    const mobile = window.matchMedia('(max-width: 768px)');
    let previousY = window.scrollY;
    let direction = 0;
    let distance = 0;
    let frame = 0;
    const update = () => {
        frame = 0;
        // Ignore elastic overscroll at either end of the document.
        const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const y = Math.max(0, Math.min(window.scrollY, maxY));
        const delta = y - previousY;
        previousY = y;
        if (!mobile.matches)
            return;
        const nextDirection = Math.sign(delta);
        if (nextDirection !== 0) {
            distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
            direction = nextDirection;
        }
        if (y <= navbar.offsetHeight || button.getAttribute('aria-expanded') === 'true' ||
            navbar.querySelector(':focus-visible')) {
            navbar.classList.remove('is-hidden');
            distance = 0;
        }
        else if (distance >= (direction > 0 ? 12 : 8)) {
            navbar.classList.toggle('is-hidden', direction > 0);
            distance = 0;
        }
    };
    window.addEventListener('scroll', () => {
        if (!frame && mobile.matches)
            frame = requestAnimationFrame(update);
    }, { passive: true });
    mobile.addEventListener('change', () => {
        navbar.classList.remove('is-hidden');
        previousY = window.scrollY;
        direction = 0;
        distance = 0;
    });
    navbar.addEventListener('focusin', () => {
        navbar.classList.remove('is-hidden');
        distance = 0;
    });
}
// ===================================
// Utility Functions
// ===================================
// Intersection Observer for scroll animations — adds "is-visible"
// to any element carrying the "reveal" class when it enters the viewport.
let revealObserver = null;
function setupScrollAnimations() {
    // Disconnect before observing to keep repeated setup safe.
    if (revealObserver)
        revealObserver.disconnect();
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
