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
                        <div class="card" data-product='${JSON.stringify(product)}'>
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${product.title}</h5>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });

            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent any default behavior
                    const product = JSON.parse(card.dataset.product);
                    const cardContainer = card.closest('.col-6'); // Get the parent col- div
                    showProductDetails(product, cardContainer);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

    function showProductDetails(product, cardContainer) {
        // Remove any existing product-details section
        const existingDetails = document.querySelector('.product-details');
        if (existingDetails) {
            existingDetails.remove();
        }

        // Create product-details div
        const details = document.createElement('div');
        details.className = 'product-details';
        details.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.image}" class="img-fluid product-image" alt="${product.title}">
                </div>
                <div class="col-md-6">
                    <h2>${product.title}</h2>
                    <p class="text-muted">${product.description || 'Um produto exclusivo Mary Kay® para você!'}</p>
                    <p class="fw-bold">${product.price || 'Consulte o preço'}</p>
                    <a href="${product.link}" target="_blank"><button class="btn buy-button">Comprar</button></a>
                    <button class="close-button mt-2">Fechar</button>
                </div>
            </div>
        `;

        // Insert after the clicked card's container
        cardContainer.insertAdjacentElement('afterend', details);

        // Scroll to the product-details section
        window.scrollTo({ top: details.offsetTop, behavior: 'smooth' });

        // Add event listener to close button
        details.querySelector('.close-button').addEventListener('click', () => {
            details.remove();
        });
    }

    fetch('src/resources/carousel.json')
    .then(response => response.json())
    .then(data => {
      const carouselInner = document.getElementById('carousel-items');

      data.products.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = product.image;
        img.className = 'd-block w-100';
        img.alt = product.title;

        div.appendChild(img);
        carouselInner.appendChild(div);
      });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
});