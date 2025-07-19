function updateHeader() 
{
    const container = document.querySelector('.header');
    container.innerHTML = `
    <ul class="header-left">
        <li class="header-logo">
          <a href="index.html">
            <img src="./assets/logos/icon_logo.svg">
          </a>
        </li>
        <li>
          <a href="./index.html">
            <div class="layer2">Layer²</div> <div class="Studios">Studios</div>
          </a>
        </li>
        </a>
    </ul>

    <ul class="header-right">
        <li><a href="./shop.html" class="animate push-text">Shop</a></li>
        <li><a href="mailto:layersquaredstudios@gmail.com" class="animate push-text">Email</a></li>
        <li><a href="tel:+12369694998" class="animate push-text">Call</a></li>
    </ul>
    `;
}
function updateFooter() 
{
    const container = document.querySelector('.footer');
    container.innerHTML = `
    <ul class="footer-left">
        <li class="animate push-text">
            <a href="https://layer2.ca">Copyright @ <div class="layer2">Layer²</div> <div class="studios">Studios</div> 2025</a>
        </li>
        <li>
          <div class="animate push-text">
              <a href="https://layer2.ca">
                  Home
              </a>
          </div>
          <div class="animate push-text">
              <a href="https://layer2.ca/shop.html">
                  Shop
              </a>
          </div>
        </li>
        </a>
    </ul>

    <ul class="footer-right">
        <li class="animate push-text">
            <a class="fa fa-envelope"></a>
            <a href="mailto:layersquaredstudios@gmail.com"> : layersquaredstudios@gmail.com</a>
            </li>
        <li class="animate push-text">
            <a class="fa fa-phone"></a>
            <a href="tel:+12369694998"> : +1 236 969 4998</a>
            </li>
        <li class="animate push-text">
            <a class="fa fa-instagram"></a>
            <a href="https://www.instagram.com/layer2studios/" target="_blank" rel="noopener norefferer"> : @layer2studios </a>
            </li>
    </ul>
    `;
}
window.addEventListener('DOMContentLoaded', () => updateHeader());
window.addEventListener('DOMContentLoaded', () => updateFooter());
