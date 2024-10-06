// ============================================
// Quiz completion popup
// ============================================

// Grab the necessary elements
const submitBtn = document.getElementById('quizSubmitBtn');
const quizCompletionPopup = document.getElementById('quizCompletionPopup');
const quizContinueBtn = document.getElementById('quizContinueBtn');
const cancelBtn = document.getElementById('cancelBtn');
const studentReviewPopup = document.getElementById('studentReviewPopup');
const unitCompletionPopup = document.getElementById('unitCompletionPopup');
const stdReviewCloseBtn = document.getElementById('stdReviewCloseBtn');



// Hide the popup when either the OK or Cancel button is clicked
quizContinueBtn.addEventListener('click', () => {
  quizCompletionPopup.classList.add('hidden');
  studentReviewPopup.classList.remove('hidden');
  studentReviewPopup.classList.add('flex');
});

cancelBtn.addEventListener('click', () => {
  quizCompletionPopup.classList.add('hidden');
});

function selectOption(selectedDiv, questionName) {
  // Deselect all options for the current question
  const allOptions = document.querySelectorAll(`div[data-option]`);
  allOptions.forEach(option => {
    option.classList.remove('border-[3px]', 'border-primary');
  });

  // Select the clicked option
  selectedDiv.classList.add('border-[3px]', 'border-primary');

  // Set the corresponding radio input as checked
  const input = selectedDiv.querySelector('input[type="radio"]');
  input.checked = true;
}

//=========================================
// Quiz Rating, feedback
// ============================================

// Sample questions JSON
const questions = [
  {
    id: 1,
    questionNo: 1,
    question: "Did you find the concept of 3D modeling in robotics easy to understand?",
    options: [
      { emojiImg: "🙂", emojiName: "Easy" },
      { emojiImg: "😄", emojiName: "Clear" },
      { emojiImg: "😐", emojiName: "Neutral" },
      { emojiImg: "😕", emojiName: "Difficult" },
      { emojiImg: "😫", emojiName: "Hard" }
    ]
  },
  {
    id: 2,
    questionNo: 2,
    question: "How clear were the instructions for using 3D design software in the course?",
    options: [
      { emojiImg: "😃", emojiName: "Clear" },
      { emojiImg: "😊", emojiName: "Good" },
      { emojiImg: "😐", emojiName: "Okay" },
      { emojiImg: "😕", emojiName: "Unclear" },
      { emojiImg: "😠", emojiName: "Confusing" }
    ]
  },
  {
    id: 3,
    questionNo: 3,
    question: "How well did the course cover the basics of robotics components?",
    options: [
      { emojiImg: "😎", emojiName: "Thorough" },
      { emojiImg: "🙂", emojiName: "Good" },
      { emojiImg: "😐", emojiName: "Moderate" },
      { emojiImg: "😕", emojiName: "Sparse" },
      { emojiImg: "😣", emojiName: "Lacking" }
    ]
  },
  {
    id: 4,
    questionNo: 4,
    question: "Was the example project provided helpful in understanding robotics design principles?",
    options: [
      { emojiImg: "🤩", emojiName: "Helpful" },
      { emojiImg: "😄", emojiName: "Useful" },
      { emojiImg: "😐", emojiName: "Neutral" },
      { emojiImg: "😕", emojiName: "Not Helpful" },
      { emojiImg: "😢", emojiName: "Useless" }
    ]
  },
  {
    id: 5,
    questionNo: 5,
    question: "How effective was the feedback provided during the course in improving your understanding?",
    options: [
      { emojiImg: "💯", emojiName: "Effective" },
      { emojiImg: "🙂", emojiName: "Helpful" },
      { emojiImg: "😐", emojiName: "Neutral" },
      { emojiImg: "😕", emojiName: "Ineffective" },
      { emojiImg: "👎", emojiName: "Poor" }
    ]
  }
];



let answers = [];
let rating = 0;
let currentQuestion = 0;

