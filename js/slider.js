const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dotsContainer");

let slides = [];
let currentIndex = 0;
let autoPlayInterval;
let startX = 0;

/* Load JSON Slide Data */
const dataUrl = "assets/sliderData/data.json";
fetch(dataUrl)
  .then((res) => res.json())
  .then((data) => {
    slides = data;
    createSlides();
    startSlider();
  });

/* Create Slides + Dots */
function createSlides() {
  slider.innerHTML = "";
  dotsContainer.innerHTML = "";
  latestSlides = slides.slice(-10);
  

  latestSlides.forEach((item, index) => {
    slider.innerHTML += `
     <a href="description.html?topic=${item.caption}" class="slider-link" >
      <div class="slide${index === 0 ? " active" : ""}">
        <img src="${item.image}" />
        <div class="caption">${item.caption}</div>
      </div>
      </a>
    `;

    dotsContainer.innerHTML += `
      <div class="dot ${
        index === 0 ? "active" : ""
      }" onclick="goToSlide(${index})"></div>
    `;
  });
}

/* Show slide by index */
function goToSlide(index) {
  let slideElements = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");

  slideElements.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slideElements[index].classList.add("active");
  dots[index].classList.add("active");

  currentIndex = index;
}

/* Auto-play */
function startSlider() {
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % latestSlides.length;
    goToSlide(currentIndex);
  }, 3000); // 3 sec per slide
}

/* Touch swipe (Mobile) */
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let difference = startX - endX;

  if (difference > 50) {
    // Swipe Left → Next slide
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  } else if (difference < -50) {
    // Swipe Right → Previous slide
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  }
});
