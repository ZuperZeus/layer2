export function adjustWelcomeHeight() {
  const header = $('#header');
  const welcome = $('.welcome-section');
  const headerHeight = header.outerHeight();
  welcome.css('marginTop',`-${headerHeight}px`);
}

export function updateHeaderTextColor() {
  const header = document.querySelector('#header');
  const welcome = document.querySelector('.welcome-section');

  if (!header || !welcome) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const welcomeBottom = welcome.offsetTop + welcome.offsetHeight;

  let responsiveColor="var(--main-text)";
  if (scrollY < welcomeBottom-header.offsetHeight/2) {
    responsiveColor = 'var(--alt-text-1)';
  } else {
    responsiveColor = 'var(--main-text)';
  }
  header.style.color = responsiveColor;
}    
