// Catalogo prodotti con categoria
const products = [
  // Illuminazione
  { id: 1, name: "Lampada da tavolo", price: 24.99, image: "assets/lampada.webp", category: "Illuminazione" },
  { id: 2, name: "Lampadario classico", price: 89.00, image: "assets/lampadario.webp", category: "Illuminazione" },
  { id: 3, name: "Applique a muro", price: 39.00, image: "assets/applique.webp", category: "Illuminazione" },
  { id: 4, name: "Striscia LED", price: 18.00, image: "assets/striscia_led.webp", category: "Illuminazione" },
  { id: 5, name: "Lampada sospesa minimal", price: 44.00, image: "assets/lampada_sospesa.webp", category: "Illuminazione" },

  // Tessili
  { id: 6, name: "Tappeto moderno", price: 39.90, image: "assets/tappeto.webp", category: "Tessili" },
  { id: 7, name: "Coperta", price: 22.90, image: "assets/coperta.webp", category: "Tessili" },
  { id: 8, name: "Tenda da finestra", price: 19.50, image: "assets/tenda.webp", category: "Tessili" },
  { id: 9, name: "Cuscino decorativo", price: 15.00, image: "assets/cuscino.webp", category: "Tessili" },
  { id: 10, name: "Plaid caldo", price: 27.00, image: "assets/plaid.webp", category: "Tessili" },

  // Articoli per la tavola
  { id: 11, name: "Set di tazze", price: 12.00, image: "assets/tazze.webp", category: "Articoli per la tavola" },
  { id: 12, name: "Bicchieri", price: 14.20, image: "assets/bicchieri.webp", category: "Articoli per la tavola" },
  { id: 13, name: "Servizio piatti", price: 45.00, image: "assets/piatti.webp", category: "Articoli per la tavola" },
  { id: 14, name: "Posate in acciaio", price: 29.99, image: "assets/posate.webp", category: "Articoli per la tavola" },
  { id: 15, name: "Brocca in vetro", price: 16.50, image: "assets/brocca.webp", category: "Articoli per la tavola" },

  // Decorazioni per la casa
  { id: 16, name: "Cornice fotografica", price: 9.99, image: "assets/cornice.webp", category: "Decorazioni per la casa" },
  { id: 17, name: "Specchio da parete", price: 29.95, image: "assets/specchio.webp", category: "Decorazioni per la casa" },
  { id: 18, name: "Vaso decorativo", price: 15.75, image: "assets/vaso.webp", category: "Decorazioni per la casa" },
  { id: 19, name: "Quadro astratto", price: 34.99, image: "assets/quadro.webp", category: "Decorazioni per la casa" },
  { id: 20, name: "Orologio da muro", price: 22.80, image: "assets/orologio.webp", category: "Decorazioni per la casa" },

  // Arredo ufficio
  { id: 21, name: "Libreria modulare", price: 99.00, image: "assets/libreria.webp", category: "Arredo ufficio" },
  { id: 22, name: "Sedia ergonomica", price: 89.90, image: "assets/sedia.webp", category: "Arredo ufficio" },
  { id: 23, name: "Cassettiera compatta", price: 49.90, image: "assets/cassettiera.webp", category: "Arredo ufficio" },
  { id: 24, name: "Agenda", price: 17.50, image: "assets/agenda.webp", category: "Arredo ufficio" },
  { id: 25, name: "Sgabello", price: 34.99, image: "assets/sgabello.webp", category: "Arredo ufficio" }
];

// Carrello e preferiti

const cart = {};
const favorites = new Set();

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");

// Mostra il catalogo prodotti
function showCatalog() {
  const categories = [...new Set(products.map(p => p.category))];
  productGrid.innerHTML = "";

  categories.forEach(cat => {
    const section = document.createElement("section");
    section.className = "category-section";

    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = cat;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "product-category-grid";

    const catProducts = products.filter(p => p.category === cat);
    catProducts.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>€${product.price.toFixed(2)}</p>
        <div class="product-buttons">
          <button onclick="addToCart(${product.id})">Aggiungi al carrello</button>
          <button class="favorite-btn" data-id="${product.id}" onclick="toggleFavorite(${product.id}, this)">♡</button>
        </div>
      `;

      grid.appendChild(div);
    });

    section.appendChild(grid);
    productGrid.appendChild(section);
  });
}

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId].quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart[productId] = { ...product, quantity: 1 };
  }
  updateCartUI();
}

function removeFromCart(productId) {
  delete cart[productId];
  updateCartUI();
}

function updateQuantity(productId, newQuantity) {
  const qty = parseInt(newQuantity);
  if (qty <= 0) {
    removeFromCart(productId);
  } else {
    cart[productId].quantity = qty;
    updateCartUI();
  }
}

function updateCartUI() {
  cartItems.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  Object.values(cart).forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
      <span>€${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})">Rimuovi</button>
    `;
    cartItems.appendChild(itemDiv);
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toFixed(2);
}

function toggleFavorite(productId, button) {
  if (favorites.has(productId)) {
    favorites.delete(productId);
    button.classList.remove("favorited");
    button.textContent = "♡";
  } else {
    favorites.add(productId);
    button.classList.add("favorited");
    button.textContent = "❤";
  }
}

showCatalog();
