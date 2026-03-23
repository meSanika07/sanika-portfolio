/* =====================================================
   SANIKA KUNDEKAR — PORTFOLIO SCRIPTS
   File: js/main.js
===================================================== */

/* ── LOADER ─────────────────────────────────────────
   Dismiss as soon as DOM is ready.
   Three layers: DOMContentLoaded, window.load, hard timeout
===================================================== */
function dismissLoader() {
  var loader = document.getElementById('loader');
  if (loader) loader.classList.add('done');
}

document.addEventListener('DOMContentLoaded', function () {
  // Dismiss loader after short delay so the animation plays
  setTimeout(dismissLoader, 600);

  // Show email in navbar on desktop
  if (window.innerWidth > 960) {
    var navEmail = document.getElementById('navEmail');
    if (navEmail) navEmail.style.display = 'flex';
  }
});

// Backup: window.load
window.addEventListener('load', function () {
  setTimeout(dismissLoader, 200);
});

// Hard kill: 2.5 s — no matter what
setTimeout(dismissLoader, 2500);


/* ── DARK / LIGHT THEME ─────────────────────────────
===================================================== */
var html     = document.documentElement;
var themeBtn = document.getElementById('themeBtn');

// Apply saved theme (default = dark)
var savedTheme = localStorage.getItem('sk-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', function () {
  var current = html.getAttribute('data-theme');
  var next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('sk-theme', next);
});


/* ── HAMBURGER MENU ─────────────────────────────────
===================================================== */
var ham  = document.getElementById('hamburger');
var mNav = document.getElementById('mobileNav');

ham.addEventListener('click', function () {
  ham.classList.toggle('open');
  mNav.classList.toggle('open');
});

document.querySelectorAll('.ml').forEach(function (link) {
  link.addEventListener('click', function () {
    ham.classList.remove('open');
    mNav.classList.remove('open');
  });
});


/* ── SCROLL REVEAL ──────────────────────────────────
===================================================== */
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObs.observe(el);
});


/* ── RADIAL SKILL CIRCLES ───────────────────────────
   Animates stroke-dashoffset when the grid scrolls into view
===================================================== */
var CIRC = 2 * Math.PI * 22; // circumference for r=22 ≈ 138.23

function animateRadials(container) {
  container.querySelectorAll('.sk-radial-fill').forEach(function (circle) {
    var pct    = parseFloat(circle.getAttribute('data-pct'));
    var offset = CIRC - (pct / 100) * CIRC;
    circle.style.strokeDasharray  = CIRC;
    circle.style.strokeDashoffset = CIRC; // reset first
    requestAnimationFrame(function () {
      setTimeout(function () {
        circle.style.strokeDashoffset = offset;
      }, 200);
    });
  });
}

var radialObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      animateRadials(entry.target);
      radialObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-cards-grid').forEach(function (grid) {
  radialObs.observe(grid);
});


/* ── CONTACT FORM ───────────────────────────────────
===================================================== */
function sendMsg(event) {
  event.preventDefault();
  var successMsg = document.getElementById('formSuccess');
  successMsg.style.display = 'block';
  event.target.reset();
  setTimeout(function () {
    successMsg.style.display = 'none';
  }, 4000);
}
