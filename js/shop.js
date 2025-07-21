function updateProducts() 
{
  fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.shop-cards');

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('shop-card');
      card.classList.add('animate');
      card.classList.add('push-button');

      card.innerHTML = `
      <img class="round-img" src="./assets/products/${item.folder}/1.jpg">
      <div class="text"><a href="#">${item.title}</a></div>
      <div class="text">Contact for pricing</div>
        `;
          // <div class="shop-card-price">$${item.price.toFixed(2)}</div>
          // <div class="shop-card-details"></div>

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading products:', error);
  });
}
window.addEventListener('DOMContentLoaded', () => updateProducts());
