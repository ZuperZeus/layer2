function getProductQuery() 
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(`id`);
}
function generateProductPage() 
{
    const product = fetch('/data/products.json')
        .then(response => response.json())
        .then(products => products.find(p => p.id === getProductQuery()))
        .then(product => {
            if (product) {
                const productSection = document.querySelector('#product');
                productSection.innerHTML = `
                <div class="title large-title" id="product-title">${product.title}</div>
                <img class="round-img" src="./assets/products/${product.id}/1.jpg">
                <div class="text"><a href="#">${product.description}</a></div>
                <div class="shop-card-price">Contact for pricing</div>
                    `;
            }
            else {
                window.open("/404.html", "_self");
            }
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}
window.addEventListener('DOMContentLoaded', () => generateProductPage());
