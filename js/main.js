/* PATA DURA · Baguettes & Café — interacciones */
(function () {
  'use strict';

  /* si este archivo no carga, la página queda en modo "no-js" y todo es visible */
  document.documentElement.classList.replace('no-js', 'js');

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-menu');
  var staticMode = document.documentElement.classList.contains('no-anim');

  /* ----- header con fondo al hacer scroll ----- */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- menú móvil ----- */
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----- aparición al hacer scroll ----- */
  var revealEls = document.querySelectorAll('.reveal');
  if (!staticMode && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ----- trazo de los dibujos de gis ----- */
  var doodles = document.querySelectorAll('.doodle');
  if (!staticMode && 'IntersectionObserver' in window) {
    var doodleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('drawn');
          doodleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    doodles.forEach(function (el) { doodleObserver.observe(el); });
  } else {
    doodles.forEach(function (el) { el.classList.add('drawn'); });
  }

  /* ----- resaltar sección activa en la navegación ----- */
  var sections = ['menu', 'nosotros', 'visitanos']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var links = {};
  document.querySelectorAll('.nav-link').forEach(function (a) {
    var hash = a.getAttribute('href');
    if (hash && hash.charAt(0) === '#') links[hash.slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ----- año del footer ----- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
