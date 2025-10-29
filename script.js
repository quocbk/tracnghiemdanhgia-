// === CONFIG ===
const SCRIPT_URL = "hhttps://script.google.com/macros/s/AKfycbyPErwv2wloLciUZZauYv968voBBjzznpWY4escXf0kErl3Hr-4RT-eS1nRy9y4rlOw/exec"; // Dán URL Apps Script Web App vào đây

// === ELEMENTS ===
const startBtn = document.getElementById("startBtn");
const infoSection = document.getElementById("info-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const quizForm = document.getElementById("quizForm");

startBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const number = document.getElementById("number").value.trim();

  if (!name || !team || !number) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  infoSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
});

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const answers = {
    q1: "c",
    q2: "kẻ thù",
    q3: "c",
    q4: "cách mạng"
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

  resultSection.classList.remove("hidden");
  quizSection.classList.add("hidden");

  document.getElementById("studentInfo").innerText =
    `Họ tên: ${name} | Tiểu đội: ${team} | Số thứ tự: ${number}`;
  document.getElementById("score").innerText = `Điểm của bạn: ${score}/4`;

  // --- Gửi dữ liệu lên Google Sheet ---
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, team, number, score })
    });
    alert("✅ Nộp bài thành công! Điểm của bạn đã được lưu lên bảng xếp hạng.");
  } catch (err) {
    alert("❌ Lỗi khi gửi dữ liệu lên bảng xếp hạng. Kiểm tra lại URL Apps Script.");
  }
});
