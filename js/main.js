/* ============================================
   HYDRACLEAN — Main JavaScript
   Animations, interactions, form handling
   ============================================ */

(function() {
  'use strict';

  // --- Scroll Reveal ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // --- Animated Counters ---
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '+';

          if (prefersReducedMotion) {
            el.textContent = target >= 1000
              ? target.toLocaleString() + suffix
              : target + suffix;
            observer.unobserve(el);
            return;
          }

          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const start = performance.now();
    const isLarge = target >= 1000;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = isLarge
        ? current.toLocaleString() + suffix
        : current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Navigation ---
  function initNav() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!nav) return;

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = current;
    }, { passive: true });

    // Hamburger toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // --- Testimonials Carousel ---
  function initTestimonials() {
    const carousel = document.getElementById('testimonialCarousel');
    if (!carousel) return;

    const testimonials = carousel.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonials__dot');
    let current = 0;
    let interval;

    function show(index) {
      testimonials.forEach(t => t.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      current = index;
    }

    function next() {
      show((current + 1) % testimonials.length);
    }

    function startAuto() {
      interval = setInterval(next, 6000);
    }

    function stopAuto() {
      clearInterval(interval);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto();
        show(parseInt(dot.dataset.index, 10));
        startAuto();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  // --- Accordion ---
  function initAccordions() {
    const triggers = document.querySelectorAll('.accordion__trigger');
    triggers.forEach(trigger => {
      // Set initial ARIA state
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion__item');
        const content = item.querySelector('.accordion__content');
        const isOpen = item.classList.contains('active');

        // Close all in this accordion
        const accordion = item.closest('.accordion');
        if (accordion) {
          accordion.querySelectorAll('.accordion__item.active').forEach(openItem => {
            if (openItem !== item) {
              openItem.classList.remove('active');
              openItem.querySelector('.accordion__content').style.maxHeight = null;
              openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
            }
          });
        }

        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = null;
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --- Mobile Help Overlay ---
  function initHelpOverlay() {
    const helpBtn = document.getElementById('helpBtn');
    const helpOverlay = document.getElementById('helpOverlay');
    const helpClose = document.getElementById('helpClose');

    if (!helpBtn || !helpOverlay) return;

    helpBtn.addEventListener('click', () => {
      helpOverlay.classList.toggle('active');
    });

    if (helpClose) {
      helpClose.addEventListener('click', () => {
        helpOverlay.classList.remove('active');
      });
    }
  }

  // --- Form Handling ---
  function initForms() {
    const forms = document.querySelectorAll('form[action*="web3forms"]');
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            // Check for success element
            const success = form.parentElement.querySelector('.form-success');
            if (success) {
              form.style.display = 'none';
              success.classList.add('active');
            } else {
              btn.textContent = 'Sent!';
              btn.style.backgroundColor = 'var(--success)';
              form.reset();
              setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
              }, 3000);
            }
          } else {
            throw new Error('Form submission failed');
          }
        } catch (err) {
          btn.textContent = 'Error — try again';
          btn.style.backgroundColor = 'var(--emergency)';
          btn.style.color = '#fff';
          btn.disabled = false;
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 3000);
        }
      });
    });
  }

  // --- Service Finder Filter ---
  function initServiceFinder() {
    const tiles = document.querySelectorAll('.service-finder__tile');
    const cards = document.querySelectorAll('.all-services-grid .service-card');
    if (!tiles.length || !cards.length) return;

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const filter = tile.dataset.filter;

        // Toggle active
        if (tile.classList.contains('active')) {
          tile.classList.remove('active');
          cards.forEach(card => card.style.display = '');
          return;
        }

        tiles.forEach(t => t.classList.remove('active'));
        tile.classList.add('active');

        cards.forEach(card => {
          const tags = card.dataset.tags || '';
          if (filter === 'all' || tags.includes(filter)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Hero Text Animation ---
  function initHeroAnimation() {
    const title = document.querySelector('.hero__title');
    if (!title) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    title.style.opacity = '0';
    setTimeout(() => {
      title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      title.style.opacity = '1';
    }, 200);
  }

  // --- Parallax ---
  function initParallax() {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const heroBg = document.querySelector('.hero__bg img');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroBg.style.transform = `translateY(${scroll * 0.3}px)`;
      }
    }, { passive: true });
  }

  // --- Active Nav Link ---
  function setActiveNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav__link');
    links.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && path.endsWith(href)) {
        link.classList.add('active');
      }
    });
    // Homepage fallback
    if (path === '/' || path.endsWith('index.html') || path.endsWith('/')) {
      const homeLink = document.querySelector('.nav__link[href="index.html"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }

  // --- Scroll-Aware Chatbot Trigger (Mobile) ---
  function initChatbotScrollReveal() {
    var trigger = document.querySelector('.chatbot-trigger');
    if (!trigger || window.innerWidth >= 768) return;

    trigger.style.visibility = 'hidden';

    var revealed = false;
    window.addEventListener('scroll', function() {
      if (!revealed && window.scrollY > 200) {
        trigger.style.visibility = 'visible';
        revealed = true;
      }
    }, { passive: true });
  }

  // --- Init All ---
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollReveal();
    initCounters();
    initTestimonials();
    initAccordions();
    initHelpOverlay();
    initForms();
    initServiceFinder();
    initHeroAnimation();
    initParallax();
    setActiveNav();
    initChatbotScrollReveal();
  });

})();
