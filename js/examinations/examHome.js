let examData = [];
let currentCategory = "";
let searchTerm = "";

// Dropdown functionality

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

const filePath = "assets/examsData/examsCards.json";
fetch(filePath)
  .then((res) => res.json())
  .then((data) => {
    examData = data;
    renderExamCards(examData);
  });

// category filter

document.querySelectorAll(".dropdown-menu div").forEach(item => {
  item.addEventListener("click",()=>{
    currentCategory = item.getAttribute("data-category");

   document.querySelectorAll(".dropdown-menu div").forEach(i => i.classList.remove("active"));
   item.classList.add("active");

   applyFilters();
  })
});

// Search functionality

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value.toLowerCase();
  clearSearch.style.display = searchTerm ? "block" : "none";
  applyFilters();
});

// Clear search box
document.getElementById("clearSearch").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  searchTerm = "";
  document.getElementById("clearSearch").style.display = "none";
  applyFilters();
});

// Apply filters and render cards
function applyFilters() {
  let filteredData = examData;

  if (currentCategory) {
    filteredData = filteredData.filter(exam => exam.category === currentCategory);
  }

  if (searchTerm) {
    filteredData = filteredData.filter(exam => 
      exam.name.toLowerCase().includes(searchTerm) || 
      exam.title.toLowerCase().includes(searchTerm)
    );
  }

  renderExamCards(filteredData);
}

// Render exam cards    
function renderExamCards(data) {
 
  const cards = document.getElementById("cards")


  cards.innerHTML = data.length
    ? data.map((exam)=> `
    <div class="cards">
    <img src="${exam.imageSrc}" alt="${exam.title}"/>
    <h3>${exam.name}</h3>
    <a href="#">More Detials</a>
    </div>
    `).join(""): 
    `<p class="no-data">No exams found</p>`;

  
};