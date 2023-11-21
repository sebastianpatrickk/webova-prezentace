const mobileNavBtn = document.querySelector('.mobile-nav-btn');
const mobileNav = document.querySelector('.nav');
const mobileHeader = document.querySelector('.header');
const themeSwitcher = document.querySelector('#theme-switcher');

// Theme switcher
const setSwitcherIcon = (isDark) => {
  if (isDark === 'dark') {
    themeSwitcher.children[0].innerText = 'light_mode';
  } else {
    themeSwitcher.children[0].innerText = 'dark_mode';
  }
};

const switchTheme = () => {
  const rootEl = document.documentElement;
  let dataTheme = rootEl.getAttribute('data-theme');

  if (dataTheme === 'light') {
    dataTheme = 'dark';
  } else if (dataTheme === 'dark') {
    dataTheme = 'light';
  }

  setSwitcherIcon(dataTheme);

  rootEl.setAttribute('data-theme', dataTheme);
  Cookies.set('theme', dataTheme, { expires: 30 }); // Store the theme in a cookie for 30 days
};

// Set theme by the OS preference or cookie
document.addEventListener('DOMContentLoaded', () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const rootEl = document.documentElement;
  const cookieTheme = Cookies.get('theme');

  let theme;
  if (cookieTheme) {
    theme = cookieTheme;
  } else {
    theme = prefersDarkMode ? 'dark' : 'light';
  }

  setSwitcherIcon(theme);

  rootEl.setAttribute('data-theme', theme);
});

themeSwitcher.addEventListener('click', switchTheme);

// Mobile nav
window.addEventListener('resize', () => {
  if (mobileHeader.classList.contains('mobile-header')) {
    mobileNav.classList.add('mobile-nav-hidden');
    mobileHeader.classList.toggle('mobile-header');
    mobileNavBtn.children[0].innerText = 'menu';
  }
});

const toggleMobileNav = () => {
  mobileNav.classList.toggle('mobile-nav-hidden');
  mobileHeader.classList.toggle('mobile-header');

  if (mobileNavBtn.children[0].innerText === 'menu') {
    mobileNavBtn.children[0].innerText = 'close';
  } else {
    mobileNavBtn.children[0].innerText = 'menu';
  }
};

mobileNavBtn.addEventListener('click', toggleMobileNav);
