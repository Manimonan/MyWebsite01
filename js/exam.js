// Exam Data (Can be loaded from JSON file)
const exams = [
  { title: "SSC CGL Tier 1", month: 1, date: "12 January 2025" },
  { title: "Railway Group D", month: 2, date: "05 February 2025" },
  { title: "Bank PO Prelims", month: 3, date: "18 March 2025" },
  { title: "NDA Exam", month: 4, date: "22 April 2025" },
  { title: "JEE Main Session 2", month: 4, date: "30 April 2025" },
  { title: "NEET Exam", month: 12, date: "05 December 2025" },
  { title: "NET-JRF Examination", month: 12, date: "18 December 2025" },
];

const monthSelect = document.getElementById("monthSelect");
const examList = document.getElementById("examList");

// Month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Create dropdown options
monthNames.forEach((m, index) => {
  const opt = document.createElement("option");
  opt.value = index + 1;
  opt.textContent = m;
  monthSelect.appendChild(opt);
});

// Auto-select current month
const currentMonth = new Date().getMonth() + 1;
monthSelect.value = currentMonth;

// Load exams for current month
displayExams(currentMonth);

// When user changes month
monthSelect.addEventListener("change", () => {
  const selectedMonth = parseInt(monthSelect.value);
  displayExams(selectedMonth);
});

// Load Exams in HTML
function displayExams(month) {
  examList.innerHTML = "";

  const filteredExams = exams.filter((exam) => exam.month === month);

  if (filteredExams.length === 0) {
    examList.innerHTML = "<p>No exams scheduled for this month.</p>";
    return;
  }

  filteredExams.forEach((exam) => {
      const card = document.createElement("div");
      card.className = "exam-card";
      card.innerHTML = `
       <div>
        <div class="exam-title">${exam.title}</div>
        <div class="exam-date">${exam.date}</div>
        </div>
        <button class="details-button">View Details</button>
      `;
      examList.appendChild(card);
    });
}