// Initialize quiz
function initQuiz() {
  renderQuestion();
  updateProgressBar();
}

function renderQuestion() {
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML = ""; // Clear the container

  const question = questions[currentQuestion];

  // Create the main question container
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question", "question-active");

  // Create the question number paragraph
  const questionNumberP = document.createElement("p");
  questionNumberP.innerHTML = `Question <span>${question.questionNo}</span>`;
  questionDiv.appendChild(questionNumberP);

  // Create the question text paragraph
  const questionText = document.createElement("p");
  questionText.classList.add("font-semibold", "text-lg");
  questionText.innerText = question.question;
  questionDiv.appendChild(questionText);

  // Create the options container
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add(
    "flex", "lg:flex-row", "flex-col",
    "w-full", "justify-between", "gap-3", "pt-3"
  );

  question.options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add(
      "std-review-radio-option", // Specific class for styling
      "p-5", "bg-[#f7f7f7]", "w-full", "min-h-[20%]",
      "flex", "flex-col", "justify-center", "items-center",
      "gap-2", "rounded-2xl", "cursor-pointer",
      "border-[3px]", "border-transparent"
    );
    optionDiv.dataset.option = option.emojiName;
    optionDiv.onclick = () => selectOption(optionDiv, `question_${question.id}`);

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question_${question.id}`;
    radio.value = option.emojiName;
    radio.classList.add("hidden");

    const emojiSpan = document.createElement("p");
    emojiSpan.innerText = option.emojiImg;
    emojiSpan.style.fontSize = "2rem";

    const label = document.createElement("label");
    label.classList.add("font-medium");
    label.classList.add("text-center");
    label.innerText = option.emojiName;

    optionDiv.appendChild(radio);
    optionDiv.appendChild(emojiSpan);
    optionDiv.appendChild(label);

    optionsContainer.appendChild(optionDiv);
  });

  questionDiv.appendChild(optionsContainer);
  questionContainer.appendChild(questionDiv);
}

function selectOption(selectedDiv, questionName) {
  // Deselect all options for the current question by setting border to transparent
  const allOptions = selectedDiv.parentNode.querySelectorAll(".std-review-radio-option");
  allOptions.forEach(option => {
    option.classList.remove('border-primary');
    option.classList.add('border-transparent');
  });

  // Select the clicked option by changing border color to primary
  selectedDiv.classList.remove('border-transparent');
  selectedDiv.classList.add('border-primary');

  // Set the corresponding radio input as checked
  const input = selectedDiv.querySelector('input[type="radio"]');
  input.checked = true;
}

// Update the progress bar
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const totalQuestions = questions.length;

  // Update progress only if currentQuestion is greater than 0
  if (currentQuestion > 0) {
    const progressPercent = ((currentQuestion) / (totalQuestions - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
  } else {
    // Keep at 0% if it's the first question
    progressBar.style.width = '0%';
  }
}

// Handle Close button click
document.getElementById("stdReviewCloseBtn").addEventListener('click', () => {
  document.getElementById("studentReviewPopup").classList.add('hidden');
});

// Handle unitCompletionPopupCloseBtn button click
document.getElementById("unitCompletionPopupCloseBtn").addEventListener('click', () => {
  document.getElementById("unitCompletionPopup").classList.add('hidden');
});

// Handle quizCompletionPopupCloseBtn button click
document.getElementById("quizCompletionPopupCloseBtn").addEventListener('click', () => {
  document.getElementById("quizCompletionPopup").classList.add('hidden');
});


// Handle Next button click
document.getElementById("nextBtn").addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="question_${questions[currentQuestion].id}"]:checked`
  );
  if (!selectedOption) {
    alert("Please select an option before continuing.");
    return;
  }

  answers[currentQuestion] = selectedOption.value;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateProgressBar();
    // document.getElementById("prevBtn").disabled = false;
    // document.getElementById("prevBtn").style.remove = "opacity-0";
    // document.getElementById("prevBtn").style.remove = "opacity-0";
    document.getElementById("prevBtn").classList.remove("opacity-0");


  } else if (currentQuestion === questions.length - 1) {
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("ratingContainer").style.display = "block";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";

    document.getElementById("submitFinalBtn").style.display = "block";
    updateProgressBar();

    // Change button container class to align buttons to the right
    document.getElementById("buttonContainer").classList.remove("justify-between");
    document.getElementById("buttonContainer").classList.add("justify-end");
  }
});

