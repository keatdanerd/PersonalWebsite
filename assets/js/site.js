/* keatonraney.com — shared behavior (no dependencies) */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  // Mobile menu
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (nav && toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      nav.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        nav.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Home page: nav is transparent over the hero, solid once you scroll past it
  var hero = document.querySelector(".hero");
  if (nav && hero) {
    var onScroll = function () {
      nav.classList.toggle("over-hero", window.scrollY < hero.offsetHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Fade elements in as they enter the viewport
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Email: assembled in the browser so scrapers don't see a plain address
  document.querySelectorAll("[data-email]").forEach(function (el) {
    var parts = el.getAttribute("data-email").split("|"); // "user|domain"
    var addr = parts[0] + "@" + parts[1];
    if (el.hasAttribute("data-email-show")) el.textContent = addr;
    if (el.tagName === "A") el.href = "mailto:" + addr;
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Print button on the CV page
  var printBtn = document.querySelector("[data-print]");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
})();
