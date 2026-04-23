// ===================================
// DOM Content Loaded
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializePortfolio();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupLanguageSwitcher();
    setupScrollAnimations();
    setupReadingProgress();
    setupCommandPalette();
});

// ===================================
// Language Management
// ===================================
let currentLanguage = 'en';

function initializeLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        currentLanguage = savedLang;
    } else {
        // Detect browser language
        const browserLang = navigator.language.slice(0, 2);
        currentLanguage = (browserLang === 'es') ? 'es' : 'en';
    }
    
    // Update active button
    updateLanguageButtons();
}

function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLanguage) {
                currentLanguage = lang;
                localStorage.setItem('preferredLanguage', lang);
                updateLanguageButtons();
                updatePageLanguage();
            }
        });
    });
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updatePageLanguage() {
    // Update static translations
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Re-render dynamic content
    clearContainers();
    renderTimeline();
    renderExperience();
    renderEducation();
    renderProjects();
    renderSkills();
    renderAwards();
    
    // Update hero section
    updateHeroSection();
    
    // Update about section
    updateAboutSection();
    
    // Update journey section
    updateJourneySection();
    
    // Update section titles
    updateSectionTitles();
    
    // Update footer
    updateFooter();
    updateCurrently();

    // Re-bind scroll reveals for newly rendered cards
    reobserveReveals();
}

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return null;
        }
    }
    
    return value;
}

function clearContainers() {
    document.getElementById('timeline-container').innerHTML = '';
    document.getElementById('experience-container').innerHTML = '';
    document.getElementById('education-container').innerHTML = '';
    document.getElementById('projects-container').innerHTML = '';
    document.getElementById('skills-container').innerHTML = '';
    document.getElementById('awards-container').innerHTML = '';
}

function updateHeroSection() {
    const t = translations[currentLanguage].hero;
    document.querySelector('.hero-content .subtitle').textContent = t.subtitle;
    document.querySelector('.hero-content .hero-description').textContent = t.description;
    document.querySelector('.btn-primary').textContent = t.contactBtn;
    document.querySelector('.btn-secondary').textContent = t.projectsBtn;
    document.querySelector('.btn-cv').textContent = t.cvBtn;
}

function updateAboutSection() {
    const about = translations[currentLanguage].about;
    const descriptions = document.querySelectorAll('#about .card-description');
    descriptions[0].innerHTML = about.p1;
    descriptions[1].innerHTML = about.p2;
    descriptions[2].innerHTML = about.p3;
}

function updateSectionTitles() {
    const sections = translations[currentLanguage].sections;
    document.querySelector('#journey .section-title').textContent = sections.journey;
    document.querySelector('#about .section-title').textContent = sections.about;
    document.querySelector('#experience .section-title').textContent = sections.experience;
    document.querySelector('#education .section-title').textContent = sections.education;
    document.querySelector('#projects .section-title').textContent = sections.projects;
    document.querySelector('#skills .section-title').textContent = sections.skills;
    document.querySelector('#awards .section-title').textContent = sections.awards;
}

function updateJourneySection() {
    const j = translations[currentLanguage].journey;
    const subtitleEl = document.querySelector('.journey-subtitle');
    if (subtitleEl) subtitleEl.textContent = j.subtitle;
    document.querySelectorAll('[data-i18n="journey.academic"]').forEach(el => el.textContent = j.academic);
    document.querySelectorAll('[data-i18n="journey.professional"]').forEach(el => el.textContent = j.professional);
    document.querySelectorAll('[data-i18n="journey.exchange"]').forEach(el => el.textContent = j.exchange);
}

function updateFooter() {
    const year = new Date().getFullYear();
    const rights = translations[currentLanguage].footer.rights;
    document.querySelector('footer p').textContent = `© ${year} Manuel Rodríguez Villegas. ${rights}`;
}

