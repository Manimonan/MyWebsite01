// Exam Data (Can be loaded from JSON file)
const exams = [
  { title: "SSC CGL Tier 1", month: "January", date: "12 January 2025" },
  { title: "Railway Group D", month: "February", date: "05 February 2025" },
  { title: "Bank PO Prelims", month: "March", date: "18 March 2025" },
  { title: "NDA Exam", month: "April", date: "22 April 2025" },
  { title: "JEE Main Session 2", month: "April", date: "30 April 2025" },
  { title: "NEET Exam", month: "May", date: "05 May 2025" },
];

// Load Exams in HTML
function displayExams(filterMonth = "all") {
  const examList = document.getElementById("examList");
  examList.innerHTML = "";

  const now = new Date();


  exams
    .filter(exam => filterMonth === now.getMonth() || exam.month === filterMonth)
    .forEach(exam => {
      const card = document.createElement("div");
      card.className = "exam-card";
      card.innerHTML = `
        <div class="exam-title">${exam.title}</div>
        <div class="exam-date">${exam.date}</div>
      `;
      examList.appendChild(card);
    });
}

// On Page Load
displayExams();

// Handle Filter Change
document.getElementById("monthFilter").addEventListener("change", function () {
  displayExams(this.value);
});