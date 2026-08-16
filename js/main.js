/* =========================================================
   Meridian Legal — Site scripts
   Mobile nav, header shadow, FAQ accordion, back-to-top,
   and booking form handling.
   ========================================================= */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var backToTop = document.querySelector(".back-to-top");

  /* Sticky header shadow on scroll */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked (mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Back to top */
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close all others (single-open accordion)
      item.parentElement.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Active nav link based on current page */
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---------- Booking / contact form ----------
     No backend is wired up yet. On submit we validate the
     fields, then open the visitor's email client with a
     pre-filled message addressed to the firm's inbox.

     To collect submissions automatically instead, swap this
     handler for a form service such as Formspree, EmailJS, or
     your own backend endpoint — see README.md. */
  var bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    var statusBox = document.getElementById("form-status");

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = bookingForm.querySelector("#name").value.trim();
      var email = bookingForm.querySelector("#email").value.trim();
      var phone = bookingForm.querySelector("#phone").value.trim();
      var practiceArea = bookingForm.querySelector("#practice-area").value;
      var date = bookingForm.querySelector("#date").value;
      var message = bookingForm.querySelector("#message").value.trim();

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !phone || !message) {
        showStatus("Please fill in all required fields.", "error");
        return;
      }
      if (!emailPattern.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      var firmEmail = "info@meridianlegal.example";
      var subject = "New consultation request from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "Practice area: " + (practiceArea || "Not specified"),
        "Preferred date: " + (date || "Not specified"),
        "",
        "Message:",
        message
      ];
      var mailto =
        "mailto:" + firmEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
      showStatus("Thanks, " + name.split(" ")[0] + "! Your email client should now open with your request ready to send. If it doesn't open, email us directly at " + firmEmail + ".", "success");
      bookingForm.reset();
    });

    function showStatus(text, type) {
      if (!statusBox) return;
      statusBox.textContent = text;
      statusBox.className = "form-status show " + type;
      statusBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  /* Set current year in footer */
  document.querySelectorAll(".current-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Cookie consent banner ----------
     Simple "essential cookies only" style notice. Stores the visitor's
     choice in localStorage so it isn't shown again. No cookies are
     actually set by this template beyond what the browser itself uses
     for localStorage — wire this up to your real cookie/analytics
     setup before adding any tracking scripts. */
  var COOKIE_KEY = "ml-cookie-consent";
  try {
    if (!window.localStorage.getItem(COOKIE_KEY)) {
      var inGuides = window.location.pathname.indexOf("/guides/") !== -1;
      var prefix = inGuides ? "../" : "";

      var banner = document.createElement("div");
      banner.className = "cookie-banner";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-label", "Cookie notice");
      banner.innerHTML =
        '<p>We use only essential cookies to make this site work. See our ' +
        '<a href="' + prefix + 'cookie-policy.html">Cookie Policy</a> for details.</p>' +
        '<div class="cookie-actions">' +
        '<button type="button" class="btn btn-outline btn-sm" data-cookie-choice="essential" style="color:#fff;border-color:rgba(255,255,255,0.5);">Essential only</button>' +
        '<button type="button" class="btn btn-primary btn-sm" data-cookie-choice="accepted">Accept</button>' +
        '</div>';
      document.body.appendChild(banner);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () { banner.classList.add("show"); });
      });

      banner.querySelectorAll("[data-cookie-choice]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          try {
            window.localStorage.setItem(COOKIE_KEY, btn.getAttribute("data-cookie-choice"));
          } catch (e) { /* ignore storage errors */ }
          banner.classList.remove("show");
          setTimeout(function () { banner.remove(); }, 350);
        });
      });
    }
  } catch (e) {
    /* localStorage unavailable (private browsing etc.) — skip banner */
  }
})();
