function adjustWelcomeHeight() {
  const header = document.querySelector('.header');
  const welcome = document.querySelector('.welcome-img');
  const headerHeight = header.offsetHeight;
  welcome.style.marginTop = `-${headerHeight}px`;
  welcome.style.paddingTop = `${headerHeight}px`;
}

// Run on load and resize
window.addEventListener('load', adjustWelcomeHeight);
window.addEventListener('resize', adjustWelcomeHeight);

function updateHeaderTextColor() {
  const header = document.querySelector('.header');
  const welcome = document.querySelector('.welcome-img');

  if (!header || !welcome) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const welcomeBottom = welcome.offsetTop + welcome.offsetHeight;

  // If header is over the welcome image (dark bg), set text white, else black
  if (scrollY < welcomeBottom-header.offsetHeight/2) {
    header.style.color = 'var(--alt-text-1';  // dark background → white text
    
  } else {
    header.style.color = 'var(--main-text)';  // light background → black text
  }
}    

// Run on load and scroll
window.addEventListener('load', updateHeaderTextColor);
window.addEventListener('scroll', updateHeaderTextColor);