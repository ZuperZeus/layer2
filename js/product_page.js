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
window.addEventListener('DOMContentLoaded', () => generateProductPage());
