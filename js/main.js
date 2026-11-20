/**
 * =====================================================
 * SANIKA KUNDEKAR — SOFTWARE ENGINEER PORTFOLIO
 * File: js/main.js
 * High-performance, Accessible, Recruiter-Friendly Script
 * =====================================================
 */

(function () {
  'use strict';

  // ── THEME MANAGEMENT ─────────────────────────────────
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById('themeBtn');
  const themeToggleMobileBtn = document.getElementById('themeBtnMobile');

  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('sk-portfolio-theme');
      if (savedTheme) {
        return savedTheme;
      }
    } catch (e) {
      // Fallback if localStorage is inaccessible (e.g. strict privacy mode / file:// protocol)
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    try {
      localStorage.setItem('sk-portfolio-theme', theme);
    } catch (e) {
      // Ignore if localStorage is blocked
    }
    updateThemeIcons(theme);
  }

  function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');

    if (theme === 'dark') {
      sunIcons.forEach(el => el.classList.remove('hidden'));
      moonIcons.forEach(el => el.classList.add('hidden'));
    } else {
      sunIcons.forEach(el => el.classList.add('hidden'));
      moonIcons.forEach(el => el.classList.remove('hidden'));
    }
  }

  function toggleTheme() {
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // Initialize theme immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        let hasCustomTheme = false;
        try {
          hasCustomTheme = !!localStorage.getItem('sk-portfolio-theme');
        } catch (err) {}
        if (!hasCustomTheme) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    } catch (e) {}
  }


  // ── MOBILE NAVIGATION DRAWER ─────────────────────────
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenu || !hamburgerBtn) return;
    mobileMenu.classList.remove('hidden');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburgerBtn) return;
    mobileMenu.classList.add('hidden');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });
  }


  // ── SCROLLSPY & HEADER ELEVATION ─────────────────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header elevation
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('shadow-sm');
      } else {
        navbar.classList.remove('shadow-sm');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }

    // Scrollspy active section
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // ── PROJECT CATEGORY FILTERING ───────────────────────
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  if (projectFilterBtns.length > 0 && projectCards.length > 0) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active button state
        projectFilterBtns.forEach(b => {
          b.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/25');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        });
        this.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        this.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/25');

        // Filter cards
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.classList.add('hidden');
            }, 200);
          }
        });
      });
    });
  }


  // ── CERTIFICATE MODAL LIGHTBOX ───────────────────────
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const modalLink = document.getElementById('modalLink');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const certTriggerBtns = document.querySelectorAll('.view-cert-btn');

  function openCertModal(certData) {
    if (!modalBackdrop) return;

    if (modalImage && certData.image) {
      modalImage.src = certData.image;
      modalImage.alt = certData.title || 'Certificate Preview';
      modalImage.classList.remove('hidden');
    } else if (modalImage) {
      modalImage.classList.add('hidden');
    }

    if (modalTitle) modalTitle.textContent = certData.title || 'Certification';
    if (modalIssuer) modalIssuer.textContent = certData.issuer || '';
    
    if (modalLink && certData.link) {
      modalLink.href = certData.link;
      modalLink.classList.remove('hidden');
      if (certData.linkText) {
        modalLink.textContent = certData.linkText;
      } else {
        modalLink.textContent = 'View Official Credential ↗';
      }
    } else if (modalLink) {
      modalLink.classList.add('hidden');
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (certTriggerBtns.length > 0) {
    certTriggerBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const certData = {
          title: this.getAttribute('data-title'),
          issuer: this.getAttribute('data-issuer'),
          image: this.getAttribute('data-image'),
          link: this.getAttribute('data-link'),
          linkText: this.getAttribute('data-link-text') || 'Open Document / Link ↗'
        };
        openCertModal(certData);
      });
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCertModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeCertModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeCertModal();
    }
  });


  // ── 1-CLICK EMAIL & PHONE COPY & TOAST ───────────────────────
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.getAttribute('data-email') || 'sanikakundekar007@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('✓ Email copied to clipboard: ' + email);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span class="text-emerald-500 font-medium">Copied!</span>';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(() => {
          window.location.href = `mailto:${email}`;
        });
      } else {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const phone = this.getAttribute('data-phone') || '+91 9307951877';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phone).then(() => {
          showToast('✓ Phone copied to clipboard: ' + phone);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span class="text-emerald-500 font-medium">Copied!</span>';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(() => {
          window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
        });
      } else {
        window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
      }
    });
  });


  // ── CONTACT FORM HANDLING ────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const subjectInput = document.getElementById('formSubject');
      const messageInput = document.getElementById('formMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;
      }

      // Simulate sending
      setTimeout(() => {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = `Send Message <span class="ml-1">→</span>`;
        }

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('hidden');
          setTimeout(() => {
            formSuccessAlert.classList.add('hidden');
          }, 6000);
        }

        contactForm.reset();
        showToast('✓ Message sent successfully!');
      }, 700);
    });
  }


  // ── SCROLL REVEAL OBSERVER ───────────────────────────
  const revealElements = document.querySelectorAll('.reveal-init');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    document.documentElement.classList.add('js-motion');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px 80px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

})();
