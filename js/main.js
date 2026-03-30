// Sample JSON data for the menu
const menuData = [
  { name: 'Home', link: '/index.html', type: 'menu' },
  { name: 'Courses', link: '/mycourses.html', type: 'menu' },
  { name: 'Learning Journey', link: '/learning-journey.html', type: 'menu' },
  { name: 'Classroom', link: '/classroom.html', type: 'menu' },
  { name: 'Virtual City', link: '/virtualcity/index.html', type: 'menu' },
  { name: 'Student Stories', link: '/student-story.html', type: 'menu' },
  { type: 'separator' },
  { name: 'Logout', link: '#', type: 'menu' }
];

function normalizePathname(pathname) {
  const normalized = pathname.replace(/\\+/g, '/').replace(/\/$/, '');
  return normalized || '/index.html';
}

function getCurrentPathname() {
  return normalizePathname(window.location.pathname);
}

function renderMenuItems() {
  const menuItemsContainer = document.getElementById('menu-items');

  if (!menuItemsContainer) {
    return;
  }

  const currentPage = getCurrentPathname();

  menuData.forEach((item) => {
    const li = document.createElement('li');

    if (item.type === 'menu') {
      li.className = 'cursor-pointer text-xl hover:text-primaryDark';
      li.innerText = item.name;
      li.addEventListener('click', () => {
        window.location.href = item.link;
        toggleMenu();
      });

      if (normalizePathname(item.link) === currentPage) {
        li.classList.add('font-semibold', 'underline');
      }
    } else if (item.type === 'separator') {
      const separatorDiv = document.createElement('div');
      separatorDiv.className = 'my-4 h-1 w-full max-w-[360px] bg-gradient-to-b from-transparent via-gray-200 to-transparent';
      menuItemsContainer.appendChild(separatorDiv);
      return;
    }

    menuItemsContainer.appendChild(li);
  });
}

function toggleMenu() {
  const menu = document.getElementById('menu');

  if (menu) {
    menu.classList.toggle('hidden');
  }
}

const hamburgerButton = document.getElementById('hamburger');
if (hamburgerButton) {
  hamburgerButton.addEventListener('click', toggleMenu);
}

const menuCloseButton = document.getElementById('close-menu');
if (menuCloseButton) {
  menuCloseButton.addEventListener('click', toggleMenu);
}

window.addEventListener('load', renderMenuItems);

document.addEventListener('DOMContentLoaded', () => {
  const swiperElement = document.querySelector('.whatsNewSlider');

  if (swiperElement && typeof Swiper !== 'undefined') {
    new Swiper('.whatsNewSlider', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }
});

const sidebar = document.getElementById('sidebar');
const logoText = document.getElementById('logo-text');
const toggleBtn = document.getElementById('toggleBtn');
const bottomFixedLeftGap = document.getElementById('bottomFixedLeftGap');
const sidebarTexts = document.querySelectorAll('.sidebar-text');
const sidemenuList = document.querySelectorAll('.sidemenu-list');
const sidemenuLogo = document.getElementById('sidemenu-logo');
const toggleBtnArea = document.getElementById('toggle-btn-area');
const educatSidemenuBigBtn = document.getElementById('educat-sidemenu-big');
const educatSidemenuSmBtn = document.getElementById('educat-sidemenu-sm');
const menuItems = document.querySelectorAll('nav ul li');

if (toggleBtn && sidebar && logoText && sidemenuLogo && toggleBtnArea) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('min-w-24');
    sidebar.classList.toggle('min-w-[15rem]');

    if (bottomFixedLeftGap) {
      bottomFixedLeftGap.classList.toggle('min-w-24');
      bottomFixedLeftGap.classList.toggle('min-w-[15rem]');
    }

    logoText.classList.toggle('hidden');
    toggleBtnArea.classList.toggle('justify-end');
    toggleBtnArea.classList.toggle('justify-center');
    toggleBtn.classList.toggle('rotate-180');

    if (educatSidemenuBigBtn) {
      educatSidemenuBigBtn.classList.toggle('hidden');
    }

    if (educatSidemenuSmBtn) {
      educatSidemenuSmBtn.classList.toggle('flex');
      educatSidemenuSmBtn.classList.toggle('hidden');
    }

    sidemenuLogo.classList.toggle('justify-center');
    sidebarTexts.forEach((text) => text.classList.toggle('hidden'));

    sidemenuList.forEach((item) => {
      item.classList.toggle('justify-center');
      item.classList.toggle('pl-4');
      item.classList.toggle('pl-0');
    });
  });
}

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuItems.forEach((entry) => entry.classList.remove('active'));
    item.classList.add('active');
  });
});

const fullscreenToggle = document.getElementById('fullscreenToggle');

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

if (fullscreenToggle) {
  fullscreenToggle.addEventListener('click', toggleFullscreen);
}

