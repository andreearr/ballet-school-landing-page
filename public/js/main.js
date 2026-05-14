/* ========================================
   Israel Rueda Ballet - JavaScript Principal
   ======================================== */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');
    const fadeElements = document.querySelectorAll('.fade-in');
    const contactForm = document.querySelector('.contact-form');

    // ========================================
    // Header Scroll Effect
    // ========================================
    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    function toggleMenu() {
        menuToggle.classList.toggle('menu-toggle--active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Success state
                submitBtn.textContent = '¡Mensaje enviado!';
                submitBtn.classList.add('btn--success');

                // Reset form
                this.reset();

                // Restore button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn--success');
                }, 3000);
            }, 1500);
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remove existing error state
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Required check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9+\s\-()]{9,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
            }
        }

        if (!isValid) {
            field.classList.add('error');
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = 'color: #c0392b; font-size: 0.75rem; margin-top: 4px; display: block;';

            if (field.type === 'email') {
                errorMsg.textContent = 'Por favor, introduce un email válido';
            } else if (field.type === 'tel') {
                errorMsg.textContent = 'Por favor, introduce un teléfono válido';
            } else {
                errorMsg.textContent = 'Este campo es obligatorio';
            }

            field.parentNode.appendChild(errorMsg);
        }

        return isValid;
    }

    // ========================================
    // Parallax Effect for Hero Images
    // ========================================
    function handleParallax() {
        const heroBgs = document.querySelectorAll('.hero__bg');

        heroBgs.forEach(bg => {
            const rect = bg.getBoundingClientRect();
            const scrollPercent = (window.scrollY / window.innerHeight);

            if (rect.bottom > 0) {
                bg.style.transform = `translateY(${scrollPercent * 30}px)`;
            }
        });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ========================================
    // Active Navigation Link
    // ========================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash;

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            // Remove active class from all links first
            link.classList.remove('nav__link--active');

            // Main page links - only active when on that exact page without hash
            if (linkHref === 'index.html' || linkHref === 'alquiler.html' || linkHref === 'contacto.html') {
                const linkPage = linkHref;
                if (currentPage === linkPage) {
                    link.classList.add('nav__link--active');
                }
            }

            // Clases link (no hash) - active when on clases.html without hash
            if (linkHref === 'clases.html') {
                if (currentPage === 'clases.html' && !currentHash) {
                    link.classList.add('nav__link--active');
                }
            }

            // Horarios link - active when on clases.html with #horarios hash or scrolled to horarios section
            if (linkHref === 'clases.html#horarios') {
                if (currentPage === 'clases.html' && currentHash === '#horarios') {
                    link.classList.add('nav__link--active');
                }
            }

            // Tarifas link - active when on clases.html with #precios hash or scrolled to precios section
            if (linkHref === 'clases.html#precios') {
                if (currentPage === 'clases.html' && currentHash === '#precios') {
                    link.classList.add('nav__link--active');
                }
            }
        });
    }

    // Handle scroll-based active state for Horarios and Tarifas on Clases page
    function handleScrollActiveState() {
        const horariosSection = document.querySelector('#horarios');
        const preciosSection = document.querySelector('#precios');
        const clasesSection = document.querySelector('#tipos');

        if (!horariosSection || !preciosSection) return;

        function updateActiveState() {
            const scrollPosition = window.scrollY + 150;
            const currentHash = window.location.hash;

            // Only update based on scroll if no hash is set
            if (!currentHash || currentHash === '#tipos') {
                const horariosTop = horariosSection.offsetTop;
                const preciosTop = preciosSection.offsetTop;

                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');

                    // Remove active from all sub-nav except Clases
                    if (linkHref === 'clases.html#horarios' || linkHref === 'clases.html#precios') {
                        link.classList.remove('nav__link--active');
                    }

                    // Activate based on scroll position
                    if (scrollPosition >= preciosTop) {
                        if (linkHref === 'clases.html#precios') {
                            link.classList.add('nav__link--active');
                        }
                    } else if (scrollPosition >= horariosTop) {
                        if (linkHref === 'clases.html#horarios') {
                            link.classList.add('nav__link--active');
                        }
                    } else if (linkHref === 'clases.html') {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        }

        window.addEventListener('scroll', updateActiveState, { passive: true });
        updateActiveState(); // Initial check
    }

    // Initialize
    setActiveNavLink();

    // Handle hash changes
    window.addEventListener('hashchange', setActiveNavLink);

    // On clases.html page, set up scroll-based active state
    if (window.location.pathname.split('/').pop() === 'clases.html') {
        handleScrollActiveState();
    }

    // ========================================
    // WhatsApp Link Handler
    // ========================================
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp click (placeholder for analytics)
            console.log('WhatsApp contact initiated');
        });
    });

    // ========================================
    // Image Lazy Loading Enhancement
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers without native support
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // ========================================
    // Escape Key Handler for Mobile Menu
    // ========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ========================================
    // Initialize Animations on Page Load
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Trigger animations for visible elements
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    });

})();
