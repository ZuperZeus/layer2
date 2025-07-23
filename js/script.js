function adjustWelcomeHeight() {
  const header = $('#header');
  const welcome = $('.welcome-section');
  const headerHeight = header.outerHeight();
  welcome.css('marginTop',`-${headerHeight}px`);
}

function updateHeaderTextColor() {
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

function updateHeader() 
{
    const container = document.querySelector('#header');
    container.innerHTML = `
    <ul class="header-left">
        <li class="header-logo">
          <a href="/index.html">
            <img src="./assets/img/logo.svg">
          </a>
        </li>
        <li>
          <a href="/index.html">
            <div class="layer2">Layer²</div> <div class="Studios">Studios</div>
          </a>
        </li>
    </ul>


    <ul class="header-right">
        <li><a href="/index.html">Home</a></li>
        <li><a href="/shop.html">Shop</a></li>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/about.html">About</a></li>
    </ul>
    `;
}
function updateFooter() 
{
    const container = document.querySelector('#footer');
    container.innerHTML = `
    <div class="footer-columns">
        <ul class="footer-column">
        <li><a href="/index.html">Home</a></li>
        <li><a href="/shop.html">Shop</a></li>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/about.html">About</a></li>
        </ul>

        <ul class="footer-column">
            <li>
                <a class="fa fa-envelope"></a>
                <a href="mailto:layersquaredstudios@gmail.com">layersquaredstudios@gmail.com</a>
            </li>
            <li class="animate push-text">
                <a class="fa fa-phone"></a>
                <a href="tel:+12369694998">+1 236 969 4998</a>
            </li>
            <li class="animate push-text">
                <a class="fa fa-instagram"></a>
                <a href="https://www.instagram.com/layer2studios/" target="_blank" rel="noopener norefferer">layer2studios </a>
            </li>
        </ul>
    </div>
        <div class="copyright">
            <a href="/index.html">© Layer² Studios 2025</a>
        </div>
    `;
}

function createProductCard(item) {
  const card = document.createElement('a');
  card.href = `/product.html?id=${item.id}`;

  card.innerHTML = `
    <div class="shop-card">
      <img class="round-img" src="./assets/products/${item.id}/1.jpg" alt="${item.title}" loading="lazy">
      <div class="text">${item.title}</div>
      <div class="text">Contact for pricing</div>
    </div>
        `;
  // <div class="shop-card-price">$${item.price.toFixed(2)}</div>
  // <div class="shop-card-details"></div>
  return card;
}
function updateProducts() {
  $.getJSON('/data/products.json', function(data) {
    const $container = $('.shop-cards');
    let productsToShow = data;

    if ($container.hasClass('preview')) {
      productsToShow = data.slice(0, 4);
    }

    productsToShow.forEach(function(item) {
      $container.append(createProductCard(item)); // Assumes createProductCard returns a DOM/jQuery element
    });
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error loading products:', textStatus, errorThrown);
  });
}
function getURLQuery(key) 
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
function addURLQuery(key,val)
{
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key,val);
    window.history.replaceState(`/product.html?${urlParams}`,'',`/product.html?${urlParams}`);
}
function getTricolorText(triRGB)
{
    const [color1, color2, color3] = triRGB.split(",");
    return `background:
    radial-gradient(circle at 120% 50%, ${color1}, transparent 100%),
    radial-gradient(circle at 0% 100%, ${color2}, transparent 100%),
    radial-gradient(circle at 0% 0%, ${color3}, transparent 100%);
    background-blend-mode: screen; /* or lighten */
    `;
}
function getColorCircle(color)
{
    const colorCircle = document.createElement('div');
          colorCircle.classList.add("color-circle");
          if(!color.tricolor)
            colorCircle.style=`background:${color.rgb};`;
          else
            colorCircle.style=getTricolorText(color.rgb);
    return colorCircle;
}
function updateColor(color)
{
    let colorCard=document.querySelector(".color-selected");
    let colorCircle = getColorCircle(color);
    let colorTxt = document.createElement('div');
    colorTxt.classList.add('text');
    colorTxt = colorTxt
    colorTxt.innerText = `Selected Color: ${color.name}`;
    colorCard.replaceChildren(colorCircle,colorTxt)
}
function generateProductPage() 
{
    if(!(window.location.pathname==="/product" ||
        window.location.pathname==="/product.html"))
            return;
    const product = fetch('/data/products.json')
        .then(response => response.json())
        .then(products => products.find(p => p.id === getURLQuery('id')))
        .then(product => {
            if (product) {
                const productSection = document.querySelector('#product');
                productSection.innerHTML = `
                <div class="title large-title" id="product-title">${product.title}</div>
                <div class="side-by-side">
                    <div class="flex-content">
                        <img class="round-img" src="./assets/products/${product.id}/1.jpg">
                    </div>
                    <div class="flex-content product-description">
                        <div class="text large-text"><a href="#">${product.description}</a></div>
                        <div class="color-display"></div>
                        <div class="color-selected img-with-description"></div>
                        <div class="shop-card-price">Contact for pricing</div>
                    </div>
                </div>
                    `;
                const colors = fetch('/data/colors.json')
                    .then(response => response.json())
                    .then(colors => {
                        const colorsDiv = document.querySelector('.color-display');
                        colors.forEach(color => {
                            const colorCard = document.createElement('div');
                                  colorCard.addEventListener('click', () => 
                                  {
                                    addURLQuery('color',color.id);
                                    updateColor(color);
                                  });
                                  //colorCard.href = "/product.html?"+getNewLink('color',color.id);
                                  colorCard.classList.add("color-card");
                                  colorCard.appendChild(getColorCircle(color));
                            colorsDiv.appendChild(colorCard);
                            })
                        const colorSelect = document.querySelector(".color-selected");
                            colorSelect.style.padding = "20px";
                    })
            }
            else {
                window.open("/404.html", "_self");
            }
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}

$(window).on('DOMContentLoaded',function()
// window.addEventListener('DOMContentLoaded', () =>
    {
        updateHeader();
        updateFooter();
        updateProducts();
        generateProductPage();
    });
$(window).on('load',function()
    {
        adjustWelcomeHeight();
        updateHeaderTextColor();
    });
$(window).on('resize',function()
    {
        adjustWelcomeHeight();
        updateHeaderTextColor();
    });
$(window).on('scroll',function(){
    $('.welcome-section div').css('font-size','calc(20vmin + '+(($(this).scrollTop()*0.3))+'px');
    // $('.welcome-section .layer2').css('font-size',(($(this).scrollTop()*0.5)+14)+'px')
    // $('.welcome-section .studios').css('font-size',(($(this).scrollTop()*0.5)+14)+'px')
});