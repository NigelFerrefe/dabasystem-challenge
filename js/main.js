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