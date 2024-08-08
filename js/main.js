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
const menuItems = document.querySelectorAll('nav ul li');

// when click the shrink button from sidemenu
toggleBtn.addEventListener('click', () => {

  // toggle width and padding when click the shrink button
  sidebar.classList.toggle('w-24');
  sidebar.classList.toggle('w-64');
  sidebar.classList.toggle('px-2');
  sidebar.classList.toggle('px-4');

  // hide logo text when sidemenu shrink
  logoText.classList.toggle('hidden');

  // toggle btn will center when sidemenu shrink
  toggleBtnArea.classList.toggle('justify-end');
  toggleBtnArea.classList.toggle('justify-center');

  toggleBtn.classList.toggle('rotate-90')

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

  // Toggle icon direction
  // if (sidebar.classList.contains('w-16')) {
  //   toggleIcon.setAttribute('d', 'M9 18l6-6-6-6');
  // } else {
  //   toggleIcon.setAttribute('d', 'M6 9l6 6 6-6');
  // }
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