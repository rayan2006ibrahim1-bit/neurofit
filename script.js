// ===================================
// VITANEXUS BUSINESS PLAN - JAVASCRIPT
// Complete Interactive Functionality
// ===================================

// ===================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// ===================================

const config = {
    animationDuration: 300,
    scrollOffset: 80,
    chartAnimationDelay: 100,
    navbarHeight: 70
};

// ===================================
// 2. DOM CONTENT LOADED
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initTabs();
    initAccordions();
    initCounters();
    initCharts();
    initProgressBars();
    initModals();
    initForms();
    initTooltips();
    initSmoothScroll();
    initLazyLoading();
    initAnimationsOnScroll();
    initMobileMenu();
    initTableResponsive();
    
    console.log('VitaNexus Business Plan - All systems initialized ✓');
});

// ===================================
// 3. NAVIGATION FUNCTIONALITY
// ===================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Sticky navbar on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        });
    });
    
    // Active link highlighting
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink);
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + config.navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// 4. MOBILE MENU
// ===================================

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!navToggle) {
        // Create mobile toggle if it doesn't exist
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const toggle = document.createElement('button');
            toggle.className = 'nav-toggle';
            toggle.setAttribute('aria-label', 'Toggle navigation');
            toggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            navbar.appendChild(toggle);
            
            // Re-initialize navigation
            initNavigation();
        }
    }
}

// ===================================
// 5. SMOOTH SCROLLING
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - config.scrollOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 6. BACK TO TOP BUTTON
// ===================================

function initBackToTop() {
    let backToTopBtn = document.querySelector('.back-to-top');
    
    // Create button if it doesn't exist
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);
    }
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// 7. SCROLL EFFECTS
// ===================================

