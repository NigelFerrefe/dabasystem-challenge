document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initSeoSlider();
  initScrollAnimation();
});

const initHeroSlider = () => {
  document.querySelectorAll(".mdlhero").forEach((section) => {
    const slider = section.querySelector(".mdlheroslider");
    const slides = section.querySelectorAll(".mdlheroslide");
    const prev = section.querySelector(".mdlheroprev");
    const next = section.querySelector(".mdlheronext");

    if (!slider) return;

    const slidesPerView = 1;

    if (slides.length <= slidesPerView) return;

    new Swiper(slider, {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: prev,
        nextEl: next,
      },
      allowTouchMove: true,
      watchOverflow: true,
      a11y: {
        enabled: true,
      },
    });
  });
};

const initSeoSlider = () => {
  document.querySelectorAll(".mdlseo").forEach((section) => {
    const slider = section.querySelector(".mdlseohighlightswrap");
    const scrollbar = section.querySelector(".mdlseoscrollbar");

    if (!slider || !scrollbar) return;

    const BREAKPOINT_DESKTOP = 768;
    let highlightsSwiper = null;
    let resizeTimer;

    const initHighlightsSwiper = () => { 
      const highlights = slider.querySelectorAll(".mdlseohighlight");
      if (highlights.length <= 1) return;

      const isMobile = window.innerWidth < BREAKPOINT_DESKTOP;
      
      if (!isMobile) {
        if (highlightsSwiper) {
          highlightsSwiper.destroy(true, true);
          highlightsSwiper = null;
        }
        return;
      }

      if (highlightsSwiper) return;

      highlightsSwiper = new Swiper(slider, {
        slidesPerView: 1,
        loop: false,
        speed: 800,
        allowTouchMove: true,
        autoHeight: false,
        scrollbar: {
          el: scrollbar,
          draggable: true,
        },
        watchOverflow: true,
        a11y: {
          enabled: true,
        },
      });
    };

    initHighlightsSwiper();

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initHighlightsSwiper, 150);
    });
  });
};

const initScrollAnimation = () => {
  const wrap = document.querySelector(".mdlwrap");
  const hero = document.querySelector(".mdlhero");

  if (!wrap || !hero) return;

  wrap.focus({ preventScroll: true });

  const TOUCH_THRESHOLD = 80;
  const SCROLL_STEP_WHEEL = 0.18;
  const SCROLL_STEP_TOUCH = 0.22;
  const PROGRESS_COMPLETE = 1;
  const PROGRESS_SEO_REVEAL = 0.85;
  const ANIMATION_DURATION = 900;

  let heroProgress = 0;
  let currentStep = 0;
  let isAnimating = false;
  let touchStartY = 0;
  let hasMoved = false;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const lockAnimation = () => {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, ANIMATION_DURATION);
  };

  const updateHeroProgress = () => {
    hero.style.transform = `translateY(-${heroProgress * 95}%)`;

    if (heroProgress >= PROGRESS_SEO_REVEAL) {
      wrap.classList.add("isseo");
    } else {
      wrap.classList.remove("isseo");
    }

    const radiusStart = 0.8;
    const radiusProgress =
      Math.max(0, heroProgress - radiusStart) / (1 - radiusStart);
    const radius = Math.min(radiusProgress * 5, 5);

    hero.style.borderRadius = `${radius}rem`;
  };

  const goSeoDetail = () => {
    if (isAnimating || currentStep >= 2) return;
    currentStep = 2;
    wrap.classList.add("isseodetail");
    lockAnimation();
  };

  const leaveSeoDetail = () => {
    if (isAnimating || currentStep < 2) return;
    currentStep = 1;
    wrap.classList.remove("isseodetail");
    lockAnimation();
  };

  const handleForward = (stepAmount) => {
    if (isAnimating) return;

    if (heroProgress < PROGRESS_COMPLETE) {
      heroProgress = clamp(heroProgress + stepAmount, 0, PROGRESS_COMPLETE);
      updateHeroProgress();

      if (heroProgress >= PROGRESS_COMPLETE) {
        currentStep = 1;
      }
      return;
    }

    if (currentStep === 1) {
      goSeoDetail();
    }
  };

  const handleBackward = (stepAmount) => {
    if (isAnimating) return;

    if (currentStep === 2) {
      leaveSeoDetail();
      return;
    }

    if (heroProgress > 0) {
      heroProgress = clamp(heroProgress - stepAmount, 0, PROGRESS_COMPLETE);
      updateHeroProgress();

      if (heroProgress < PROGRESS_COMPLETE) {
        currentStep = 0;
      }
    }
  };

  updateHeroProgress();

  wrap.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        handleForward(SCROLL_STEP_WHEEL);
      } else {
        handleBackward(SCROLL_STEP_WHEEL);
      }
    },
    { passive: false },
  );

  wrap.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      hasMoved = false;
    },
    { passive: true },
  );

  wrap.addEventListener(
    "touchmove",
    (e) => {
      if (isAnimating || hasMoved) return;

      const diffY = touchStartY - e.touches[0].clientY;

      if (Math.abs(diffY) < TOUCH_THRESHOLD) return;

      hasMoved = true;
      e.preventDefault();

      if (diffY > 0) {
        handleForward(SCROLL_STEP_TOUCH);
      } else {
        handleBackward(SCROLL_STEP_TOUCH);
      }
    },
    { passive: false },
  );

  wrap.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      handleForward(SCROLL_STEP_WHEEL);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleBackward(SCROLL_STEP_WHEEL);
    }
  });
};
