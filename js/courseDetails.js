
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

document.getElementById('fullscreenToggle').addEventListener('click', toggleFullscreen);



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


// Confetti Effect
function triggerConfetti() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff0', '#f00', '#0f0', '#00f'],
    zIndex: 10000,
    ticks: 300, // Increase the duration
    scalar: 1.2, // Adjust scalar
    drift: 0.05, // Slight drift
    gravity: 0.5, // Reduced gravity
    disableForReducedMotion: true, // Respect reduced motion preferences
    shapes: ['circle', 'square'], // Variety of shapes
    angle: 90, // Shoot confetti upwards
    startVelocity: 30 // Reduced starting velocity
  });
}

[]
// ============================================
// Timeline progress ring
// ============================================

// Progress Ring Logic
const totalVideos = 4;
const initialProgress = 75; // Initial value set to 75% (3 out of 4 videos completed)
const remainingProgress = 25; // Remaining 25% to complete the lesson

function setProgress(percent) {
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  document.querySelector('.progressPercentageText').textContent = `${Math.round(percent)}%`;
}




// ============================================
// Overview, Comments - Tabs
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

document.getElementById('studentCmtPostBtn').addEventListener('click', function () {
  const textValue = document.getElementById('studentComment').value;
  const timestamp = Date.now(); // Get the current timestamp in milliseconds
  const formattedTime = formatTime(timestamp);

  if (textValue.trim() !== "") {
    const commentSection = document.getElementById('commentSection');

    // Create the comment div
    const commentDiv = document.createElement('div');
    commentDiv.className = 'flex mt-7';

    // User profile image
    const userProfileImg = document.createElement('img');
    userProfileImg.className = 'w-10 h-10 rounded-full border-2 border-primary';
    userProfileImg.src = 'assets/img/user.png';
    userProfileImg.alt = 'user profile';

    // Create comment content
    const commentContentDiv = document.createElement('div');
    commentContentDiv.className = 'pl-3 flex gap-3 w-full justify-between';

    // Comment text container
    const textContainer = document.createElement('div');
    const nameAndTimeDiv = document.createElement('div');
    nameAndTimeDiv.className = 'flex gap-1 items-center';

    const userName = document.createElement('p');
    userName.className = 'font-semibold text-base';
    userName.textContent = 'Faisal';

    const timeSpan = document.createElement('span');
    timeSpan.textContent = formattedTime;

    const timeText = document.createElement('p');
    timeText.className = 'text-black/50 underline text-sm';
    timeText.innerHTML = `at 5:00`;
    // timeText.innerHTML = `at ${timeSpan.outerHTML}`;

    nameAndTimeDiv.appendChild(userName);
    nameAndTimeDiv.appendChild(timeText);

    const commentParagraph = document.createElement('p');
    commentParagraph.className = 'max-w-[75%] overflow-hidden';
    commentParagraph.textContent = textValue;

    textContainer.appendChild(nameAndTimeDiv);
    textContainer.appendChild(commentParagraph);

    // Time of posting
    const timePosted = document.createElement('p');
    timePosted.className = 'min-w-fit';
    timePosted.textContent = formattedTime;

    commentContentDiv.appendChild(textContainer);
    commentContentDiv.appendChild(timePosted);

    // Assemble comment section
    commentDiv.appendChild(userProfileImg);
    commentDiv.appendChild(commentContentDiv);

    // Prepend the new comment to the comment section
    commentSection.insertBefore(commentDiv, commentSection.firstChild);

    // Clear the textarea after posting
    document.getElementById('studentComment').value = '';
  }
});

// ====================================
// Timeline details
// ====================================

const timelineBadgeBtn = document.querySelector('.timeline-badge-btn');
const timelineWindow = document.getElementById('timeline-window');
const bottomFixedRightGap = document.getElementById('bottomFixedRightGap');
const timelineInsideBtn = document.getElementById("timeline-inside-btn");
const viewFullscreen = document.getElementById("viewFullscreen");
const detailSection = document.getElementById("detailSection");
const fullScreenText = document.getElementById("fullScreenText");

function toggleVisibility() {
  // Toggle width and padding
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');

  // Toggle visibility of bottomFixedRightGap based on screen size
  if (window.innerWidth >= 1024) {
    // Toggle visibility using style.display for large screens
    bottomFixedRightGap.style.display = bottomFixedRightGap.style.display === 'none' ? 'block' : 'none';
  }
}

document.querySelector('.timeline-badge-btn').addEventListener('click', toggleVisibility);
document.getElementById('timeline-inside-btn').addEventListener('click', toggleVisibility);

// Ensure initial visibility on page load or window resize
function setInitialVisibility() {
  if (window.innerWidth >= 1024) {
    bottomFixedRightGap.style.display = 'block';  // Show on large screens
  } else {
    bottomFixedRightGap.style.display = 'none';   // Hide on smaller screens
  }
}

window.addEventListener('resize', setInitialVisibility);
window.addEventListener('DOMContentLoaded', setInitialVisibility);




viewFullscreen.addEventListener('click', function () {

  viewFullscreen.classList.toggle('mr-10');
  detailSection.classList.toggle('hidden');

  // Toggle the text of `fullScreenText` based on current text
  if (fullScreenText.innerText === 'View in Fullscreen') {
    fullScreenText.innerText = 'Exit Fullscreen';
  } else {
    fullScreenText.innerText = 'View in Fullscreen';
  }
  const accordion = document.querySelector('.accordion');

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');



  // toggle width and padding when click the shrink button
  sidebar.classList.toggle('w-24');
  sidebar.classList.toggle('w-72');


  // hide logo text when sidemenu shrink
  logoText.classList.toggle('hidden');

  // toggle btn will center when sidemenu shrink
  toggleBtnArea.classList.toggle('justify-end');
  toggleBtnArea.classList.toggle('justify-center');


  toggleBtn.classList.toggle('rotate-180')

  educatSidemenuBigBtn.classList.toggle('hidden')
  educatSidemenuSmBtn.classList.toggle('flex')
  educatSidemenuSmBtn.classList.toggle('hidden')

  // center the logo when sidemenu shrink
  sidemenuLogo.classList.toggle('justify-center');

  // hide the side menu list text when shrink
  sidebarTexts.forEach(text => text.classList.toggle('hidden'));

  // center the menu icons when shrink the side menu bar
  sidemenuList.forEach(li => {
    li.classList.toggle('justify-center');
    li.classList.toggle('pl-4');
    li.classList.toggle('pl-0');
  });

});
