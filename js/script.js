import * as update_header from './update_header.js';
import * as header_footer from './header_footer.js';
import * as shop from './shop.js';
import * as product_page from './product_page.js';
window.addEventListener('DOMContentLoaded', () =>
    {
        header_footer.updateHeader();
        header_footer.updateFooter();
        shop.updateProducts();
        product_page.generateProductPage();
    });
window.addEventListener('load', () => update_header.adjustWelcomeHeight());
window.addEventListener('resize', () => update_header.adjustWelcomeHeight());
window.addEventListener('load', () => update_header.updateHeaderTextColor());
window.addEventListener('scroll', () => update_header.updateHeaderTextColor());