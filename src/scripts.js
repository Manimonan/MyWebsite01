
// dark mode toggle script — make robust and DOM-ready
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Apply saved theme on load
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    root.classList.add("dark");
  } else if (saved === "light") {
    root.classList.remove("dark");
  }

  // If toggle button isn't present (different page/layout), bail out gracefully
  if (!toggleButton) return;

  // Set initial label based on current theme
  // toggleButton.textContent = root.classList.contains("dark") ? "🔆" : "☀";

  toggleButton.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light"
    );

    // Update button label
    if (root.classList.contains("dark")) {
      toggleButton.src = "./assets/images/sun.png";
      toggleButton.alt = "Switch to dark mode";
    } else {
      toggleButton.src = "./assets/images/moon.png";
      toggleButton.alt = "Switch to light mode";
    }
    
  });
});
// //Scroll animation
// const scrollElements = document.querySelectorAll(".se");
// const elementObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("animate", "opacity-100", "translate-y-0");
//         elementObserver.unobserve(entry.target);
//       }
//     });
//   },
//   { threshold: 0.1 }
// );

// scrollElements.forEach((el) => {
//   el.classList.add(
//     "opacity-0",
//     "translate-y-10",
//     "transition",
//     "duration-700",
//     "ease-out"
//   );
//   elementObserver.observe(el);
// });
