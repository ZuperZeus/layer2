function getURLQuery(key) 
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
function addURLQuery(key,val)
{
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append(key,val);
    window.location.search=urlParams;
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
function generateProductPage() 
{
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
                    <div class="flex-content">
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
                            const colorCard = document.createElement('div');
                            colorCard.addEventListener(onclick, () => addURLQuery('color',`${color.id}`))
                            colorCard.classList.add("color-card");
                            const colorCircle = document.createElement('div');
                            colorCircle.classList.add("color-circle");
                            // const card = document.createElement('a');
                            if(!color.tricolor)
                            {
                                colorCircle.style=`background:${color.rgb};`;
                                colorCard.appendChild(colorCircle);
                                colorsDiv.appendChild(colorCard);
                            }
                            else
                            {
                                colorCircle.style=getTricolorText(color.rgb);
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
