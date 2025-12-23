document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const dropdown = btn.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== dropdown) d.classList.remove("open");
    });

    // Toggle current
    dropdown.classList.toggle("open");

    e.stopPropagation();
  });
});

// Load exam data

let examData = [];

const filePath = "assets/examsData/examsCards.json";
fetch(filePath)
  .then((res) => res.json())
  .then((data) => {
    examData = data;
    renderExamCards();
  });

function renderExamCards() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.getElementById("cards")

  // Filter based on search input
  document.querySelectorAll(".dropdown-menu div").forEach(item => {
  item.addEventListener("click", () => {
    
  });

  cards.innerHTML = examData.length
    ? examData.map((exam)=> `
    <div class="cards">
    <img src="${exam.imageSrc}" alt="${exam.title}"/>
    <h3>${exam.name}</h3>
    <a href="#">More Detials</a>
    </div>
    `).join(""): 
    `<p class="no-data">No exams found</p>`;

});
}