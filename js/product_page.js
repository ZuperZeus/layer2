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
                <div class="side-by-side">
                    <div class="flex-content">
                        <img class="round-img" src="./assets/products/${product.id}/1.jpg">
                    </div>
                    <div class="flex-content shop-card">
                        <div class="text large-text"><a href="#">${product.description}</a></div>
                        <div class="color-select"></div>
                        <div class="shop-card-price">Contact for pricing</div>
                    </div>
                </div>
                    `;
                const colors = fetch('/data/colors.json')
                    .then(response => response.json())
                    .then(colors => {
                        const colorsDiv = document.querySelector('.color-select');
                        colors.forEach(color => {
                            if(!color.tricolor)
                            {
                                const colorCard = document.createElement('div');
                                colorCard.classList.add("color-card");
                                const colorCircle = document.createElement('div');
                                colorCircle.classList.add("color-circle");
                                colorCircle.style=`background:${color.rgb};`;
                                colorCard.appendChild(colorCircle);
                                colorsDiv.appendChild(colorCard);
                            }
                        })
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
window.addEventListener('DOMContentLoaded', () => generateProductPage());
