const monthFilter = document.getElementById("monthFilter");
const results = document.getElementById("examList");
let examData = [];

// Fetch exam data
const filePath = "assets/examsData/upcomingExams.json";
fetch(filePath)
  .then((response) => response.json())
  .then((data) => {
    examData = data;
    generateMonthOptions();
    const [defaultMonth, defaultYear] = monthFilter.value.split("-");
    filterExams(defaultMonth, defaultYear);
  })
  .catch((error) => console.error("Error loading exam data:", error));

// Generate month options

function generateMonthOptions() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  for (let i = -6; i <= 6; i++) {
    const date = new Date(currentYear, currentMonth + i, 1);
    const label = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const option = document.createElement("option");
    option.value = `${date.getMonth() + 1}-${date.getFullYear()}`;
    option.textContent = label;

    if (i === 0) option.selected = true;

    monthFilter.appendChild(option);
  }
}

// Filter function
function filterExams(month, year) {
  const filtered = examData.filter(
    (item) => item.month === Number(month) && item.year === Number(year)
  );

  results.innerHTML = filtered.length
    ? filtered
        .map(
          (item) => `
        <div class="result-card">
          <div class="result-info">
           <h3>${item.name}</h3>
           <p>${item.tentativeDate}</p>
          </div>
          <div class="result-desc">
           <a href="/examinations/${item.title}.html" class="dtl-btn">View Details</a>
          </div>
         </div>`
        )
        .join("")
    : `<p>No exams found for this month.</p>`;
}

// Event Listener
monthFilter.addEventListener("change", function () {
  const [month, year] = this.value.split("-");
  filterExams(month, year);
});
