// Array of student leaderboard data
const students = [
  { rank: 1, name: "Abdul Raheem", points: 250, image: "assets/img/std1.png" }, // Male
  { rank: 2, name: "Mohammed Faiz", points: 230, image: "assets/img/std1.png" }, // Male
  { rank: 3, name: "Ayesha Karim", points: 215, image: "assets/img/std2.png" }, // Female
  { rank: 4, name: "Zara Ali", points: 200, image: "assets/img/std2.png" }, // Female
  { rank: 5, name: "Omar Siddiqui", points: 180, image: "assets/img/std1.png" }, // Male
  { rank: 6, name: "Fatima Noor", points: 170, image: "assets/img/std2.png" }, // Female

  // Your profile (Highlighted)
  { rank: 7, name: "You", points: 165, image: "assets/img/std1.png", isMe: true },

  { rank: 8, name: "Ali Raza", points: 160, image: "assets/img/std1.png" }, // Male
  { rank: 9, name: "Sarah Iqbal", points: 155, image: "assets/img/std2.png" }, // Female
  { rank: 10, name: "Imran Khan", points: 150, image: "assets/img/std1.png" }, // Male
  { rank: 11, name: "Hana Yusuf", points: 145, image: "assets/img/std2.png" }, // Female
  { rank: 12, name: "Bilal Ahmed", points: 140, image: "assets/img/std1.png" }, // Male
  { rank: 13, name: "Rashid Ansari", points: 135, image: "assets/img/std1.png" }, // Male
  { rank: 14, name: "Mariam Sultan", points: 130, image: "assets/img/std2.png" }, // Female
  { rank: 15, name: "Tariq Hussain", points: 125, image: "assets/img/std1.png" }, // Male
  { rank: 16, name: "Nadia Rahman", points: 120, image: "assets/img/std2.png" }, // Female
  { rank: 17, name: "Yasir Khan", points: 115, image: "assets/img/std1.png" }, // Male
  { rank: 18, name: "Aminah Farooq", points: 110, image: "assets/img/std2.png" }, // Female
  { rank: 19, name: "Sami Ullah", points: 105, image: "assets/img/std1.png" }, // Male
  { rank: 20, name: "Farhan Sheikh", points: 100, image: "assets/img/std1.png" } // Male
];



// Function to render leaderboard
function renderLeaderboard() {
  const leaderboard = document.getElementById("leaderboard");

  if (!leaderboard) return; // Ensure the element exists before modifying it

  leaderboard.innerHTML = students.map(student => `
    <div class="flex justify-between px-3 py-1 rounded-xl border border-black/10
      ${student.isMe ? 'bg-[#bf4b00] text-white' : 'bg-white'}">
      
      <div class="flex gap-2 items-center">
        <p class="font-semibold">${student.rank}</p>
        <img class="w-10 h-10 rounded-full border-2 border-white" src="${student.image}" alt="">
        <p class="font-semibold">${student.name}</p>
      </div>

      <div class="flex gap-1 items-center justify-center">
        <img class="w-4 h-4 object-cover" src="assets/img/educoin-sm.png" alt="educoin">
        <p class="font-semibold ${student.isMe ? 'text-white' : 'text-primaryDark'}">${student.points}</p>
      </div>

    </div>
  `).join(""); // Use join("") to avoid unwanted commas in HTML output
}

// Call the function after DOM is loaded
document.addEventListener("DOMContentLoaded", renderLeaderboard);


// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const leaderboardPopup = document.getElementById("leaderboardPopup");
  const leaderboardBtn = document.getElementById("learderboardPopupBtn");
  const closeBtn = document.getElementById("leaderboardClosebtn");

  // Show leaderboard popup when "View all" is clicked
  leaderboardBtn.addEventListener("click", function (event) {
      event.preventDefault();
      leaderboardPopup.classList.remove("hidden");
      leaderboardPopup.classList.add("flex");
  });

  // Hide leaderboard popup when close button is clicked
  closeBtn.addEventListener("click", function () {
      leaderboardPopup.classList.add("hidden");
      leaderboardPopup.classList.remove("flex");
  });
});
