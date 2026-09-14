(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "mmr-site-lang";

  function setLang(lang) {
    lang = lang === "en" ? "en" : "es";
    root.setAttribute("lang", lang);
    root.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      if (el === root) return;
      el.hidden = el.getAttribute("data-lang") !== lang;
    });

    document.querySelectorAll("img[data-alt-" + lang + "]").forEach(function (img) {
      img.alt = img.getAttribute("data-alt-" + lang);
    });

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-toggle") === lang));
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (savedLang === "en" || savedLang === "es") {
    setLang(savedLang);
  }

  document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang-toggle"));
    });
  });

  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinks[sections.indexOf(entry.target)];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  var navCursor = document.querySelector(".nav-cursor");
  var canHover = window.matchMedia("(pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (mainNav && navCursor && canHover && !reduceMotion) {
    var navLinkEls = mainNav.querySelectorAll("a");
    var nx = 0, ny = 0, ncx = 0, ncy = 0, nraf = null;

    function trackNavCursor() {
      ncx += (nx - ncx) * 0.25;
      ncy += (ny - ncy) * 0.25;
      navCursor.style.transform = "translate(" + ncx + "px, " + ncy + "px) translate(-50%, -50%)";
      nraf = requestAnimationFrame(trackNavCursor);
    }

    navLinkEls.forEach(function (link) {
      link.addEventListener("mouseenter", function (e) {
        var rect = mainNav.getBoundingClientRect();
        nx = ncx = e.clientX - rect.left;
        ny = ncy = e.clientY - rect.top;
        navCursor.classList.add("active");
        if (!nraf) nraf = requestAnimationFrame(trackNavCursor);
      });
      link.addEventListener("mousemove", function (e) {
        var rect = mainNav.getBoundingClientRect();
        nx = e.clientX - rect.left;
        ny = e.clientY - rect.top;
      });
      link.addEventListener("mouseleave", function () {
        navCursor.classList.remove("active");
      });
    });
  }

  document.querySelectorAll(".project-media--video").forEach(function (media) {
    var cursor = media.querySelector(".card-cursor");
    var playBtn = media.querySelector(".video-play");
    var video = media.querySelector(".project-video");

    if (cursor && canHover && !reduceMotion) {
      var cx = 0, cy = 0, ccx = 0, ccy = 0, craf = null;

      function trackCardCursor() {
        ccx += (cx - ccx) * 0.25;
        ccy += (cy - ccy) * 0.25;
        cursor.style.transform = "translate(" + ccx + "px, " + ccy + "px) translate(-50%, -50%)";
        craf = requestAnimationFrame(trackCardCursor);
      }

      media.addEventListener("mouseenter", function (e) {
        if (media.classList.contains("is-playing")) return;
        var rect = media.getBoundingClientRect();
        cx = ccx = e.clientX - rect.left;
        cy = ccy = e.clientY - rect.top;
        cursor.classList.add("active");
        if (!craf) craf = requestAnimationFrame(trackCardCursor);
      });
      media.addEventListener("mousemove", function (e) {
        if (media.classList.contains("is-playing")) return;
        var rect = media.getBoundingClientRect();
        cx = e.clientX - rect.left;
        cy = e.clientY - rect.top;
      });
      media.addEventListener("mouseleave", function () {
        cursor.classList.remove("active");
      });
    }

    if (playBtn && video) {
      playBtn.addEventListener("click", function () {
        if (!video.src) {
          video.src = playBtn.getAttribute("data-video-src");
        }
        media.classList.add("is-playing");
        if (cursor) cursor.classList.remove("active");
        video.hidden = false;
        video.muted = true;
        video.play().catch(function () {});
      });
    }
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
})();
