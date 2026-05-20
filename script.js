document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal-up');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -120px 0px' });

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const bottomCta = document.querySelector('.bottom-cta');
  let lastScroll = window.pageYOffset;
  if (bottomCta) {
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 120) {
        bottomCta.classList.add('hidden');
      } else {
        bottomCta.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  if (!form || !status) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = 'Sending your message...';

    setTimeout(function () {
      status.textContent = 'Thank you! Your message has been received. We will contact you shortly.';
      form.reset();
    }, 900);
  });
});
