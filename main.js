/* ===================================
   AGUMENT GROUP - Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initLoader();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initTabs();
    initScrollAnimations();
    initNewsManagement();

    // Simple Interactive Features
    // initCustomCursor(); // Removed - too annoying
    // initParallaxEffects(); // Removed - too much
    // initHoverTilt(); // Removed - too much
    // initCounterAnimations(); // Optional
    // initTypewriter(); // Removed - too much
    // initMouseTrail(); // Removed - too much
    // initMagneticButtons(); // Removed - too much
});

/* ===================================
   Loader
   =================================== */
function initLoader() {
    const loader = document.getElementById('loader');

    if (loader) {
        // Hide loader after animation completes
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }, 2500);
    }
}

/* ===================================
   Header Scroll Effect
   =================================== */
function initHeader() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    if (header) {
        function updateHeader() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Initial check
    }
}

/* ===================================
   Mobile Menu
   =================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

/* ===================================
   Smooth Scroll
   =================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   Tabs (Activities Section)
   =================================== */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remove active from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active to clicked button and corresponding panel
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.section-header, .philosophy-main, .value-item, .message-content, ' +
        '.company-card, .circulation-item, .activity-card, .sdgs-item, ' +
        '.news-item, .recruit-content'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/* ===================================
   News Management (CMS-like functionality)
   =================================== */
function initNewsManagement() {
    // This provides a simple way to manage news items
    // In production, this would be connected to a backend CMS

    window.NewsManager = {
        // Get all news items
        getAll: function () {
            const newsItems = document.querySelectorAll('.news-item');
            return Array.from(newsItems).map(item => ({
                date: item.querySelector('.news-date').textContent,
                category: item.querySelector('.news-category').textContent,
                title: item.querySelector('.news-title').textContent,
                link: item.querySelector('.news-title').href
            }));
        },

        // Add a new news item (for admin use)
        add: function (newsData) {
            const newsList = document.getElementById('newsList');
            if (!newsList) return;

            const categoryClass = this.getCategoryClass(newsData.category);

            const newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <time class="news-date">${newsData.date}</time>
                <span class="news-category ${categoryClass}">${newsData.category}</span>
                <a href="${newsData.link || '#'}" class="news-title">${newsData.title}</a>
            `;

            // Add to the beginning of the list
            newsList.insertBefore(newsItem, newsList.firstChild);

            console.log('News item added:', newsData);
        },

        getCategoryClass: function (category) {
            const categoryMap = {
                'お知らせ': 'news-category-info',
                'イベント': 'news-category-event',
                '採用': 'news-category-recruit',
                'メディア': 'news-category-media'
            };
            return categoryMap[category] || 'news-category-info';
        }
    };

    // Activity Management
    window.ActivityManager = {
        add: function (tabId, activityData) {
            const panel = document.getElementById(tabId);
            if (!panel) return;

            const grid = panel.querySelector('.activity-grid');
            if (!grid) return;

            const activityCard = document.createElement('article');
            activityCard.className = 'activity-card';
            activityCard.innerHTML = `
                <div class="activity-image">
                    ${activityData.image
                    ? `<img src="${activityData.image}" alt="${activityData.title}">`
                    : '<span class="activity-placeholder">活動写真</span>'
                }
                </div>
                <div class="activity-body">
                    <span class="activity-date">${activityData.date}</span>
                    <h4>${activityData.title}</h4>
                    <p>${activityData.description}</p>
                </div>
            `;

            // Add to the beginning
            grid.insertBefore(activityCard, grid.firstChild);

            console.log('Activity added to', tabId, ':', activityData);
        }
    };

    // Log available managers for admin use
    console.log('CMS-like managers available:');
    console.log('- NewsManager.add({ date, category, title, link })');
    console.log('- NewsManager.getAll()');
    console.log('- ActivityManager.add(tabId, { date, title, description, image })');
}

/* ===================================
   Utility Functions
   =================================== */
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date to Japanese format
function formatDateJP(date) {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// Current date in Japanese format
function getCurrentDateJP() {
    return formatDateJP(new Date());
}

/* ===================================
   Premium Interactive Features
   =================================== */

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');

    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorDot.style.transform += ' scale(0.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.5)', '');
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg-image, .hero-particles, .company-bg-image');

    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }, 10));
}

// 3D Tilt Effect on Hover
function initHoverTilt() {
    const tiltElements = document.querySelectorAll('.company-card, .value-item, .activity-card');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');

    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.opacity = 1;

        let index = 0;
        const speed = parseInt(el.dataset.speed) || 50;

        function type() {
            if (index < text.length) {
                el.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(type, 500);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(el);
    });
}

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, var(--color-primary-vivid), var(--color-secondary-vivid));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - (i / trailLength)};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }

        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Magnetic Buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}
