export function updateHeader() 
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
export function updateFooter() 
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
