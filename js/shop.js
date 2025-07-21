function createProductCard(item) {
  const card = document.createElement('a');
  card.href = `/product.html?id=${item.id}`;

  card.innerHTML = `
    <div class="shop-card">
      <img class="round-img" src="./assets/products/${item.id}/1.jpg">
      <div class="text"><a href="#">${item.title}</a></div>
      <div class="text">Contact for pricing</div>
    </div>
        `;
  // <div class="shop-card-price">$${item.price.toFixed(2)}</div>
  // <div class="shop-card-details"></div>
  return card;
}
function updateProducts() {
  fetch('/data/products.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.shop-cards');
      let products_to_show = data;
      if(container.classList.contains("preview"))
        products_to_show = data.slice(0,4);
      products_to_show.forEach(item => {
        container.appendChild(createProductCard(item));
      });
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });
}
window.addEventListener('DOMContentLoaded', () => updateProducts());
