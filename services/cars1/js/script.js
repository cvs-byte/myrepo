/*
  CVSCars - Global Frontend Behavior
  -----------------------------------------
  This file powers reusable interactions across all pages:
  - Preloader lifecycle
  - Mobile navigation
  - Active link state
  - Scroll reveal animations
  - Animated counters
  - Parallax movement
  - Featured carousel
  - Cars page filters
  - Car details gallery
  - Light form handling for demo UX
*/

(function () {
  const selectors = {
    preloader: document.getElementById("preloader"),
    mobileToggle: document.querySelector("[data-mobile-toggle]"),
    mobileMenu: document.querySelector("[data-mobile-menu]"),
    year: document.querySelector("[data-year]"),
    links: document.querySelectorAll("a[data-nav-link]")
  };

  const revealObserverConfig = {
    threshold: 0.18,
    rootMargin: "0px 0px -50px 0px"
  };

  function initPreloader() {
    if (!selectors.preloader) return;

    window.addEventListener("load", function () {
      selectors.preloader.classList.add("hidden");
    });
  }

  function initMobileMenu() {
    if (!selectors.mobileToggle || !selectors.mobileMenu) return;

    selectors.mobileToggle.addEventListener("click", function () {
      const isHidden = selectors.mobileMenu.hasAttribute("hidden");
      if (isHidden) {
        selectors.mobileMenu.removeAttribute("hidden");
        selectors.mobileToggle.setAttribute("aria-expanded", "true");
      } else {
        selectors.mobileMenu.setAttribute("hidden", "");
        selectors.mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initActiveNav() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    selectors.links.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === currentPath) {
        link.classList.add("active");
      }
    });
  }

  function initCurrentYear() {
    if (!selectors.year) return;
    selectors.year.textContent = String(new Date().getFullYear());
  }

  function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (event) {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initRevealAnimations() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, revealObserverConfig);

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const runCounter = function (counter) {
      const target = Number(counter.getAttribute("data-target") || 0);
      const duration = Number(counter.getAttribute("data-duration") || 1600);
      const suffix = counter.getAttribute("data-suffix") || "";
      let startTs;

      function tick(timestamp) {
        if (!startTs) startTs = timestamp;
        const progress = Math.min((timestamp - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        counter.textContent = value + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initParallax() {
    const parallaxEls = document.querySelectorAll("[data-parallax]");
    if (!parallaxEls.length) return;

    window.addEventListener("scroll", function () {
      const offset = window.scrollY;
      parallaxEls.forEach(function (el) {
        const speed = Number(el.getAttribute("data-parallax")) || 0.2;
        const y = Math.round(offset * speed);
        el.style.transform = "translate3d(0, " + y + "px, 0)";
      });
    }, { passive: true });
  }

  function initFeaturedCarousel() {
    const carousel = document.querySelector("[data-carousel='featured']");
    if (!carousel) return;

    const track = carousel.querySelector(".featured-track");
    const slides = carousel.querySelectorAll(".featured-slide");
    const prev = carousel.querySelector("[data-prev]");
    const next = carousel.querySelector("[data-next]");

    if (!track || slides.length === 0 || !prev || !next) return;

    let index = 0;

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
    }

    function goNext() {
      index = (index + 1) % slides.length;
      render();
    }

    function goPrev() {
      index = (index - 1 + slides.length) % slides.length;
      render();
    }

    prev.addEventListener("click", goPrev);
    next.addEventListener("click", goNext);

    setInterval(goNext, 5000);
  }

  function initCarsFilters() {
    const filters = {
      maxPrice: document.querySelector("[data-filter='price']"),
      fuel: document.querySelector("[data-filter='fuel']"),
      category: document.querySelector("[data-filter='category']"),
      priceLabel: document.querySelector("[data-price-label]")
    };

    const cards = Array.from(document.querySelectorAll("[data-car-card]"));
    if (!cards.length || !filters.maxPrice || !filters.fuel || !filters.category) return;

    function applyFilters() {
      const selectedPrice = Number(filters.maxPrice.value);
      const selectedFuel = filters.fuel.value;
      const selectedCategory = filters.category.value;

      if (filters.priceLabel) {
        filters.priceLabel.textContent = "$" + selectedPrice.toLocaleString();
      }

      cards.forEach(function (card) {
        const price = Number(card.getAttribute("data-price"));
        const fuel = card.getAttribute("data-fuel");
        const category = card.getAttribute("data-category");

        const priceMatch = price <= selectedPrice;
        const fuelMatch = selectedFuel === "all" || selectedFuel === fuel;
        const categoryMatch = selectedCategory === "all" || selectedCategory === category;

        card.classList.toggle("hidden", !(priceMatch && fuelMatch && categoryMatch));
      });
    }

    [filters.maxPrice, filters.fuel, filters.category].forEach(function (control) {
      control.addEventListener("input", applyFilters);
      control.addEventListener("change", applyFilters);
    });

    applyFilters();
  }

  function initDetailsGallery() {
    const mainImage = document.querySelector("[data-gallery-main]");
    const thumbs = document.querySelectorAll("[data-gallery-thumb]");
    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        const newSrc = thumb.getAttribute("data-image");
        if (!newSrc) return;

        mainImage.src = newSrc;
        mainImage.alt = thumb.getAttribute("data-alt") || "Vehicle gallery image";
      });
    });
  }

  function initMicroInteractions() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("pointerdown", function () {
        btn.style.transform = "translateY(1px) scale(0.99)";
      });
      btn.addEventListener("pointerup", function () {
        btn.style.transform = "";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });
  }

  function initForms() {
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const status = form.querySelector("[data-form-status]");
        if (status) {
          status.textContent = "Request received. A CVSCars advisor will contact you shortly.";
        }
        form.reset();
      });
    });
  }

  initPreloader();
  initMobileMenu();
  initActiveNav();
  initCurrentYear();
  initSmoothAnchorScroll();
  initRevealAnimations();
  initCounters();
  initParallax();
  initFeaturedCarousel();
  initCarsFilters();
  initDetailsGallery();
  initMicroInteractions();
  initForms();
})();
