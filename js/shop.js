
// export function updateProducts() {
//   fetch('/data/products.json')
//     .then(response => response.json())
//     .then(data => {
//       const container = document.querySelector('.shop-cards');
//       let products_to_show = data;
//       if(container.classList.contains("preview"))
//         products_to_show = data.slice(0,4);
//       products_to_show.forEach(item => {
//         container.appendChild(createProductCard(item));
//       });
//     })
//     .catch(error => {
//       console.error('Error loading products:', error);
//     });
// }
