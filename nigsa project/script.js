// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 69, 19, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
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

// Observe all menu items and features
document.querySelectorAll('.menu-item, .feature, .contact-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// CTA button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const menuSection = document.querySelector('#menu');
        if (menuSection) {
            menuSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add staggered animation to menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(50px)';
                item.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
        
        // Add bounce animation to hero elements
        const heroElements = document.querySelectorAll('.hero h1, .hero p, .cta-button');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('bounce');
                setTimeout(() => {
                    element.classList.remove('bounce');
                }, 1000);
            }, index * 300);
        });
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const coffeeCup = document.querySelector('.coffee-cup');
    
    if (hero && coffeeCup) {
        const rate = scrolled * -0.5;
        coffeeCup.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add order button functionality
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const menuItem = this.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const price = menuItem.querySelector('.price').textContent;
        
        showNotification(`تم إضافة ${itemName} إلى طلبك! ${price}`, 'success');
        
        // Add pulse animation to the button
        this.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Add CSS for pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .bounce { animation: bounce 1s ease; }
    .shake { animation: shake 0.5s ease; }
`;
document.head.appendChild(pulseStyle);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Add counter animation for prices
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + ' ريال';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + ' ريال';
        }
    }
    
    updateCounter();
}

// Animate counters when menu section is visible
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const prices = entry.target.querySelectorAll('.price');
            prices.forEach(price => {
                const priceText = price.textContent;
                const priceNumber = parseInt(priceText);
                if (!isNaN(priceNumber)) {
                    animateCounter(price, priceNumber);
                }
            });
            menuObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const menuSection = document.querySelector('.menu-section');
if (menuSection) {
    menuObserver.observe(menuSection);
}

// Add coffee steam animation
function createSteam() {
    const steam = document.createElement('div');
    steam.className = 'steam';
    steam.style.cssText = `
        position: absolute;
        width: 4px;
        height: 20px;
        background: rgba(255,255,255,0.6);
        border-radius: 2px;
        animation: steamRise 2s ease-out forwards;
    `;
    
    const coffeeCup = document.querySelector('.coffee-cup');
    if (coffeeCup) {
        coffeeCup.appendChild(steam);
        
        setTimeout(() => {
            steam.remove();
        }, 2000);
    }
}

// Create steam periodically
setInterval(createSteam, 3000);

// Add CSS for steam animation
const steamStyle = document.createElement('style');
steamStyle.textContent = `
    @keyframes steamRise {
        0% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(2);
        }
    }
`;
document.head.appendChild(steamStyle);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Performance optimization - lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Load admin changes
function loadAdminChanges() {
    const savedChanges = localStorage.getItem('cafeImageChanges');
    if (savedChanges) {
        const imageChanges = JSON.parse(savedChanges);
        Object.keys(imageChanges).forEach(itemId => {
            const imgElement = document.querySelector(`[alt="${getItemName(itemId)}"]`);
            if (imgElement) {
                imgElement.src = imageChanges[itemId];
            }
        });
    }
}

// Get item name in Arabic for admin integration
function getItemName(itemId) {
    const names = {
        'turkish-coffee': 'قهوة تركية',
        'cappuccino': 'كابتشينو',
        'latte': 'لاتيه',
        'green-tea': 'شاي أخضر',
        'milkshake': 'ميلك شيك',
        'chocolate-cake': 'كيك الشوكولاتة',
        'about': 'كافيه النكهة'
    };
    return names[itemId] || itemId;
}

// Load admin changes when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadAdminChanges();
});

// Add image loading animation
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transform = 'scale(0.8)';
        this.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add scroll-triggered animations for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transform = 'translateY(30px)';
            img.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'translateY(0)';
            }, 200);
            
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.menu-image img, .about-img-container img').forEach(img => {
    imageObserver.observe(img);
});

// Mobile Bottom Navigation Functionality
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get the section to scroll to
        const sectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Update active nav item based on scroll position
window.addEventListener('scroll', () => {
    const sections = ['home', 'menu', 'about', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all items
                mobileNavItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        }
    });
});

// Add touch feedback for mobile nav
mobileNavItems.forEach(item => {
    item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    item.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

console.log('كافيه النكهة - تم تحميل الموقع بنجاح! ☕');
