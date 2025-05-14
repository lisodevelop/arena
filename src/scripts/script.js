document.addEventListener('DOMContentLoaded', () => {
      // Abre o modal automaticamente
  const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'), {
    backdrop: 'static', // Impede fechar clicando fora
    keyboard: false // Impede fechar com a tecla Esc
  });
  welcomeModal.show();
  fetch('src/resources/products.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('product-container');
      data.products.forEach(product => {
        const card = `
          <div class="col-6 col-md-4 col-lg-3 mb-4">
            <a href="${product.link}" target="_blank" class="text-decoration-none">
              <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body text-center">
                  <h5 class="card-title">${product.title}</h5>
                </div>
              </div>
            </a>
          </div>
        `;
        container.innerHTML += card;
      });
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
});
