// Sample JSON data for the menu
const menuData = [
  { "name": "Home", "link": "#", "type": "menu" },
  { "name": "Courses", "link": "#", "type": "menu" },
  { "name": "Learning Journey", "link": "#", "type": "menu" },
  { "name": "Classroom Chat", "link": "c#", "type": "menu" },
  { "name": "Chat", "link": "#", "type": "menu" },
  { "type": "separator" }, // Separator
  { "name": "Logout", "link": "#", "type": "menu" }
];


function renderMenuItems() {
  const menuItemsContainer = document.getElementById('menu-items');
  
  // Check if the element exists
  if (!menuItemsContainer) {
    // console.error('menu-items container not found');
    return;
  }

  const currentPage = window.location.pathname.split("/").pop(); // Get the current page

  menuData.forEach(item => {
      const li = document.createElement('li');

      if (item.type === "menu") {
          li.className = 'cursor-pointer text-xl hover:text-primaryDark';
          li.innerText = item.name;
          li.addEventListener('click', () => {
              window.location.href = item.link; // Redirect to the page
              toggleMenu(); // Close the menu
          });

          // Check if this is the active page
          if (item.link === currentPage) {
              li.classList.add('font-semibold', 'underline'); // Add active styles
          }
      } else if (item.type === "separator") {
          const separatorDiv = document.createElement('div');
          separatorDiv.className = 'h-1 w-full max-w-[360px] bg-gradient-to-b from-transparent via-gray-200 to-transparent my-4'; // Style for separator
          menuItemsContainer.appendChild(separatorDiv);
          return; // Skip adding to menu items container
      }

      menuItemsContainer.appendChild(li);
  });
}


// Function to toggle the menu
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden'); // Toggle visibility
}

// Event listener for the hamburger button
const hamburgerButton = document.getElementById('hamburger');
if(hamburgerButton){
  hamburgerButton.addEventListener('click',toggleMenu)
}

// Event listener for the close button
const menuCloseButton = document.getElementById('close-menu');
if(menuCloseButton){
  menuCloseButton.addEventListener('click',toggleMenu)
}

// Render menu items when the page loads
window.onload = renderMenuItems;


// ===========================================
// swiper carousel
// ===========================================

// Initialize Swiper
document.addEventListener('DOMContentLoaded', () => {
  var swiper = new Swiper(".whatsNewSlider", {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    loop: true, // Enable looping
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500, // Delay between slides in ms
      disableOnInteraction: false, // Continue autoplay after interaction
    },
  });
});

// ===========================================
// sidebar
// ===========================================

const sidebar = document.getElementById('sidebar');
const logoText = document.getElementById('logo-text');
const toggleBtn = document.getElementById('toggleBtn');
const sidebarTexts = document.querySelectorAll('.sidebar-text');
const main = document.getElementById('main');
const headerMenu = document.getElementById('header-menu');
const sidemenuList = document.querySelectorAll('.sidemenu-list');
const sidemenuLogo = document.getElementById('sidemenu-logo');
const toggleBtnArea = document.getElementById('toggle-btn-area');
const educatSidemenuBigBtn = document.getElementById('educat-sidemenu-big');
const educatSidemenuSmBtn = document.getElementById('educat-sidemenu-sm');
const menuItems = document.querySelectorAll('nav ul li');

// when click the shrink button from sidemenu
toggleBtn.addEventListener('click', () => {

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

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'active' class from all menu items
    menuItems.forEach(i => i.classList.remove('active'));
    // Add 'active' class to the clicked item
    item.classList.add('active');
  });
});

// sidebar END
// ===========================================



const fullscreenToggle = document.getElementById('fullscreenToggle');

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

fullscreenToggle.addEventListener('click', toggleFullscreen);
