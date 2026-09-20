/* Kita-Alps Expeditions - Core Application Controller */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header State ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- 2. Mobile Navigation Drawer ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close when clicking nav link
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 3. Swiper 3D Coverflow (Routes Showcase - Ref Image 1) ---
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-routes')) {
    new Swiper('.swiper-routes', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 1,
      coverflowEffect: {
        rotate: 18,
        stretch: 0,
        depth: 180,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
      },
      keyboard: {
        enabled: true,
      },
      a11y: {
        prevSlideMessage: 'Previous expedition route',
        nextSlideMessage: 'Next expedition route',
      }
    });
  }

  // --- 4. Swiper Reviews Carousel ---
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-reviews')) {
    new Swiper('.swiper-reviews', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      pagination: {
        el: '.reviews-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }

  // --- 5. FAQ Accordion Grid ---
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.faq-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('active');

      // Optional accordion behavior: close siblings
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          const btn = item.querySelector('.faq-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        parent.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 6. Weight Distribution Interactive Comparison Toggle ---
  const weightBtns = document.querySelectorAll('.weight-tab-btn');
  const weightViewHeavy = document.getElementById('view-heavy-pack');
  const weightViewLight = document.getElementById('view-light-pack');

  if (weightBtns.length && weightViewHeavy && weightViewLight) {
    weightBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        weightBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-mode');
        if (mode === 'heavy') {
          weightViewHeavy.style.display = 'block';
          weightViewLight.style.display = 'none';
        } else {
          weightViewHeavy.style.display = 'none';
          weightViewLight.style.display = 'block';
        }
      });
    });
  }

  // --- 7. WhatsApp URL Form Sync ---
  const inquiryForm = document.getElementById('trekInquiryForm');
  const waDirectBtn = document.getElementById('waDirectAction');

  if (waDirectBtn) {
    waDirectBtn.addEventListener('click', (e) => {
      let routeVal = 'General Expedition Inquiry';
      let dateVal = 'Upcoming Season';
      
      const routeSelect = document.getElementById('inquiryRoute');
      const dateInput = document.getElementById('inquiryDates');

      if (routeSelect && routeSelect.value) routeVal = routeSelect.value;
      if (dateInput && dateInput.value) dateVal = dateInput.value;

      const message = `Hello Kita-Alps Expeditions Desk, I would like to check guide & porter availability for: ${routeVal} around ${dateVal}. Could you provide logistical assessment?`;
      const encodedMsg = encodeURIComponent(message);
      
      // WhatsApp desk URL
      window.open(`https://wa.me/818012345678?text=${encodedMsg}`, '_blank');
    });
  }
});
