function getURLQuery(key) 
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
function addURLQuery(key,val)
{
    console.log(`adding url query ${key} -> ${val}`)
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key,val);
    window.location.search=urlParams;
}
function getNewLink(key,val)
{
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key,val);
    return urlParams;
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
          colorCircle.classList.add(color.id);
          if(!color.tricolor)
            colorCircle.style=`background:${color.rgb};`;
          else
            colorCircle.style=getTricolorText(color.rgb);
    return colorCircle;

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
                            const colorCard = document.createElement('a');
                                //   colorCard.addEventListener(onclick, () => addURLQuery('color',color.id));
                                  colorCard.href = "/product.html?"+getNewLink('color',color.id);
                                  colorCard.classList.add("color-card");
                                  colorCard.classList.add(color.id);
                                  colorCard.appendChild(getColorCircle(color));
                            colorsDiv.appendChild(colorCard);
                        })
                        const colorSelect = document.querySelector(".color-selected");
                            colorSelect.style.padding = "20px";
                        const colorTxt = document.createElement("div");
                            colorTxt.classList.add("text");
                            colorTxt.classList.add("medium-text");
                              selectedColor = colors.find(c => c.id === getURLQuery('color'));
                              if(selectedColor)
                              {
                                  colorSelect.appendChild(getColorCircle(selectedColor));
                                  colorTxt.innerText = "Selected Color: "+selectedColor.name;
                              }
                        colorSelect.appendChild(colorTxt);
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