function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Fade in scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// ===================================
// 8. TABS FUNCTIONALITY
// ===================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs-container');
            
            if (!tabContainer) return;
            
            // Remove active class from all buttons and contents in this container
            tabContainer.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = tabContainer.querySelector(`#${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===================================
// 9. ACCORDIONS
// ===================================

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordions in the same group
            const accordionGroup = accordionItem.closest('.accordion');
            if (accordionGroup) {
                accordionGroup.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    const content = item.querySelector('.accordion-content');
                    if (content) {
                        content.style.maxHeight = null;
                    }
                });
            }
            
            // Toggle current accordion
            if (!isActive) {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
        });
    });
}

// ===================================
// 10. ANIMATED COUNTERS
// ===================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter, .highlight-value');
    
    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target') || element.textContent.replace(/[^0-9.]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = formatNumber(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target);
            }
        };
        
        updateCounter();
    };
    
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.round(num).toLocaleString();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        // Store original value
        if (!counter.hasAttribute('data-target')) {
            counter.setAttribute('data-target', counter.textContent.replace(/[^0-9.]/g, ''));
        }
        counterObserver.observe(counter);
    });
}

// ===================================
// 11. PROGRESS BARS
// ===================================

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const progress = entry.target.getAttribute('data-progress') || '0';
                entry.target.style.width = progress + '%';
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===================================
// 12. CHARTS ANIMATION
// ===================================

function initCharts() {
    const chartBars = document.querySelectorAll('.chart-bar, .profit-bar');
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                setTimeout(() => {
                    const height = entry.target.getAttribute('data-height') || '100';
                    entry.target.style.height = height + '%';
                    entry.target.classList.add('animated');
                }, index * config.chartAnimationDelay);
            }
        });
    }, { threshold: 0.3 });
    
    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });
    
    // Mix bar segments animation
    const mixSegments = document.querySelectorAll('.mix-segment');
    
    const mixObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.getAttribute('data-width') || '0';
                entry.target.style.width = width + '%';
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    mixSegments.forEach(segment => {
        mixObserver.observe(segment);
    });
}

// ===================================
// 13. MODALS
// ===================================

function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// 14. FORM VALIDATION
// ===================================

function initForms() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Form is valid, submit it
                console.log('Form is valid, submitting...');
                // form.submit(); // Uncomment to actually submit
                showNotification('Form submitted successfully!', 'success');
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error
    removeError(input);
    
    // Check if required
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (type === 'tel' && value !== '') {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Min length
    if (input.hasAttribute('minlength')) {
        const minLength = parseInt(input.getAttribute('minlength'));
        if (value.length < minLength) {
            isValid = false;
            errorMessage = `Minimum ${minLength} characters required`;
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showError(input, errorMessage);
    }
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    input.parentElement.appendChild(errorElement);
}

function removeError(input) {
    input.classList.remove('error');
    
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// ===================================
// 15. NOTIFICATIONS/TOASTS
// ===================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// ===================================
// 16. TOOLTIPS
// ===================================

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.classList.remove('show');
                setTimeout(() => {
                    if (this.tooltipElement) {
                        this.tooltipElement.remove();
                        this.tooltipElement = null;
                    }
                }, 300);
            }
        });
    });
}

// ===================================
// 17. LAZY LOADING IMAGES
// ===================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// 18. ANIMATIONS ON SCROLL
// ===================================

function initAnimationsOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .card, .feature-card, .stat-card, .team-member');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                setTimeout(() => {
                    entry.target.classList.add('animated', 'animate-fade-in-up');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ===================================
// 19. TABLE RESPONSIVE
// ===================================

function initTableResponsive() {
    const tables = document.querySelectorAll('table:not(.table-responsive table)');
    
    tables.forEach(table => {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// ===================================
// 20. PRICING TOGGLE (Annual/Monthly)
// ===================================

function initPricingToggle() {
    const pricingToggles = document.querySelectorAll('.pricing-toggle');
    
    pricingToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const pricingCards = document.querySelectorAll('.pricing-card');
            
            pricingCards.forEach(card => {
                const monthlyPrice = card.getAttribute('data-monthly');
                const annualPrice = card.getAttribute('data-annual');
                const priceElement = card.querySelector('.price-amount');
                const periodElement = card.querySelector('.price-period');
                
                if (priceElement) {
                    priceElement.textContent = isAnnual ? annualPrice : monthlyPrice;
                }
                
                if (periodElement) {
                    periodElement.textContent = isAnnual ? '/year' : '/month';
                }
            });
        });
    });
}

// ===================================
// 21. SEARCH FUNCTIONALITY
// ===================================

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 3) {
            if (searchResults) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function performSearch(query) {
    // This is a simple client-side search
    // In production, you'd want to implement server-side search
    
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push({
                title: element.textContent.substring(0, 100),
                element: element
            });
        }
    });
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    const html = results.slice(0, 5).map(result => `
        <div class="search-result-item">
            <a href="#" onclick="scrollToElement(event, this)" data-element="${result.element.id || ''}">
                ${result.title}
            </a>
        </div>
    `).join('');
    
    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
}

// ===================================
// 22. PRINT FUNCTIONALITY
// ===================================

function initPrint() {
    const printButtons = document.querySelectorAll('.btn-print, [data-print]');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });
}

// ===================================
// 23. COPY TO CLIPBOARD
// ===================================

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy', 'error');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied to clipboard!', 'success');
    }
}

// ===================================
// 24. DOWNLOAD PDF
// ===================================

function downloadPDF() {
    // This would connect to a server-side PDF generation service
    showNotification('Preparing PDF download...', 'info');
    
    // Simulate download
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/assets/VitaNexus-Business-Plan.pdf';
        link.download = 'VitaNexus-Business-Plan.pdf';
        link.click();
        showNotification('Download started!', 'success');
    }, 1000);
}

// ===================================
// 25. SHARE FUNCTIONALITY
// ===================================

function shareContent(platform) {
    const url = window.location.href;
    const title = document.title;
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// ===================================
// 26. DARK MODE TOGGLE
// ===================================

function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) return;
    
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// ===================================
// 27. UTILITY FUNCTIONS
// ===================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format number
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Format percentage
function formatPercentage(num, decimals = 1) {
    return num.toFixed(decimals) + '%';
}

// Get element offset
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll to element
function scrollToElement(event, element) {
    if (event) {
        event.preventDefault();
    }
    
    const targetElement = typeof element === 'string' ? document.querySelector(element) : element;
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - config.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set query parameter
function setQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// ===================================
// 28. FINANCIAL CALCULATOR
// ===================================

function initFinancialCalculator() {
    const calculatorForm = document.querySelector('.financial-calculator');
    
    if (!calculatorForm) return;
    
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const users = parseInt(document.getElementById('calc-users').value) || 0;
        const plan = document.getElementById('calc-plan').value;
        const period = document.getElementById('calc-period').value;
        
        const pricing = {
            basic: { monthly: 29, annual: 290 },
            professional: { monthly: 79, annual: 790 },
            enterprise: { monthly: 199, annual: 1990 }
        };
        
        const pricePerUser = period === 'annual' ? pricing[plan].annual : pricing[plan].monthly;
        const totalCost = users * pricePerUser;
        const savings = period === 'annual' ? (users * pricing[plan].monthly * 12) - totalCost : 0;
        
        displayCalculatorResults(totalCost, savings, period);
    });
}

function displayCalculatorResults(cost, savings, period) {
    const resultsDiv = document.querySelector('.calculator-results');
    
    if (!resultsDiv) {
        const newResults = document.createElement('div');
        newResults.className = 'calculator-results';
        document.querySelector('.financial-calculator').appendChild(newResults);
    }
    
    const html = `
        <div class="results-card">
            <h4>Your Estimated Cost</h4>
            <div class="result-amount">${formatCurrency(cost)}</div>
            <div class="result-period">per ${period === 'annual' ? 'year' : 'month'}</div>
            ${savings > 0 ? `
                <div class="result-savings">
                    <i class="fas fa-check-circle"></i>
                    You save ${formatCurrency(savings)} per year!
                </div>
            ` : ''}
        </div>
    `;
    
    document.querySelector('.calculator-results').innerHTML = html;
    document.querySelector('.calculator-results').classList.add('show');
}

// ===================================
// 29. INTERACTIVE CHARTS (Chart.js Integration)
// ===================================

function initInteractiveCharts() {
    // Revenue Growth Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && typeof Chart !== 'undefined') {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [{
                    label: 'Revenue',
                    data: [500000, 2000000, 5000000, 12000000, 25000000],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Revenue: ' + formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // User Growth Chart
    const userCtx = document.getElementById('userChart');
    if (userCtx && typeof Chart !== 'undefined') {
        new Chart(userCtx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [{
                    label: 'Active Users',
                    data: [5000, 25000, 75000, 200000, 500000],
                    backgroundColor: '#4ECDC4',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Users: ' + formatNumber(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Market Share Pie Chart
    const marketCtx = document.getElementById('marketChart');
    if (marketCtx && typeof Chart !== 'undefined') {
        new Chart(marketCtx, {
            type: 'doughnut',
            data: {
                labels: ['VitaNexus (Target)', 'Competitor A', 'Competitor B', 'Others'],
                datasets: [{
                    data: [15, 25, 20, 40],
                    backgroundColor: ['#FF6B35', '#4ECDC4', '#FFE66D', '#95E1D3'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// ===================================
// 30. COHORT ANALYSIS INTERACTIVE
// ===================================

function initCohortAnalysis() {
    const cohortCells = document.querySelectorAll('.cohort-cell[data-value]');
    
    cohortCells.forEach(cell => {
        const value = parseFloat(cell.getAttribute('data-value'));
        
        // Color coding based on retention rate
        if (value >= 80) {
            cell.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
        } else if (value >= 60) {
            cell.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
        } else if (value >= 40) {
            cell.style.backgroundColor = 'rgba(241, 196, 15, 0.3)';
        } else {
            cell.style.backgroundColor = 'rgba(231, 76, 60, 0.3)';
        }
        
        // Add hover effect
        cell.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
}

// ===================================
// 31. RISK ASSESSMENT INTERACTIVE
// ===================================

function initRiskAssessment() {
    const riskCards = document.querySelectorAll('.risk-card');
    
    riskCards.forEach(card => {
        const severity = card.getAttribute('data-severity');
        
        // Add severity indicator
        const indicator = document.createElement('div');
        indicator.className = `risk-indicator risk-${severity}`;
        card.appendChild(indicator);
        
        // Add click to expand
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            const details = this.querySelector('.risk-details');
            if (details) {
                if (this.classList.contains('expanded')) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                } else {
                    details.style.maxHeight = '0';
                }
            }
        });
    });
}

// ===================================
// 32. MILESTONE TRACKER
// ===================================

function initMilestoneTracker() {
    const milestones = document.querySelectorAll('.milestone-item');
    
    milestones.forEach((milestone, index) => {
        const isCompleted = milestone.hasAttribute('data-completed');
        
        if (isCompleted) {
            milestone.classList.add('completed');
            
            // Add checkmark animation
            setTimeout(() => {
                const icon = milestone.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-check-circle');
                    icon.classList.remove('fa-circle');
                }
            }, index * 100);
        }
        
        // Add progress indicator
        const progress = milestone.getAttribute('data-progress');
        if (progress) {
            const progressBar = document.createElement('div');
            progressBar.className = 'milestone-progress';
            progressBar.innerHTML = `
                <div class="milestone-progress-bar">
                    <div class="milestone-progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="milestone-progress-text">${progress}%</span>
            `;
            milestone.appendChild(progressBar);
        }
    });
}

// ===================================
// 33. COMPETITOR COMPARISON
// ===================================

function initCompetitorComparison() {
    const comparisonTable = document.querySelector('.comparison-table');
    
    if (!comparisonTable) return;
    
    const rows = comparisonTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        
        cells.forEach(cell => {
            const value = cell.textContent.trim();
            
            // Add visual indicators for Yes/No
            if (value === 'Yes' || value === '✓') {
                cell.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success);"></i>';
            } else if (value === 'No' || value === '✗') {
                cell.innerHTML = '<i class="fas fa-times-circle" style="color: var(--danger);"></i>';
            }
        });
    });
}

// ===================================
// 34. TEAM MEMBER CARDS
// ===================================

function initTeamCards() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add flip effect on click
        member.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Add social links hover effect
        const socialLinks = member.querySelectorAll('.team-social a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card flip
            });
        });
    });
}

// ===================================
// 35. FUNDING CALCULATOR
// ===================================

function initFundingCalculator() {
    const fundingSlider = document.getElementById('funding-amount');
    const fundingValue = document.getElementById('funding-value');
    const equityValue = document.getElementById('equity-value');
    const valuationValue = document.getElementById('valuation-value');
    
    if (!fundingSlider) return;
    
    fundingSlider.addEventListener('input', function() {
        const amount = parseInt(this.value);
        const valuation = 50000000; // $50M pre-money valuation
        const equity = ((amount / (valuation + amount)) * 100).toFixed(2);
        
        fundingValue.textContent = formatCurrency(amount);
        equityValue.textContent = equity + '%';
        valuationValue.textContent = formatCurrency(valuation + amount);
    });
}

// ===================================
// 36. EXPORT FUNCTIONALITY
// ===================================

function exportToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const csvRow = [];
        
        cols.forEach(col => {
            csvRow.push('"' + col.textContent.trim() + '"');
        });
        
        csv.push(csvRow.join(','));
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.csv');
    link.click();
    
    showNotification('CSV exported successfully!', 'success');
}

function exportToExcel(tableId, filename) {
    showNotification('Excel export feature coming soon!', 'info');
    // This would require a library like SheetJS (xlsx)
}

// ===================================
// 37. KEYBOARD SHORTCUTS
// ===================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Ctrl/Cmd + P: Print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
        
        // Ctrl/Cmd + D: Download PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            downloadPDF();
        }
        
        // Escape: Close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Arrow keys: Navigate between sections
        if (e.key === 'ArrowDown' && e.altKey) {
            e.preventDefault();
            navigateSection('next');
        }
        
        if (e.key === 'ArrowUp' && e.altKey) {
            e.preventDefault();
            navigateSection('prev');
        }
    });
}

function navigateSection(direction) {
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset;
    let targetSection = null;
    
    if (direction === 'next') {
        for (let section of sections) {
            if (section.offsetTop > currentScroll + 100) {
                targetSection = section;
                break;
            }
        }
    } else {
        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop < currentScroll - 100) {
                targetSection = sections[i];
                break;
            }
        }
    }
    
    if (targetSection) {
        scrollToElement(null, targetSection);
    }
}

// ===================================
// 38. ANALYTICS TRACKING
// ===================================

function trackEvent(category, action, label) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Console log for development
    console.log('Event tracked:', category, action, label);
}

function trackPageView(page) {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'page_path': page
        });
    }
    
    console.log('Page view tracked:', page);
}

// ===================================
// 39. PERFORMANCE MONITORING
// ===================================

function initPerformanceMonitoring() {
    // Page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow. Consider optimization.');
        }
    });
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.warn('Long task detected:', entry.duration + 'ms');
            }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
    }
}

// ===================================
// 40. ERROR HANDLING
// ===================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, e.filename, e.lineno);
    
    // In production, you might want to send this to an error tracking service
    // trackError(e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    
    // In production, track this error
    // trackError('Promise Rejection', e.reason);
});

// ===================================
// 41. LOCAL STORAGE MANAGEMENT
// ===================================

const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },
    
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
};

// ===================================
// 42. SESSION MANAGEMENT
// ===================================

function initSession() {
    // Track session start
    if (!Storage.get('sessionStart')) {
        Storage.set('sessionStart', new Date().toISOString());
    }
    
    // Track page views
    const pageViews = Storage.get('pageViews') || 0;
    Storage.set('pageViews', pageViews + 1);
    
    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage++;
        Storage.set('timeOnPage', timeOnPage);
    }, 1000);
    
    // Save session data before leaving
    window.addEventListener('beforeunload', function() {
        Storage.set('lastVisit', new Date().toISOString());
    });
}

// ===================================
// 43. COOKIE CONSENT
// ===================================

function initCookieConsent() {
    const cookieConsent = Storage.get('cookieConsent');
    
    if (!cookieConsent) {
        showCookieBanner();
    }
}

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <div class="cookie-buttons">
                <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Accept</button>
                <button class="btn btn-secondary btn-sm" onclick="declineCookies()">Decline</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    setTimeout(() => {
        banner.classList.add('show');
    }, 1000);
}

function acceptCookies() {
    Storage.set('cookieConsent', true);
    hideCookieBanner();
    showNotification('Cookie preferences saved', 'success');
}

function declineCookies() {
    Storage.set('cookieConsent', false);
    hideCookieBanner();
    showNotification('Cookie preferences saved', 'info');
}

function hideCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }
}

// ===================================
// 44. ACCESSIBILITY FEATURES
// ===================================

function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim() || 'Button');
        }
    });
    
    // Add keyboard navigation for custom elements
    const customElements = document.querySelectorAll('[role="button"], [role="link"]');
    customElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus visible for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

// ===================================
// 45. RESPONSIVE IMAGES
// ===================================

function initResponsiveImages() {
    const images = document.querySelectorAll('img[data-srcset]');
    
    images.forEach(img => {
        const srcset = img.getAttribute('data-srcset');
        if (srcset) {
            img.setAttribute('srcset', srcset);
            img.removeAttribute('data-srcset');
        }
    });
}

// ===================================
// 46. SERVICE WORKER (PWA Support)
// ===================================

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
}

// ===================================
// 47. OFFLINE DETECTION
// ===================================

function initOfflineDetection() {
    window.addEventListener('online', function() {
        showNotification('You are back online!', 'success');
        document.body.classList.remove('offline');
    });
    
    window.addEventListener('offline', function() {
        showNotification('You are offline. Some features may not be available.', 'warning');
        document.body.classList.add('offline');
    });
}

// ===================================
// 48. BROWSER COMPATIBILITY CHECK
// ===================================

function checkBrowserCompatibility() {
    const isIE = /MSIE|Trident/.test(navigator.userAgent);
    
    if (isIE) {
        showNotification('You are using an outdated browser. Please upgrade for the best experience.', 'warning');
    }
    
    // Check for required features
    const requiredFeatures = [
        'Promise',
        'fetch',
        'IntersectionObserver'
    ];
    
    requiredFeatures.forEach(feature => {
        if (!(feature in window)) {
            console.warn(`Browser does not support ${feature}`);
        }
    });
}

// ===================================
// 49. INITIALIZATION ON SPECIFIC PAGES
// ===================================

function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    switch(currentPage) {
        case 'financials':
            initFinancialCalculator();
            initInteractiveCharts();
            initCohortAnalysis();
            break;
            
        case 'market':
            initCompetitorComparison();
            break;
            
        case 'team':
            initTeamCards();
            break;
            
        case 'strategy':
            initMilestoneTracker();
            break;
            
        case 'funding':
            initFundingCalculator();
            break;
            
        case 'business':
            initRiskAssessment();
            break;
            
        default:
            // Home page or other pages
            break;
    }
}

// ===================================
// 50. FINAL INITIALIZATION
// ===================================

// Call additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initPricingToggle();
    initSearch();
    initPrint();
    initDarkMode();
    initKeyboardShortcuts();
    initPerformanceMonitoring();
    initSession();
    initCookieConsent();
    initAccessibility();
    initResponsiveImages();
    initServiceWorker();
    initOfflineDetection();
    checkBrowserCompatibility();
    initPageSpecificFeatures();
    
    // Track page view
    trackPageView(window.location.pathname);
    
    console.log('🚀 VitaNexus Business Plan - Fully Loaded!');
});

// ===================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ===================================

window.VitaNexus = {
    // Utility functions
    formatCurrency,
    formatNumber,
    formatPercentage,
    
    // Navigation
    scrollToElement,
    
    // UI functions
    showNotification,
    copyToClipboard,
    downloadPDF,
    shareContent,
    
    // Export functions
    exportToCSV,
    exportToExcel,
    
    // Analytics
    trackEvent,
    trackPageView,
    
    // Storage
    Storage
};

// ===================================
// END OF SCRIPT.JS
// ===================================

console.log('%c VitaNexus Business Plan ', 'background: #FF6B35; color: white; font-size: 20px; padding: 10px;');
console.log('%c Developed with ❤️ for Healthcare Innovation ', 'color: #4ECDC4; font-size: 14px;');
