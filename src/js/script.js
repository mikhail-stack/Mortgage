import Swiper from "swiper";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "/src/sass/style.scss";

try {
  let verticalSwiper;

  function initSwiper() {
    if (window.innerWidth > 768) {
      if (!verticalSwiper) {
        verticalSwiper = new Swiper(".process-steps__swiper", {
          direction: "vertical",
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 24,
          speed: 500,
          mousewheel: true,
          freeMode: true,
          observer: true,
          centeredSlides: true,
          pagination: {
            el: ".process-steps-pagination",
            clickable: true,
          },
          roundLengths: true,
          slideToClickedSlide: true,
          modules: [Pagination, Mousewheel],
        });
        setTimeout(() => {
          verticalSwiper.slideTo(1, 100);
        }, 100);
      }
    } else if (verticalSwiper && !verticalSwiper.destroyed) {
      verticalSwiper.destroy(true, true);
      verticalSwiper = null;
    }
  }

  initSwiper();

  window.addEventListener("resize", () => {
    initSwiper();
  });
} catch (e) {}

try {
  const reviewsSwiper = new Swiper(".reviews__swiper", {
    loop: true,
    slidesPerView: 1,
    speed: 300,
    slideToClickedSlide: true,
    mousewheel: true,
    pagination: {
      el: ".reviews__pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".reviews__button-next",
      prevEl: ".reviews__button-prev",
    },
    modules: [Navigation, Pagination, Mousewheel],
    breakpoints: {
      769: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });

  // Функция для обновления Swiper при изменении размера экрана
  function updateSwiperOnResize() {
    reviewsSwiper.update(); // Обновляем Swiper
  }

  // Добавляем обработчик события resize
  window.addEventListener("resize", updateSwiperOnResize);

  // Обновляем фракцию слайдов
  let reviewsSwiperAllSlides = document.querySelector(
    ".reviews__fraction-total"
  );
  let reviewsSwiperCurrentSlide = document.querySelector(
    ".reviews__fraction-current"
  );

  function updateFraction() {
    const slidesCount = document.querySelectorAll(
      ".reviews__swiper .swiper-slide:not(.swiper-slide-duplicate)"
    ).length;
    reviewsSwiperAllSlides.textContent = slidesCount
      .toString()
      .padStart(2, "0");
    reviewsSwiperCurrentSlide.textContent = "01";
  }

  updateFraction();

  reviewsSwiper.on("slideChange", function () {
    let currentSlide = this.realIndex + 1;
    reviewsSwiperCurrentSlide.textContent = currentSlide
      .toString()
      .padStart(2, "0");
  });

  // Обновляем фракцию при изменении размера экрана
  reviewsSwiper.on("resize", updateFraction);
} catch (e) {
  console.error(e);
}

document.addEventListener("DOMContentLoaded", () => {
  const questionBlock = document.querySelector(".question-block");
  const processStepsSection = document.querySelector(".process-steps");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains("end-trigger")) {
          if (entry.isIntersecting) {
            questionBlock.classList.add("visible");
          }
        } else if (entry.target.classList.contains("start-trigger")) {
          if (!entry.isIntersecting) {
            questionBlock.classList.remove("visible");
          }
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.2, 0.8],
    }
  );

  const endTrigger = document.createElement("div");
  endTrigger.classList.add("end-trigger");
  endTrigger.style.height = "1px";
  endTrigger.style.width = "100%";
  endTrigger.style.position = "absolute";
  endTrigger.style.bottom = "0";
  processStepsSection.appendChild(endTrigger);

  const startTrigger = document.createElement("div");
  startTrigger.classList.add("start-trigger");
  startTrigger.style.height = "1px";
  startTrigger.style.width = "100%";
  startTrigger.style.position = "absolute";
  startTrigger.style.top = "50%";
  processStepsSection.appendChild(startTrigger);

  observer.observe(endTrigger);
  observer.observe(startTrigger);
});
