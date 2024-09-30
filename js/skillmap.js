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
    courseStatus: "locked",
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
    courseName: " Introduction to Coding and Programming Languages",
    courseLink: "/mycourses.html" // Add the link for each course
  },
  {
    id: "9",
    coinCount: 3,
    courseStatus: "final",
    courseName: "Operating Systems",
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
    case 'final':
      return 'course-icon-final.png';
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
      return ["border-[#fad704]", "bg-[#fdf7d6]"];
    case 'locked':
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

     // Create a new div for each course
    const courseDiv = document.createElement("a");
    const courseClasses = getCourseClasses(course.courseStatus, course.imageSrc);
    courseDiv.classList.add("cursor-pointer", "lg:w-[340px]", "border-[.2rem]", "px-2", "py-1", "rounded-[1.5rem]", alignmentClass, "h-[80px]", "flex", "z-[12]", ...courseClasses);
    courseDiv.href = course.courseLink;

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
    <div class="relative">
      <img
      class="min-w-[60px] max-w-[60px] object-contain ${course.courseStatus === 'now' ? 'custom-ping' : ''}"
      id="${course.id}" src='/assets/img/skillmap/${course.imageSrc}' alt="points">
      <div class="absolute -top-3 -right-2">
      <div id="skillMapCourseCoinCount" class="w-full h-full relative ${['locked', 'final', 'now'].includes(course.courseStatus) ? 'hidden' : 'flex'} justify-center items-center text-white font-semibold">
        <p class="absolute">${course.coinCount}</p>
        <img class="w-[38px]"
         src="/assets/img/educoin-sm.png" alt="educoin points">
      </div>
      
      </div>
    </div>

    <div class="pl-4 flex flex-col justify-center">
      <p class="capitalize text-xs text-primaryDark pb-1">${course.courseStatus}</p>
      <p class="text-[12px] font-semibold font-[Comfortaa]">${toTitleCase(course.courseName)}</p>
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

  });
}

// Call the function to generate the course cards
generateCourseCards();
