let formatData = {};
let activeCategory = "";


const filePath = "assets/mcqsData/format.json";

fetch(filePath)
  .then((response) => response.json())
  .then((data) => {
    formatData = data;
    //initial render
    activeCategory = Object.keys(formatData)[0];
    renderCategories();
    renderSubjects(activeCategory);
    renderTopics(formatData[activeCategory][Object.keys(formatData[activeCategory])[0]]);
  })
  .catch((error) => {
    console.error("Error loading format data:", error);
  });

const categoryTabs = document.getElementById("categoryTabs");
const subjectList = document.getElementById("subjectList");
const topicCards = document.getElementById("topicCards");

// Create slug from string
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}


/* ===== FUNCTIONS ===== */
function renderCategories() {
  categoryTabs.innerHTML = "";
  Object.keys(formatData).forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category; 
    if (category === activeCategory) btn.classList.add("active");

    btn.onclick = () => {
      activeCategory = category;
      renderCategories();
      renderSubjects(category);
      topicCards.innerHTML = "";
      renderTopics(formatData[category][Object.keys(formatData[category])[0]]);
    };
    categoryTabs.appendChild(btn);
  });
}

function renderSubjects(category) {
  subjectList.innerHTML = "";
  Object.keys(formatData[category]).forEach(subject => {
    const btn = document.createElement("button");
    btn.textContent = subject;

    btn.onclick = () => {
      document.querySelectorAll(".sidebar button")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTopics(formatData[category][subject]);
    };
    subjectList.appendChild(btn);
  });
}

function renderTopics(topics) {
  topicCards.innerHTML = "";
 topicCards.innerHTML = topics.map(topic => `
    <a href="Multiple-Choice-Questions.html?topicName=${createSlug(topic)}" class="card">
      <h3>${topic}</h3>
    </a>
  `).join("");
}
