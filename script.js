// === ELEMENTS ===
const startBtn = document.getElementById("startBtn");
const infoSection = document.getElementById("info-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const quizForm = document.getElementById("quizForm");

let timerInterval;
let timeLeft = 5 * 60; // 5 phút
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
    q1: "c",
    q2: "kẻ thù",
    q3: "c",
    q4: "cách mạng",
  };

  let score = 0;
  const q1 = quizForm.q1.value;
  const q2 = quizForm.q2.value.trim().toLowerCase();
  const q3 = quizForm.q3.value;
  const q4 = quizForm.q4.value.trim().toLowerCase();

  if (q1 === answers.q1) score++;
  if (q2.includes(answers.q2)) score++;
  if (q3 === answers.q3) score++;
  if (q4.includes(answers.q4)) score++;

  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const number = document.getElementById("number").value.trim();

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  document.getElementById("studentInfo").innerText = 
    `Họ tên: ${name} | Tiểu đội: ${team} | Số thứ tự: ${number}`;
  document.getElementById("score").innerText = `Điểm của bạn: ${score}/4`;

  document.getElementById("feedback").innerHTML =
    score === 4 ? "🌟 Xuất sắc!" :
    score >= 2 ? "👍 Làm khá tốt!" :
    "💪 Cần cố gắng thêm!";
});
