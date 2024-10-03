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




// Function to trigger the confetti
function triggerConfetti() {
  confetti({
    particleCount: 200, // Number of confetti particles
    spread: 70, // Spread of the confetti
    origin: { y: 0.6 }, // Origin of the confetti (centered vertically)
    colors: ['#FFA500', '#FF8C00', '#FF4500', '#FFD700'], // Shades of orange
  });
}

// Initialize the progress bar globally so that it can be accessed in the function
let bar; 

// Ensure the code runs after the DOM is fully loaded
window.onload = function () {
  // Create a new circular progress bar
  bar = new ProgressBar.Circle('#progress-container', {
    color: '#FFA500',  // Progress color
    trailColor: '#fdefde',  // Background circle color
    strokeWidth: 14,  // Thickness of the progress bar
    trailWidth: 14,  // Thickness of the background circle
    duration: 1400,  // Animation duration in ms
    easing: 'easeInOut',  // Animation easing style (use `easeInOut` instead of bounce)
    text: {
      autoStyleContainer: false
    },
    from: { color: '#ffc46b', width: 14 },  // Start color
    to: { color: '#fda837', width: 14 },  // End color
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color); // Update stroke color dynamically
      // circle.setText(Math.round(circle.value() * 100) + '%'); // Update text inside the circle
      document.getElementById('progressText').textContent = correctQuizAnswers; // Sync text with progress
    }
  });
};


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



