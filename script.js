const startBtn = document.getElementById("startBtn");
const infoSection = document.getElementById("info-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const quizForm = document.getElementById("quizForm");
const clearBtn = document.getElementById("clearLeaderboard");
const exportBtn = document.getElementById("exportCSV");

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

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const answers = {
    q1: "c",
    q2: "kẻ thù",
    q3: "c",
    q4: "cách mạng"
  };

  let score = 0;
  let feedback = "";

  const q1 = quizForm.q1.value;
  if (q1 === answers.q1) {
    score++;
    feedback += `<p class='correct'>Câu 1: Đúng</p>`;
  } else feedback += `<p class='incorrect'>Câu 1: Sai</p>`;

  const q2 = quizForm.q2.value.trim().toLowerCase();
  if (q2.includes(answers.q2)) {
    score++;
    feedback += `<p class='correct'>Câu 2: Đúng</p>`;
  } else feedback += `<p class='incorrect'>Câu 2: Sai</p>`;

  const q3 = quizForm.q3.value;
  if (q3 === answers.q3) {
    score++;
    feedback += `<p class='correct'>Câu 3: Đúng</p>`;
  } else feedback += `<p class='incorrect'>Câu 3: Sai</p>`;

  const q4 = quizForm.q4.value.trim().toLowerCase();
  if (q4.includes(answers.q4)) {
    score++;
    feedback += `<p class='correct'>Câu 4: Đúng</p>`;
  } else feedback += `<p class='incorrect'>Câu 4: Sai</p>`;

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const number = document.getElementById("number").value.trim();

  document.getElementById("studentInfo").innerText =
    `Họ tên: ${name} | Tiểu đội: ${team} | Số thứ tự: ${number}`;
  document.getElementById("score").innerText = `Điểm của bạn: ${score}/4`;
  document.getElementById("feedback").innerHTML = feedback;

  const newResult = { name, team, number, score };
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(newResult);
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  updateLeaderboard(leaderboard);
});

function updateLeaderboard(data) {
  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = "";
  data.forEach(item => {
    const row = `<tr>
      <td>${item.name}</td>
      <td>${item.team}</td>
      <td>${item.number}</td>
      <td>${item.score}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// 🧹 Xóa leaderboard
clearBtn.addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn xóa toàn bộ bảng xếp hạng không?")) {
    localStorage.removeItem("leaderboard");
    updateLeaderboard([]);
  }
});

// ⬇️ Xuất file CSV
exportBtn.addEventListener("click", () => {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  if (leaderboard.length === 0) {
    alert("Chưa có dữ liệu để xuất!");
    return;
  }

  let csv = "Họ tên,Tiểu đội,Số thứ tự,Điểm\n";
  leaderboard.forEach(item => {
    csv += `${item.name},${item.team},${item.number},${item.score}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leaderboard.csv";
  a.click();
  URL.revokeObjectURL(url);
});
