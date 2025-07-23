import * as update_header from './update_header.js';
import * as header_footer from './header_footer.js';
import * as shop from './shop.js';
import * as product_page from './product_page.js';
import * as start_page from './start_page.js';
$(window).on('DOMContentLoaded',function()
// window.addEventListener('DOMContentLoaded', () =>
    {
        header_footer.updateHeader();
        header_footer.updateFooter();
        shop.updateProducts();
        product_page.generateProductPage();
    });
$(window).on('load',function()
    {
        update_header.adjustWelcomeHeight();
        update_header.updateHeaderTextColor();
    });
$(window).on('resize',function()
    {
        update_header.adjustWelcomeHeight();
        update_header.updateHeaderTextColor();
    });
$(window).on('scroll',function(){
    $('.welcome-section div').css('font-size','calc(20vmin + '+(($(this).scrollTop()*0.3))+'px');
    // $('.welcome-section .layer2').css('font-size',(($(this).scrollTop()*0.5)+14)+'px')
    // $('.welcome-section .studios').css('font-size',(($(this).scrollTop()*0.5)+14)+'px')
});