// Handle Previous button click
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion === 0) {
    currentQuestion--;
    renderQuestion();
    updateProgressBar();
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";
  }

  if (currentQuestion === 0) {
    document.getElementById("prevBtn").disabled = true;
  }
});

// Handle Star Rating click
const stars = document.querySelectorAll('.student-rating-star');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    stars.forEach((s, i) => {
      s.setAttribute('fill', i <= index ? 'rgba(255,186,7,1)' : 'rgba(216,205,200,1)');
    });
    // Store rating value
    rating = index + 1;
  });
});

// Update Star Rating UI
function updateStarRating(rating) {
  document.querySelectorAll('.student-rating-star').forEach(star => {
    const value = star.getAttribute('data-value');
    if (value <= rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Handle Submit Final button click
document.getElementById("submitFinalBtn").addEventListener("click", () => {
  const comment = document.getElementById("comment").value;

  document.getElementById("studentReviewPopup").classList.add('hidden');
  document.getElementById("studentReviewPopup").classList.remove('flex');
  document.getElementById("studentReviewPopup").classList.remove('fixed');

  document.getElementById("unitCompletionPopup").classList.remove('hidden');

  const finalData = {
    answers,
    rating,
    comment
  };

  triggerConfetti()
  console.log("Final Submission:", finalData);

  // Reset Quiz
  resetQuiz();
});

// Reset the quiz after submission
function resetQuiz() {
  currentQuestion = 0;
  answers = [];
  rating = 0;
  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("ratingContainer").style.display = "none";
  renderQuestion();
  updateProgressBar();
  stars.forEach((star) => {
    star.setAttribute('fill', 'rgba(216,205,200,1)');
  });
  document.getElementById("comment").value = "";
  document.getElementById("prevBtn").disabled = true;
}

// Initialize the quiz when the page is ready
initQuiz();

// Function to trigger the confetti
function triggerConfetti() {
  confetti({
    particleCount: 200, // Number of confetti particles
    spread: 70, // Spread of the confetti
    origin: { y: 0.6 }, // Origin of the confetti (centered vertically)
    colors: ['#FFA500', '#FF8C00', '#FF4500', '#FFD700'], // Shades of orange
  });
}

// ============================================
// Timeline accordion
// ============================================

document.querySelectorAll('.accordion-header').forEach(header => {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.arrow');

  // Check if the header has the active class
  if (header.classList.contains('timeline-active')) {
    content.style.display = 'flex';
    arrow.style.transform = 'rotate(180deg)';
  }

  header.addEventListener('click', () => {
    // Toggle active class
    header.classList.toggle('timeline-active');

    // Toggle content visibility
    content.style.display = content.style.display === 'flex' ? 'none' : 'flex';

    // Rotate the arrow
    arrow.style.transform = content.style.display === 'flex' ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});


// ============================================
// Overivew, Comments, Downloads - Tabs
// ============================================

document.querySelectorAll('.course-view-tab').forEach(tab => {
  tab.addEventListener('click', function () {

    // Remove tab-active class from all tabs
    document.querySelectorAll('.course-view-tab').forEach(t => t.classList.remove('tab-active'));

    // Add tab-active class to the clicked tab
    this.classList.add('tab-active');

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

    // Show the corresponding tab content
    const tabContent = document.getElementById(this.getAttribute('data-tab'));
    tabContent.style.display = 'block';
  });
});

// ====================================
// Comment section 
// ====================================

function formatTime(timestamp) {
  const now = new Date();
  const postTime = new Date(timestamp);
  const timeDifference = now - postTime;

  const msInDay = 24 * 60 * 60 * 1000;

  if (timeDifference < msInDay && now.getDate() === postTime.getDate()) {
    return `Today ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (timeDifference < msInDay * 2 && now.getDate() !== postTime.getDate()) {
    return `Yesterday ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (timeDifference < msInDay * 7) {
    const daysAgo = Math.floor(timeDifference / msInDay);
    return `${daysAgo} days ago ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return postTime.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) + ` ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}



// updatePieProgress - Ensure the code runs after the DOM is fully loaded
window.onload = function () {
  // Create a new circular progress bar
    bar = new ProgressBar.Circle('#progress-container', {
    color: '#FFA500',  // Progress color
    trailColor: '#d3d3d3',  // Background circle color
    strokeWidth: 14,  // Thickness of the progress bar
    trailWidth: 14,  // Thickness of the background circle
    duration: 1400,  // Animation duration in ms
    easing: 'easeInOut',  // Animation easing style (use `easeInOut` instead of bounce)
    text: {
      autoStyleContainer: false
    },
    from: { color: '#FFEA82', width: 14 },  // Start color
    to: { color: '#FF8C00', width: 14 },  // End color
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color); // Update stroke color dynamically
      circle.setText(Math.round(circle.value() * 100) + '%'); // Update text inside the circle
      document.getElementById('progressText').textContent = Math.round(circle.value() * 100) + '%'; // Sync text with progress
    }
  });

  // Function to update progress
  function updatePieProgress(progress) {
    bar.animate(progress / 100); // Progress from 0 to 1
  }

  // Example usage: Call the function to update progress
  updatePieProgress(0);   // 0% progress initially
  setTimeout(() => updatePieProgress(50), 2000);  // 50% after 2 seconds
  setTimeout(() => updatePieProgress(100), 4000);  // 100% after 4 seconds
};

// ====================================
// Timeline details
// ====================================

const timelineBadgeBtn = document.querySelector('.timeline-badge-btn')
const timelineWindow = document.getElementById('timeline-window');
const timelineInsideBtn = document.getElementById("timeline-inside-btn")

document.querySelector('.timeline-badge-btn').addEventListener('click', function () {

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');
})

document.getElementById('timeline-inside-btn').addEventListener('click', function () {



  const accordion = document.querySelector('.accordion');

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');

});

// ====================================
// Slider details
// ====================================

document.addEventListener('DOMContentLoaded', function () {

  // Initialize Swiper
  var swiper = new Swiper(".courseSlide", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// Function to show quiz result
function showQuizResult() {
  const totalQuestions = quizData.totalQuestions.length;
  let earnedEducoins = 0;

  // Loop through user answers to calculate total Educoins earned
  userQuizAnswers.forEach(answer => {
    const question = quizData.totalQuestions[answer.questionId]; // Get the corresponding question
    if (answer.answer === question.correctAnswer) { // Check if the answer is correct
      earnedEducoins += question.educoinForThisQuestion; // Add Educoins for the correct answer
    }
  });

  // Calculate percentage of correct answers
  const percentageCorrect = (correctQuizAnswers / totalQuestions) * 100;

  // Update progress circle using ProgressBar.js
  bar.animate(percentageCorrect / 100); // ProgressBar.js expects a value between 0 and 1

  // Update text inside the circle
  document.getElementById('progressText').textContent = `${correctQuizAnswers}`;

  // Update the earned Educoins element
  quizResultEducoinEarnedElem.innerText = earnedEducoins;

  // Update correct answers element
  document.querySelector(".quizCorrectAnswers").innerText = correctQuizAnswers;

  // Show the quiz completion popup
  quizCompletionPopup.classList.remove('hidden');
  quizCompletionPopup.classList.add('flex');

  // Trigger any celebration animation (if required)
  triggerConfetti();
}



