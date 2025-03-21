// skill map course list
const courseData = [
  {
    id: "1",
    coinCount: 5,
    courseStatus: "completed",
    courseName: "HARDWARE AND SOFTWARE",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "2",
    coinCount: 3,
    courseStatus: "completed",
    courseName: "GOOGLE SLIDES",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "3",
    coinCount: 4,
    courseStatus: "completed",
    courseName: "MICROBIT PROJECTS",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "4",
    coinCount: 8,
    courseStatus: "now",
    courseName: "INTRODUCTION TO LOGO PROGRAMMING",
    courseLink: "/course-detail.html" // Add the link for each course
  },
  {
    id: "5",
    coinCount: 3,
    courseStatus: "unlocked", // new status
    courseName: "Introduction to Robotics I",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "6",
    coinCount: 3,
    courseStatus: "locked",
    courseName: "Introduction to Game Developments",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "7",
    coinCount: 3,
    courseStatus: "locked",
    courseName: " Artificial Intelligence",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "8",
    coinCount: 3,
    courseStatus: "locked",
    courseName: " Introduction to Python",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "9",
    coinCount: 3,
    courseStatus: "final",
    courseName: "Awards",
    courseLink: "/mycourses.html" // Add the link for each course
  }
];


// Initialize a counter to track completed course status
let completedCounter = 0;

// Function to set the image based on course status
function getImageForStatus(status) {
  switch (status) {
    case 'completed':
      completedCounter++; // Increment the counter for each completed course
      // Alternate between the two completed images
      return completedCounter % 2 === 0 ? 'course-icon-2.png' : 'course-icon-1.png';
    case 'now':
      return 'course-icon-now.png';
    case 'locked':
      return 'course-icon-locked.png';
    case 'unlocked':
      return 'course-icon-2.png';
    case 'final':
      return 'course-icon-final-bw.webp';
    default:
      return 'default.png';
  }
}

// Function to set the border and background classes based on course status and image
function getCourseClasses(status, imageSrc) {
  switch (status) {
    case 'completed':
      return imageSrc === 'course-icon-2.png'
        ? ["border-[#dca1e2]", "bg-[#fef2ff]"]
        : ["border-[#dc8b39]", "bg-[#feefdd]"];
    case 'now':
      return [
        "border-[#dc8b39]", // Set transparent border since the gradient comes from the background
        "animate-gradient-border"
      ];
    case 'locked':
      return ["border-[#b6bbc1]", "bg-[#f5f5f5]"];
    case 'unlocked': // New status
      return ["border-[#dca1e2]", "bg-[#fef2ff]"];
    case 'final':
      return ["border-[#b6bbc1]", "bg-[#f5f5f5]"];
    default:
      return [];
  }
}

