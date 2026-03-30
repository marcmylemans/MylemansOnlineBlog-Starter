/* ============================================================
   MylemansOnlineBlog Starter — Blog Theme JS
   Dark/light toggle · TOC builder · TOC scroll tracking
   Mobile nav · Code copy buttons
   ============================================================ */

(function () {
  "use strict";

  /* ── Theme ──────────────────────────────────────────────────── */
  var THEME_KEY = "mo-theme";

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function setStoredTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Apply theme immediately (also runs inline in <head>, this is a safety net)
  applyTheme(getPreferredTheme());

  /* ── Giscus theme sync ──────────────────────────────────────── */
  function updateGiscusTheme(theme) {
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme === "dark" ? "dark_dimmed" : "light" } } },
      "https://giscus.app"
    );
  }

  // Sync Giscus when it sends a ready message
  window.addEventListener("message", function (e) {
    if (e.origin !== "https://giscus.app") return;
    if (!e.data || !e.data.giscus) return;
    updateGiscusTheme(document.documentElement.getAttribute("data-theme") || "light");
  });

  /* ════════════════════════════════════════════════════════════ */
  // Run when DOM is ready — handles both defer (fires after parse)
  // and inline cases where DOMContentLoaded may have already fired.
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {

    /* ── Theme toggle ─────────────────────────────────────────── */
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") || "light";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        setStoredTheme(next);
        updateGiscusTheme(next);
      });
    });

    /* ── Mobile nav ───────────────────────────────────────────── */
    var hamburger = document.querySelector(".nav-hamburger");
    var mobileNav = document.querySelector(".nav-mobile");
    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", function () {
        var isOpen = mobileNav.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", String(isOpen));
        hamburger.textContent = isOpen ? "✕" : "☰";
        document.body.style.overflow = isOpen ? "hidden" : "";
      });
      mobileNav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobileNav.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
          hamburger.textContent = "☰";
          document.body.style.overflow = "";
        });
      });
    }

    /* ── Active nav link ──────────────────────────────────────── */
    var path = window.location.pathname;
    document.querySelectorAll(".nav-links a, .nav-mobile a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      if (href === path || (path !== "/" && href !== "/" && path.startsWith(href))) {
        a.classList.add("active");
      }
    });

    /* ── Build TOC from DOM headings ──────────────────────────── */
    var tocNav = document.getElementById("toc-nav");
    var tocSidebar = document.getElementById("toc-sidebar");

    if (tocNav && tocSidebar) {
      var headings = document.querySelectorAll(".post-content h2, .post-content h3, .post-content h4");

      if (headings.length < 2) {
        // Hide sidebar if there's nothing useful to show
        tocSidebar.style.display = "none";
      } else {
        var list = document.createElement("ul");
        list.className = "toc-list";

        headings.forEach(function (h) {
          // Ensure heading has an ID (it should, but just in case)
          if (!h.id) {
            h.id = h.textContent.trim().toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-");
          }

          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = "#" + h.id;

          // Clean text: strip any HTML that might be inside the heading
          a.textContent = h.textContent.trim();

          if (h.tagName === "H3") a.className = "toc-h3";
          if (h.tagName === "H4") a.className = "toc-h4";

          li.appendChild(a);
          list.appendChild(li);
        });

        tocNav.appendChild(list);

        /* ── TOC scroll tracking ────────────────────────────────── */
        var tocLinks = list.querySelectorAll("a");
        var headingEls = Array.from(headings);
        var activeLink = null;
        var navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
        ) || 64;

        function updateActive() {
          var scrollY = window.scrollY + navH + 40;
          var current = null;

          for (var i = 0; i < headingEls.length; i++) {
            var rect = headingEls[i].getBoundingClientRect();
            if (rect.top + window.scrollY <= scrollY) {
              current = tocLinks[i];
            }
          }

          if (current !== activeLink) {
            if (activeLink) activeLink.classList.remove("active");
            if (current) {
              current.classList.add("active");
              // Scroll only the TOC sidebar — never the main page.
              // scrollIntoView() would cause the whole page to jump, so
              // we manually adjust the sidebar's own scrollTop instead.
              var linkTop    = current.offsetTop;
              var linkBottom = linkTop + current.offsetHeight;
              var sTop       = tocSidebar.scrollTop;
              var sHeight    = tocSidebar.clientHeight;
              if (linkTop < sTop + 8) {
                tocSidebar.scrollTop = linkTop - 8;
              } else if (linkBottom > sTop + sHeight - 8) {
                tocSidebar.scrollTop = linkBottom - sHeight + 8;
              }
            }
            activeLink = current;
          }
        }

        var ticking = false;
        window.addEventListener("scroll", function () {
          if (!ticking) {
            requestAnimationFrame(function () {
              updateActive();
              ticking = false;
            });
            ticking = true;
          }
        }, { passive: true });

        updateActive();
      }
    }

    /* ── Smooth scroll for in-page anchor links ───────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href").slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, "#" + id);
      });
    });

    /* ── Code block header bars + copy buttons ────────────────── */
    var langMap = {
      bash: "Bash", shell: "Shell", sh: "Shell", zsh: "Shell",
      powershell: "PowerShell", ps1: "PowerShell",
      python: "Python", py: "Python",
      javascript: "JavaScript", js: "JavaScript",
      typescript: "TypeScript", ts: "TypeScript",
      ruby: "Ruby", go: "Go", rust: "Rust", java: "Java",
      css: "CSS", scss: "SCSS", sass: "Sass",
      html: "HTML", xml: "XML", json: "JSON",
      yaml: "YAML", yml: "YAML", sql: "SQL",
      dockerfile: "Dockerfile", nginx: "Nginx",
      plaintext: "Text", text: "Text",
      csharp: "C#", cpp: "C++", c: "C",
      conf: "Config", ini: "Config"
    };

    document.querySelectorAll("div.highlighter-rouge").forEach(function (outer) {
      if (outer.querySelector(".code-header")) return; // already processed

      // Extract language from class list (e.g. "language-bash")
      var lang = "";
      outer.classList.forEach(function (cls) {
        if (cls.startsWith("language-")) lang = cls.slice(9);
      });
      var label = langMap[lang.toLowerCase()] || lang.toUpperCase() || "";

      // Build header bar
      var header = document.createElement("div");
      header.className = "code-header";

      var dots = document.createElement("span");
      dots.className = "code-dots";
      dots.innerHTML = "<i></i><i></i><i></i>";
      header.appendChild(dots);

      var langEl = document.createElement("span");
      langEl.className = "code-lang";
      langEl.textContent = label;
      header.appendChild(langEl);

      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.textContent = "Copy";
      header.appendChild(btn);

      outer.insertBefore(header, outer.firstChild);

      btn.addEventListener("click", function () {
        // Read from rouge-code only (skips line numbers if present)
        var src = outer.querySelector(".rouge-code pre") ||
                  outer.querySelector("pre code") ||
                  outer.querySelector("pre");
        var text = (src ? (src.innerText || src.textContent) : "").trim();
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "✓ Copied";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 2000);
        }).catch(function () {
          btn.textContent = "Failed";
          setTimeout(function () { btn.textContent = "Copy"; }, 2000);
        });
      });
    });

    /* ── External links ───────────────────────────────────────── */
    var siteHost = window.location.hostname;
    document.querySelectorAll(".post-content a[href]").forEach(function (a) {
      try {
        var url = new URL(a.href);
        if (url.hostname && url.hostname !== siteHost) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        }
      } catch (e) {}
    });

    /* ── Lazy-load images ─────────────────────────────────────── */
    if ("loading" in HTMLImageElement.prototype) {
      document.querySelectorAll("img:not([loading])").forEach(function (img) {
        if (!img.closest(".nav-brand") && !img.closest(".post-header__author")) {
          img.setAttribute("loading", "lazy");
        }
      });
    }

    /* ── Reading progress bar ─────────────────────────────────── */
    var progressBar = document.getElementById("reading-progress");
    if (progressBar) {
      function updateProgress() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
        progressBar.style.width = progress + "%";
        progressBar.setAttribute("aria-valuenow", progress);
      }
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }

    /* ── Back-to-top button ───────────────────────────────────── */
    var backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      var SHOW_AFTER = 400;

      function toggleBackToTop() {
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > SHOW_AFTER) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }

      window.addEventListener("scroll", toggleBackToTop, { passive: true });
      toggleBackToTop();

      backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

  }); // end DOMContentLoaded

})();
