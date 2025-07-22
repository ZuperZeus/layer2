function adjustWelcomeHeight() {
  const header = document.querySelector('#header');
  const welcome = document.querySelector('.welcome-section');
  const headerHeight = header.offsetHeight;
  welcome.style.marginTop = `-${headerHeight}px`;
  welcome.style.paddingTop = `${headerHeight}px`;
}

// Run on load and resize
window.addEventListener('load', adjustWelcomeHeight);
window.addEventListener('resize', adjustWelcomeHeight);

function updateHeaderTextColor() {
  const header = document.querySelector('#header');
  const welcome = document.querySelector('.welcome-section');

  if (!header || !welcome) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const welcomeBottom = welcome.offsetTop + welcome.offsetHeight;

  responsiveColor="var(--main-text)";
  if (scrollY < welcomeBottom-header.offsetHeight/2) {
    responsiveColor = 'var(--alt-text-1)';
  } else {
    responsiveColor = 'var(--main-text)';
  }
  header.style.color = responsiveColor;
}    

// Run on load and scroll
window.addEventListener('load', updateHeaderTextColor);
window.addEventListener('scroll', updateHeaderTextColor);