// Function to generate the course card HTML based on JSON data
function generateCourseCards() {
  const container = document.getElementById("skillMapCourseContainer");

  courseData.map((course, index) => {
    // Set the image based on the courseStatus
    course.imageSrc = getImageForStatus(course.courseStatus);

    // Determine whether to hide the pathLine for first and last objects
    let pathLine = "visible";
    if (index === 0 || index === courseData.length - 1) {
      pathLine = "hidden";
    }

    // Create a new div for left-right margin for skill map course
    const courseOuterDiv = document.createElement("div");
    courseOuterDiv.classList.add("lg:w-[48%]", "mx-auto", "grid", "relative");

    // Alternate between 'justify-self-start' and 'justify-self-end' for every other course
    const alignmentClass = index % 2 === 0 ? 'justify-self-start' : 'justify-self-end';
    const pathImage = index % 2 === 0 ? 'path-right.svg' : 'path-left.svg';



    const courseClasses = getCourseClasses(course.courseStatus, course.imageSrc);
    // Determine if 'custom-ping' should be added
    const customPingClass = course.courseStatus === 'now' ? 'custom-ping' : '';

    // Create the img element
    const startFlagImg = document.createElement("img");
    startFlagImg.src = "/assets/img/skillmap/start.webp"; // Set the source of the image
    startFlagImg.classList.add("w-[52px]", "absolute", "-top-[40px]", "left-[100px]", "z-[8]");
    startFlagImg.style.display = course.id === '1' ? 'block' : 'hidden'; // Set visibility based on course.id

    // Create a new div for each course
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("cursor-pointer", "hover:scale-[102%]", 'transition-all', "lg:w-[340px]", "border-[.2rem]", "px-2", "py-1", "rounded-[1.5rem]", alignmentClass, "h-[80px]", "flex", "z-[12]", ...courseClasses);
    // courseDiv.href = course.courseLink;

    // Function to capitalize the first letter of each word
    function toTitleCase(str) {
      return str
        .toLowerCase() // Convert the entire string to lowercase
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the array back into a string
    }


    // Inner HTML of the course card using template literals
    courseDiv.innerHTML = `    
    <div class="relative ">

      <img class="${index === 0 ? 'block' : 'hidden'} w-[52px] absolute -top-[40px] left-[130px] z-[8] " src="/assets/img/skillmap/start.webp" alt="educoin points">

      <img class="${index === courseData.length -1 ? 'block' : 'hidden'} w-[52px] absolute -top-[40px] left-[130px] z-[8] " src="/assets/img/skillmap/finish.webp" alt="educoin points">

      <img
      class="min-w-[60px] max-w-[60px] object-contain ${course.courseStatus === 'now' ? 'custom-ping' : ''}"
      id="${course.id}" src='/assets/img/skillmap/${course.imageSrc}' alt="points">

      
      <div class="absolute -top-3 -right-2">
      <div id="skillMapCourseCoinCount" class="w-full h-full relative ${['locked', 'final', 'now', 'unlocked'].includes(course.courseStatus) ? 'hidden' : 'flex'} justify-center items-center text-white font-semibold">
        <p class="absolute">${course.coinCount}</p>
        <img class="w-[38px]"
         src="/assets/img/educoin-sm.png" alt="educoin points">
      </div>
      
      </div>
    </div>

<div class="flex  justify-between w-full">
    <div class="pl-4 flex flex-col justify-center relative">
    <img
      class="absolute top-1 right-4 min-w-[24px] max-w-[24px] object-contain ${course.courseStatus === 'now' ? 'block' : 'hidden'}"
      id="${course.id}" src='/assets/img/educy-fly.png' alt="educy">

      <p class="capitalize text-xs ${course.courseStatus === 'now' ? 'text-white': ''} text-primaryDark pb-1">${course.courseStatus === 'now'? "You're here" : course.courseStatus}</p>

      
      <img
      class="absolute top-[15px] left-20 w-[16spx] object-contain custom-ping ${course.courseStatus === 'now' ? 'block' : 'hidden'}"
      src='/assets/icons/now-indicator.svg' alt="status">

      <p class="text-[12px] ${course.courseStatus === 'now' ? 'text-white': ''} font-semibold font-[Comfortaa]">${toTitleCase(course.courseName)}</p>

    </div>

    <div class="${course.courseStatus === 'final' ? 'block' : 'hidden'} flex flex-col justify-center items-end gap-1">
      <div class="flex gap-1 items-center justify-end w-fit px-3 p-1 bg-gray-50 border border-black/10 rounded-full">
        <p>Share</p>
        <img class="w-[20px]" src="/assets/img/skillmap/share.png" alt="#"/>
      </div>
      <div class="flex gap-1 items-center justify-end w-full p-1 px-4  bg-gray-50 border border-black/10 rounded-full">
        <p>Download</p>
        <img class="w-[20px]" src="/assets/img/skillmap/download3d.png" alt="#"/>
      </div>
    </div>
</div>

    <div style="visibility: ${pathLine}; height: 2px; background-color: black; margin-top: 10px;"></div>
    `;

    // Append courseDiv inside courseOuterDiv
    courseOuterDiv.appendChild(courseDiv);

    // Add the path image (except for the last object)
    if (index !== courseData.length - 1) {
      const pathImg = document.createElement("img");

      // Determine if the path should be positioned left or right based on alignmentClass
      const positionClass = alignmentClass === 'justify-self-start' ? '-right-[80px]' : '-left-[80px]';

      // Add multiple classes to pathImg
      pathImg.classList.add(
        "w-[240px]",
        "absolute",
        positionClass, // Use the determined position class
        "top-[30px]",
        "z-[10]",
      );

      // Add saturation class conditionally
      if (course.courseStatus === 'locked') {
        pathImg.classList.add('filter', 'saturate-0'); // Only add these classes if locked
      }

      // Set the source and alt attributes
      pathImg.src = `/assets/img/skillmap/${pathImage}`;
      pathImg.alt = `${alignmentClass} path`;

      // Append the path image based on alignment
      courseOuterDiv.appendChild(pathImg);
    }

    // Now append courseOuterDiv to the main container (only this one)
    container.appendChild(courseOuterDiv);

    // Skill map Hover Effect - Unlocked and Locked
    // ====================================
    const tooltipUnlocked = document.getElementById('skillMapHoverUnlocked');
    const tooltipLocked = document.getElementById('skillMapHoverLocked');

    const handleTooltip = (e, tooltip) => {
      if (tooltip) {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY}px`;
        tooltip.classList.remove('hidden');
      }
    };

    const hideTooltip = (tooltip) => {
      if (tooltip) {
        tooltip.classList.add('hidden');
      }
    };

    courseDiv.addEventListener('mouseover', (e) => {
      if (course.courseStatus === 'locked') {
        handleTooltip(e, tooltipLocked);
      } else if (course.courseStatus === 'unlocked') {
        handleTooltip(e, tooltipUnlocked);
      }
    });

    courseDiv.addEventListener('mousemove', (e) => {
      if (course.courseStatus === 'locked') {
        handleTooltip(e, tooltipLocked);
      } else if (course.courseStatus === 'unlocked') {
        handleTooltip(e, tooltipUnlocked);
      }
    });

    courseDiv.addEventListener('mouseout', () => {
      hideTooltip(tooltipLocked);
      hideTooltip(tooltipUnlocked);
    });


    // Skill map POPUP
    // ====================================
    const skillMapPopup = document.getElementById('skillMapPopup');
    const skillMapCloseBtn = document.getElementById('skillMapPopupCloseBtn');

    function showSkillMapPopup() {
      skillMapPopup.classList.remove('hidden');
      skillMapPopup.classList.add('flex');
      
    }

    function closeSkillMapPopup() {
      skillMapPopup.classList.add('hidden');
      skillMapPopup.classList.remove('flex');
    }

    // Close on button click
    skillMapCloseBtn.addEventListener('click', closeSkillMapPopup);

    // Optional: Close when clicking outside the popup
    skillMapPopup.addEventListener('click', (event) => {
      if (event.target === skillMapPopup) closeSkillMapPopup();
    });

    courseDiv.dataset.status = course.courseStatus;

    courseDiv.addEventListener('click', (e) => {
      if (e.currentTarget.dataset.status === 'unlocked') {
        showSkillMapPopup();
      }
    });


    // Create a tooltip div
    // const tooltip = document.getElementById('skillMapHoverUnlocked');
    // tooltip.classList.add('absolute', 'hidden', 'bg-black', 'text-white', 'text-sm', 'px-2', 'py-1', 'rounded', 'z-50', 'shadow-lg');
    // document.body.appendChild(tooltip);

    // courseDiv.addEventListener('mouseover', (e) => {
    //   if (course.courseStatus === 'locked') {
    //     tooltip.innerHTML = 'Complete this course within 15 days of unlocking to earn 2 EduCoins';
    //   } else if (course.courseStatus === 'unlocked') {
    //     tooltip.innerHTML = 'Complete this course within 7 days to earn 2 EduCoins';
    //   }

    //   if (course.courseStatus === 'locked' || course.courseStatus === 'unlocked') {
    //     tooltip.classList.remove('hidden');
    //     tooltip.style.left = `${e.pageX + 10}px`;
    //     tooltip.style.top = `${e.pageY}px`;
    //   }
    // });

    // courseDiv.addEventListener('mousemove', (e) => {
    //   tooltip.style.left = `${e.pageX + 10}px`;
    //   tooltip.style.top = `${e.pageY}px`;
    // });

    // courseDiv.addEventListener('mouseout', () => {
    //   tooltip.classList.add('hidden');
    // });



  });


}

// Call the function to generate the course cards
generateCourseCards();
