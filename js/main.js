document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".mdlhero").forEach(function (section) {
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
});

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".mdlwrap");
  if (!wrap) return;

  const THRESHOLD = 100;
  const DURATION = 1000;

  let currentStep = 0;
  let isAnimating = false;
  let touchStartY = 0;
  let hasMoved = false;

  const lockAnimation = () => {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, DURATION);
  };

  const updateState = () => {
    wrap.classList.remove("isseo", "isseodetail");

    if (currentStep >= 1) {
      wrap.classList.add("isseo");
    }

    if (currentStep >= 2) {
      wrap.classList.add("isseodetail");
    }
  };

  const goNext = () => {
    if (isAnimating || currentStep >= 2) return;
    currentStep++;
    updateState();
    lockAnimation();
  };

  const goPrev = () => {
    if (isAnimating || currentStep <= 0) return;
    currentStep--;
    updateState();
    lockAnimation();
  };

  wrap.addEventListener(
    "wheel",
    (e) => {
      if (isAnimating || Math.abs(e.deltaY) < 15) return;

      e.preventDefault();

      e.deltaY > 0 ? goNext() : goPrev();
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

      if (Math.abs(diffY) < THRESHOLD) return;

      hasMoved = true;
      e.preventDefault();

      diffY > 0 ? goNext() : goPrev();
    },
    { passive: false },
  );
});
