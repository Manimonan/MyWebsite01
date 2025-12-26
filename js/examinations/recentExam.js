let recentExams = [];

const recentExamsCards = document.getElementById("recentExams")

const filepath = "assets/examsData/recentExams.json"
fetch(filepath)
  .then((res) => res.json())
  .then((data) => {
    recentExams = data;
    renderRecentExamCards();
  });

// Render recent exam cards
function renderRecentExamCards() {
  recentExamsCards.innerHTML = recentExams.length
    ? recentExams.map((exam) => `
      <div class="recent-exam-card">
        <p class="exam-date">${exam.examName}</p>
        <p class="exam-vaccency">${exam.noOfVaccency}</p>
        <div class="exam-details">
        <p>Application Start Date: ${exam.applicationStartDate}</p>
        <p>Application End Date: ${exam.lastDate}</p>
        </div>
        <p class="website-link">Visit official website <a src="${exam.officialWebsieLink}">click heare</a></p>
        <div class="exam-btns">
            <a href="${exam.applyLink}" class="apply-btn">Apply Now</a>
            <a href="${exam.notificationLink}" class="notification-btn">View Notification</a>
        </div>
      </div>
    `).join("") 
    : `<p class="no-data">No recent exams found</p>`;
}