function updateCurrently() {
    const t = translations[currentLanguage].currently;
    const data = currentlyData[currentLanguage] || currentlyData.en;
    const titleEl = document.querySelector('.currently-title');
    if (titleEl) titleEl.textContent = t.title;
    const labels = document.querySelectorAll('.currently-label');
    if (labels.length >= 3) {
        labels[0].textContent = t.reading;
        labels[1].textContent = t.building;
        labels[2].textContent = t.focus;
    }
    const readingEl = document.querySelector('[data-currently="reading"]');
    const buildingEl = document.querySelector('[data-currently="building"]');
    const focusEl = document.querySelector('[data-currently="focus"]');
    if (readingEl) readingEl.textContent = data.reading;
    if (buildingEl) buildingEl.textContent = data.building;
    if (focusEl) focusEl.textContent = data.focus;
}

// ===================================
// Initialize Portfolio Content
// ===================================
function initializePortfolio() {
    renderTimeline();
    renderExperience();
    renderEducation();
    renderProjects();
    renderSkills();
    renderAwards();
    updatePageLanguage();
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
    const [y, m] = ym.split('-').map(Number);
    return { year: y, month: m };
}

function monthsBetween(a, b) {
    // Returns the number of months from date a to date b (can be fractional-free integer).
    return (b.year - a.year) * 12 + (b.month - a.month);
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const rangeStart = parseYearMonth(timelineData.rangeStart);
    const rangeEnd = parseYearMonth(timelineData.rangeEnd);
    const totalMonths = monthsBetween(rangeStart, rangeEnd);
    if (totalMonths <= 0) return;

    const events = timelineData.events[currentLanguage] || timelineData.events.en;

    // Build year markers (every January that falls in range, plus endpoints)
    const years = [];
    for (let y = rangeStart.year; y <= rangeEnd.year; y++) {
        years.push(y);
    }

    const yearsHTML = years.map(y => {
        const pos = monthsBetween(rangeStart, { year: y, month: 1 });
        const pct = Math.max(0, Math.min(100, (pos / totalMonths) * 100));
        return `<div class="timeline-year" style="left: ${pct}%;"><span>${y}</span></div>`;
    }).join('');

    // Separate events by lane (academic/exchange above, professional below)
    const topEvents = events.filter(e => e.type === 'academic' || e.type === 'exchange');
    const bottomEvents = events.filter(e => e.type === 'professional');

    // Card min-width in px (must match CSS .tl-card min-width)
    const CARD_MIN_PX = 150;
    const CARD_GAP_PX = 16;

    // The real timeline pixel width we'll measure after first render.
    // For the initial DOM build we use an estimate (900 is our CSS min-width).
    // After render, we re-measure and re-layout if needed.
    const estimatedPxWidth = Math.max(900, (container.parentElement?.clientWidth || 900));

    const stackEvents = (list, pxWidth) => {
        const pxPerMonth = pxWidth / totalMonths;
        const minMonthGap = (CARD_MIN_PX + CARD_GAP_PX) / pxPerMonth;

        const prepared = list.map(e => {
            const s = parseYearMonth(e.start);
            const endRaw = e.end === 'present' ? timelineData.rangeEnd : e.end;
            const en = parseYearMonth(endRaw);
            return {
                ...e,
                _start: monthsBetween(rangeStart, s),
                _end: monthsBetween(rangeStart, en)
            };
        }).sort((a, b) => a._start - b._start);

        const lanes = [];
        prepared.forEach(ev => {
            // The card for this event visually occupies from _start to at least _start + minMonthGap
            const effectiveEnd = Math.max(ev._end, ev._start + minMonthGap);
            let placed = false;
            for (let i = 0; i < lanes.length; i++) {
                if (ev._start >= lanes[i]) {
                    ev._lane = i;
                    lanes[i] = effectiveEnd;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                ev._lane = lanes.length;
                lanes.push(effectiveEnd);
            }
        });
        return { prepared, laneCount: Math.max(1, lanes.length) };
    };

    const top = stackEvents(topEvents, estimatedPxWidth);
    const bottom = stackEvents(bottomEvents, estimatedPxWidth);

    const buildBarHTML = (ev, side) => {
        const leftPct = (ev._start / totalMonths) * 100;
        const widthPct = Math.max(1.5, ((ev._end - ev._start) / totalMonths) * 100);
        const typeClass = `tl-${ev.type}`;
        const sideClass = `tl-${side}`;
        // Lane offset within the half (pushes bars away from center line)
        const laneOffset = ev._lane * 82; // px per lane (reduced since no title anymore)
        const styleSide = side === 'top'
            ? `bottom: ${laneOffset}px;`
            : `top: ${laneOffset}px;`;

        const logoHTML = ev.logo
            ? `<img src="${ev.logo}" alt="${ev.institution}" class="tl-logo" onerror="this.style.display='none'">`
            : '';

        const endLabel = ev.end === 'present'
            ? translations[currentLanguage].journey.present
            : formatMonthYear(ev.end);

        // Each event links to the matching section:
        // academic + exchange -> #education, professional -> #experience
        const target = ev.type === 'professional' ? '#experience' : '#education';
        const ariaLabel = `${ev.institution}, ${formatMonthYear(ev.start)} — ${endLabel}`;

        return `
            <a class="tl-event ${typeClass} ${sideClass}" href="${target}" aria-label="${ariaLabel}" style="left: ${leftPct}%; width: ${widthPct}%; ${styleSide}">
                <div class="tl-bar">
                    <div class="tl-bar-fill"></div>
                </div>
                <div class="tl-card">
                    <div class="tl-card-header">
                        ${logoHTML}
                        <div class="tl-card-text">
                            <div class="tl-institution">${ev.institution}</div>
                            <div class="tl-dates">${formatMonthYear(ev.start)} — ${endLabel}</div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    };

    const topBarsHTML = top.prepared.map(ev => buildBarHTML(ev, 'top')).join('');
    const bottomBarsHTML = bottom.prepared.map(ev => buildBarHTML(ev, 'bottom')).join('');

    // Height of each half derived from number of lanes
    const topHeight = 20 + top.laneCount * 82;
    const bottomHeight = 20 + bottom.laneCount * 82;

    container.innerHTML = `
        <div class="tl-half tl-half-top" style="height: ${topHeight}px;">
            ${topBarsHTML}
        </div>
        <div class="tl-axis">
            ${yearsHTML}
        </div>
        <div class="tl-half tl-half-bottom" style="height: ${bottomHeight}px;">
            ${bottomBarsHTML}
        </div>
    `;
}

function formatMonthYear(ym) {
    if (ym === 'present') return translations[currentLanguage].journey.present;
    const { year, month } = parseYearMonth(ym);
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthsEs = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const arr = currentLanguage === 'es' ? monthsEs : monthsEn;
    return `${arr[month - 1]} ${year}`;
}

// ===================================
// Render Experience Section
// ===================================
function renderExperience() {
    const container = document.getElementById('experience-container');
    const data = portfolioDataTranslations[currentLanguage].experience;
    
    data.forEach((exp, index) => {
        const card = createExperienceCard(exp);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createExperienceCard(exp) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const linkText = translations[currentLanguage].links.viewWebsite;
    const linkHTML = exp.link 
        ? `<a href="${exp.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';
    
    const logoHTML = exp.logo
        ? `<img src="${exp.logo}" alt="${exp.company}" class="card-logo">`
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
            <span class="card-date">${exp.date}</span>
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
    const container = document.getElementById('education-container');
    const data = portfolioDataTranslations[currentLanguage].education;
    
    data.forEach((edu, index) => {
        const card = createEducationCard(edu);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createEducationCard(edu) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const linkText = translations[currentLanguage].links.viewProgram;
    const linkHTML = edu.link 
        ? `<a href="${edu.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';
    
    const logoHTML = edu.logo
        ? `<img src="${edu.logo}" alt="${edu.institution}" class="card-logo">`
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
            <span class="card-date">${edu.date}</span>
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
const INITIAL_PROJECTS_COUNT = 4;

function renderProjects() {
    const container = document.getElementById('projects-container');
    const data = portfolioDataTranslations[currentLanguage].projects;

    data.forEach((project, index) => {
        const card = createProjectCard(project);
        card.classList.add('reveal');
        if (index >= INITIAL_PROJECTS_COUNT) {
            card.classList.add('project-card-hidden');
        }
        container.appendChild(card);
    });

    // Remove any previously inserted button (e.g. after language switch re-render)
    const existingBtn = document.getElementById('show-all-projects-btn');
    if (existingBtn) existingBtn.remove();

    // Add the "Show all" button only if there are more projects than initially shown
    if (data.length > INITIAL_PROJECTS_COUNT) {
        const btn = document.createElement('button');
        btn.id = 'show-all-projects-btn';
        btn.type = 'button';
        btn.className = 'btn btn-secondary show-all-projects-btn';
        btn.textContent = translations[currentLanguage].links.showAllProjects;
        btn.addEventListener('click', () => {
            const hiddenCards = container.querySelectorAll('.project-card-hidden');
            hiddenCards.forEach((card, i) => {
                card.classList.remove('project-card-hidden');
                // Trigger the reveal animation with a small stagger so the
                // newly shown cards fade/slide in instead of popping in.
                card.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
                // Next frame so the transition actually runs
                requestAnimationFrame(() => {
                    card.classList.add('is-visible');
                });
            });
            btn.remove();
        });
        // Insert the button after the projects grid, inside the same section
        container.parentElement.appendChild(btn);
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const linkText = translations[currentLanguage].links.viewProject;
    const linkHTML = project.link 
        ? `<a href="${project.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';
    
    // Projects don't use icons anymore, only images
    const imageHTML = project.image 
        ? `<img src="${project.image}" alt="${project.title}">`
        : `<div class="project-placeholder"></div>`;
    
    card.innerHTML = `
        <div class="project-image">${imageHTML}</div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-tech">${project.tech}</p>
            <p class="project-description">${project.description}</p>
            ${linkHTML}
        </div>
    `;
    
    return card;
}

// ===================================
// Render Skills Section
// ===================================
function renderSkills() {
    const container = document.getElementById('skills-container');
    const data = portfolioDataTranslations[currentLanguage].skills;
    
    Object.entries(data).forEach(([category, skills], index) => {
        const skillCard = createSkillCard(category, skills);
        skillCard.classList.add('reveal');
        container.appendChild(skillCard);
    });
}

// Mapping: skill name (normalized) -> simpleicons slug + official brand color.
// All entries below are verified against the simple-icons npm package.
// Skills not in this map render as plain text tags — that's intentional for
// abstract concepts (Deep Learning, Linear Algebra, Robotics, PINNs, etc.)
// and for technologies without an official simple-icons logo (MATLAB, C#).
const SKILL_ICONS = {
    "python":      { slug: "python",    color: "3776AB" },
    "r":           { slug: "r",         color: "276DC3" },
    "sql":         { slug: "mysql",     color: "4479A1" },
    "pytorch":     { slug: "pytorch",   color: "EE4C2C" },
    "ros":         { slug: "ros",       color: "22314E" },
    "opencv":      { slug: "opencv",    color: "5C3EE8" },
    "git":         { slug: "git",       color: "F05032" },
    "docker":      { slug: "docker",    color: "2496ED" },
    "n8n":         { slug: "n8n",       color: "EA4B71" }
};

function getSkillIcon(skillName) {
    const lower = skillName.toLowerCase().trim();
    // Match either exact, or with a space/parenthesis/number right after the key.
    // This prevents false positives like "Robotics" matching "ros", or
    // "Python (Advanced)" still matching "python".
    const keys = Object.keys(SKILL_ICONS).sort((a, b) => b.length - a.length);
    for (const key of keys) {
        if (lower === key) {
            const meta = SKILL_ICONS[key];
            return `https://cdn.simpleicons.org/${meta.slug}/${meta.color}`;
        }
        // Allow: "python (advanced)", "ros 2", "sql (postgres)"
        // Disallow: "robotics" matching "ros"
        const nextChar = lower.charAt(key.length);
        if (lower.startsWith(key) && (nextChar === ' ' || nextChar === '(' || /[0-9]/.test(nextChar))) {
            const meta = SKILL_ICONS[key];
            return `https://cdn.simpleicons.org/${meta.slug}/${meta.color}`;
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
                ? `<img src="${iconUrl}" alt="" class="skill-tag-icon" onerror="this.style.display='none'">`
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
    const container = document.getElementById('awards-container');
    const data = portfolioDataTranslations[currentLanguage].awards;
    
    data.forEach((award, index) => {
        const card = createAwardCard(award);
        card.classList.add('reveal');
        container.appendChild(card);
    });
}

function createAwardCard(award) {
    const card = document.createElement('div');
    card.className = 'award-card';
    
    const linkText = translations[currentLanguage].links.viewAward;
    const linkHTML = (award.link !== null && award.link !== undefined) 
        ? `<a href="${award.link}" class="project-link" target="_blank" rel="noopener">${linkText}</a>`
        : '';
    
    // Use image if available, otherwise use icon as SVG
    const iconHTML = award.image 
        ? `<img src="${award.image}" alt="${award.title}" class="award-image">`
        : `<img src="${award.icon}" alt="${award.title}" class="award-icon-svg">`;
    
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
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// Utility Functions
// ===================================

// Scroll to top functionality (optional, can be called from a button)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for scroll animations — adds "is-visible"
// to any element carrying the "reveal" class when it enters the viewport.
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? [...parent.children].filter(c => c.classList.contains('reveal')) : [];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${Math.min(idx, 6) * 60}ms`;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe any element flagged as .reveal
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Safety: if for any reason the observer never fires for some elements
    // (e.g., print view, headless screenshot, prefers-reduced-motion already applied),
    // reveal anything still hidden after 1.5s.
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 1.2) {
                el.classList.add('is-visible');
            }
        });
    }, 1500);
}

// Re-run on language change because clearContainers / renderX rebuild DOM
function reobserveReveals() {
    setupScrollAnimations();
}

// ===================================
// Reading progress bar
// ===================================
function setupReadingProgress() {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);

    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = height > 0 ? (scrollTop / height) * 100 : 0;
        bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

// ===================================
// Command palette  (⌘K / Ctrl+K)
// ===================================
function setupCommandPalette() {
    // Build the overlay once
    const overlay = document.createElement('div');
    overlay.className = 'cmdk-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Command palette');
    overlay.innerHTML = `
        <div class="cmdk-panel">
            <div class="cmdk-input-wrap">
                <svg class="cmdk-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                <input class="cmdk-input" type="text" autocomplete="off" spellcheck="false" placeholder="Type a command or search…" />
                <kbd class="cmdk-esc">ESC</kbd>
            </div>
            <ul class="cmdk-list" role="listbox"></ul>
            <div class="cmdk-footer">
                <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                <span><kbd>↵</kbd> open</span>
                <span><kbd>esc</kbd> close</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.cmdk-input');
    const list = overlay.querySelector('.cmdk-list');
    let activeIndex = 0;

    // Build command list dynamically from the current page
    const buildCommands = () => {
        const t = translations[currentLanguage].cmdk || {};
        return [
            { label: t.goAbout || 'About',         hint: t.section || 'Section', action: () => go('#about') },
            { label: t.goJourney || 'Journey',     hint: t.section || 'Section', action: () => go('#journey') },
            { label: t.goExperience || 'Experience', hint: t.section || 'Section', action: () => go('#experience') },
            { label: t.goEducation || 'Education', hint: t.section || 'Section', action: () => go('#education') },
            { label: t.goProjects || 'Projects',   hint: t.section || 'Section', action: () => go('#projects') },
            { label: t.goSkills || 'Skills',       hint: t.section || 'Section', action: () => go('#skills') },
            { label: t.goAwards || 'Awards',       hint: t.section || 'Section', action: () => go('#awards') },
            { label: t.openCv || 'Open CV',        hint: t.action || 'Action',   action: () => window.open('assets/CV.pdf', '_blank') },
            { label: t.sendEmail || 'Send Email',  hint: t.action || 'Action',   action: () => location.href = 'mailto:manuel.rodriguezvillegas09@gmail.com' },
            { label: t.openGithub || 'GitHub',     hint: t.action || 'Action',   action: () => window.open('https://github.com/rdgzmanuel', '_blank') },
            { label: t.openLinkedin || 'LinkedIn', hint: t.action || 'Action',   action: () => window.open('https://www.linkedin.com/in/mrodriguezvillegas', '_blank') },
            { label: t.switchEn || 'Switch to English',  hint: t.action || 'Action', action: () => switchLang('en') },
            { label: t.switchEs || 'Switch to Spanish',  hint: t.action || 'Action', action: () => switchLang('es') }
        ];
    };

    const go = (hash) => {
        close();
        const el = document.querySelector(hash);
        if (!el) return;
        const navH = document.querySelector('nav').offsetHeight;
        window.scrollTo({ top: el.offsetTop - navH - 20, behavior: 'smooth' });
    };

    const switchLang = (lang) => {
        close();
        if (lang !== currentLanguage) {
            currentLanguage = lang;
            localStorage.setItem('preferredLanguage', lang);
            updateLanguageButtons();
            updatePageLanguage();
        }
    };

    const render = (filter = '') => {
        const commands = buildCommands();
        const f = filter.trim().toLowerCase();
        const filtered = f
            ? commands.filter(c => c.label.toLowerCase().includes(f) || c.hint.toLowerCase().includes(f))
            : commands;
        activeIndex = 0;
        list.innerHTML = filtered.length
            ? filtered.map((c, i) => `
                <li class="cmdk-item ${i === 0 ? 'is-active' : ''}" role="option" data-idx="${i}">
                    <span class="cmdk-label">${c.label}</span>
                    <span class="cmdk-hint">${c.hint}</span>
                </li>`).join('')
            : `<li class="cmdk-empty">${(translations[currentLanguage].cmdk && translations[currentLanguage].cmdk.empty) || 'No results'}</li>`;
        list._filtered = filtered;
    };

    const setActive = (i) => {
        const items = list.querySelectorAll('.cmdk-item');
        if (!items.length) return;
        activeIndex = (i + items.length) % items.length;
        items.forEach(el => el.classList.remove('is-active'));
        items[activeIndex].classList.add('is-active');
        items[activeIndex].scrollIntoView({ block: 'nearest' });
    };

    const execActive = () => {
        const f = list._filtered || [];
        if (f[activeIndex]) f[activeIndex].action();
    };

    const open = () => {
        const t = (translations[currentLanguage].cmdk || {});
        input.placeholder = t.placeholder || 'Type a command or search…';
        render('');
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        input.value = '';
        setTimeout(() => input.focus(), 50);
    };

    const close = () => {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    };

    // Keyboard shortcut: Cmd+K / Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            overlay.classList.contains('is-open') ? close() : open();
            return;
        }
        if (!overlay.classList.contains('is-open')) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1); }
        else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(activeIndex - 1); }
        else if (e.key === 'Enter')     { e.preventDefault(); execActive(); }
    });

    input.addEventListener('input', (e) => render(e.target.value));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    list.addEventListener('click', (e) => {
        const item = e.target.closest('.cmdk-item');
        if (!item) return;
        activeIndex = Number(item.dataset.idx);
        execActive();
    });
    list.addEventListener('mousemove', (e) => {
        const item = e.target.closest('.cmdk-item');
        if (item) setActive(Number(item.dataset.idx));
    });

    // Expose trigger hook (e.g. a visible button can call window.openCmdk())
    window.openCmdk = open;
}