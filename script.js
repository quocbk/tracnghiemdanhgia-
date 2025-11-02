// === ELEMENTS ===
const startBtn = document.getElementById("startBtn");
const infoSection = document.getElementById("info-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const quizForm = document.getElementById("quizForm");

let timerInterval;
let timeLeft = 30 * 60; // 30 phút
let isAdmin = false; // ✅ Khai báo toàn cục

// === CHỈ ĐƯỢC LÀM 1 LẦN ===
window.addEventListener("DOMContentLoaded", () => {
  const done = localStorage.getItem("hasDoneQuiz");

  if (done) {
    infoSection.innerHTML = `
      <h2>⚠️ Bạn đã làm bài trước đó</h2>
      <p>Bạn chỉ được làm bài một lần duy nhất.</p>
      <input type="password" id="adminCode" placeholder="Nhập mã giáo viên (nếu có)" style="margin-top: 10px; padding: 8px;">
      <button id="adminUnlock" style="margin-top: 8px;">Mở khóa</button>
    `;

    document.getElementById("adminUnlock").addEventListener("click", () => {
      const code = document.getElementById("adminCode").value.trim();
      if (code === "boingheocodon") {
        localStorage.removeItem("hasDoneQuiz");
        location.reload();
      } else {
        alert("❌ Mã giáo viên không đúng!");
      }
    });
  }
});

// === BẮT ĐẦU LÀM BÀI ===
startBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const number = document.getElementById("number").value.trim();
  const adminCode = document.getElementById("code").value.trim();

  if (!name || !team || !number) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  isAdmin = adminCode === "boingheocodon"; // ✅ Cập nhật biến toàn cục

  if (localStorage.getItem("hasDoneQuiz") && !isAdmin) {
    alert("⚠️ Bạn đã làm bài rồi, không thể làm lại!");
    return;
  }

  infoSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  startTimer();
});

// === BỘ ĐẾM THỜI GIAN 5 PHÚT ===
function startTimer() {
  const timerDisplay = document.createElement("h3");
  timerDisplay.id = "timer";
  timerDisplay.style.textAlign = "center";
  timerDisplay.style.color = "red";
  quizSection.prepend(timerDisplay);

  updateTimer(timerDisplay);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer(timerDisplay);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Hết thời gian! Bài làm sẽ được nộp tự động.");
      quizForm.requestSubmit();
    }
  }, 1000);
}

function updateTimer(el) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  el.textContent = `⏳ Thời gian còn lại: ${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// === NỘP BÀI ===
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearInterval(timerInterval);

  if (!isAdmin) localStorage.setItem("hasDoneQuiz", "true"); // ✅ Bây giờ isAdmin có giá trị đúng

  const answers = {
    q1:  "d",
    q2:  "a",
    q3:  "c",
    q4:  "a",
    q5:  "c",
    q6:  "a",
    q7:  "c",
    q8:  "b",
    q9:  "c",
    q10: "b",
    q11: "d",
    q12: "c",
    q13: "c",
    q14: "c",
    q15: "b",
    q16: "c",
    q17: "nhà nước",
    q18: "thu lợi bất chính",
    q19: "tuyên truyền, giáo dục",
    q20: "câu lạc bộ",
  };

  let score = 0;
  const q1  = quizForm.q1.value;
  const q2  = quizForm.q2.value;
  const q3  = quizForm.q3.value;
  const q4  = quizForm.q4.value;
  const q5  = quizForm.q5.value;
  const q6  = quizForm.q6.value;
  const q7  = quizForm.q7.value;
  const q8  = quizForm.q8.value;
  const q9  = quizForm.q9.value;
  const q10 = quizForm.q10.value;
  const q11 = quizForm.q11.value;
  const q12 = quizForm.q12.value;
  const q13 = quizForm.q13.value;
  const q14 = quizForm.q14.value;
  const q15 = quizForm.q15.value;
  const q16 = quizForm.q16.value;
  const q17 = quizForm.q17.value.trim().toLowerCase();
  const q18 = quizForm.q18.value.trim().toLowerCase();
  const q19 = quizForm.q19.value.trim().toLowerCase();
  const q20 = quizForm.q20.value.trim().toLowerCase();

  if (q1  === answers.q1)  score++;
  if (q2  === answers.q2)  score++;
  if (q3  === answers.q3)  score++;
  if (q4  === answers.q4)  score++;
  if (q5  === answers.q5)  score++;
  if (q6  === answers.q6)  score++;
  if (q7  === answers.q7)  score++;
  if (q8  === answers.q8)  score++;
  if (q9  === answers.q9)  score++;
  if (q10 === answers.q10) score++;
  if (q11 === answers.q11) score++;
  if (q12 === answers.q12) score++;
  if (q13 === answers.q13) score++;
  if (q14 === answers.q14) score++;
  if (q15 === answers.q15) score++;
  if (q16 === answers.q16) score++;
  if (q17.includes(answers.q17)) score++;
  if (q18.includes(answers.q18)) score++;
  if (q19.includes(answers.q19)) score++;
  if (q20.includes(answers.q20)) score++;

  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const number = document.getElementById("number").value.trim();

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  document.getElementById("studentInfo").innerText = 
    `Họ tên: ${name} | Tiểu đội: ${team} | Số thứ tự: ${number}`;
  document.getElementById("score").innerText = `Điểm của bạn: ${score}/20`;

  document.getElementById("feedback").innerHTML =
    score === 20 ? "🌟 Xuất sắc!" :
    score >= 10 ? "👍 Làm khá tốt!" :
    "💪 Cần cố gắng thêm!";
});
