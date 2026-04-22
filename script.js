// ===================================
// DOM Content Loaded
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializePortfolio();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupLanguageSwitcher();
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

    // Simple lane-stacking for overlapping events within a lane.
    // Considers both temporal overlap AND visual overlap (cards have a min width
    // in px that translates to ~N months of the range depending on timeline width).
    const stackEvents = (list) => {
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

        // Approx. minimum visual width of a card in months.
        // Timeline min-width is 900px with some padding, for totalMonths ~60 -> ~15px/month.
        // A card is ~150px, plus a small gap -> require ~11 months between consecutive card starts.
        const minMonthGap = Math.max(3, totalMonths * 0.18);

        const lanes = []; // each entry holds the "blocked until" month index
        prepared.forEach(ev => {
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

    const top = stackEvents(topEvents);
    const bottom = stackEvents(bottomEvents);

    const buildBarHTML = (ev, side) => {
        const leftPct = (ev._start / totalMonths) * 100;
        const widthPct = Math.max(1.5, ((ev._end - ev._start) / totalMonths) * 100);
        const typeClass = `tl-${ev.type}`;
        const sideClass = `tl-${side}`;
        // Lane offset within the half (pushes bars away from center line)
        const laneOffset = ev._lane * 100; // px per lane
        const styleSide = side === 'top'
            ? `bottom: ${laneOffset}px;`
            : `top: ${laneOffset}px;`;

        const logoHTML = ev.logo
            ? `<img src="${ev.logo}" alt="${ev.institution}" class="tl-logo" onerror="this.style.display='none'">`
            : '';

        const endLabel = ev.end === 'present'
            ? translations[currentLanguage].journey.present
            : formatMonthYear(ev.end);

        return `
            <div class="tl-event ${typeClass} ${sideClass}" style="left: ${leftPct}%; width: ${widthPct}%; ${styleSide}">
                <div class="tl-bar">
                    <div class="tl-bar-fill"></div>
                </div>
                <div class="tl-card">
                    <div class="tl-card-header">
                        ${logoHTML}
                        <div class="tl-card-text">
                            <div class="tl-title">${ev.title}</div>
                            <div class="tl-institution">${ev.institution}</div>
                        </div>
                    </div>
                    <div class="tl-dates">${formatMonthYear(ev.start)} — ${endLabel}</div>
                </div>
            </div>
        `;
    };

    const topBarsHTML = top.prepared.map(ev => buildBarHTML(ev, 'top')).join('');
    const bottomBarsHTML = bottom.prepared.map(ev => buildBarHTML(ev, 'bottom')).join('');

    // Height of each half derived from number of lanes
    const topHeight = 20 + top.laneCount * 100;
    const bottomHeight = 20 + bottom.laneCount * 100;

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
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
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
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
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
function renderProjects() {
    const container = document.getElementById('projects-container');
    const data = portfolioDataTranslations[currentLanguage].projects;
    
    data.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
        container.appendChild(card);
    });
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
        skillCard.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
        container.appendChild(skillCard);
    });
}

function createSkillCard(category, skills) {
    const card = document.createElement('div');
    card.className = 'skill-category';
    
    const skillTags = skills
        .map(skill => `<span class="skill-tag">${skill}</span>`)
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
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
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

// Intersection Observer for scroll animations (optional enhancement)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
}