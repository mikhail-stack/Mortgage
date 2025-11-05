import Swiper from "swiper";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "/src/sass/style.scss";

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
          el: ".swiper-pagination",
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
