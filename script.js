// -------------------
// DATI PRODOTTI
// -------------------
const products = [
  { id: 1, name: "Lampada da tavolo", price: 24.99, image: "assets/lampada.webp", category: "Illuminazione" },
  { id: 2, name: "Lampadario classico", price: 89.00, image: "assets/lampadario.webp", category: "Illuminazione" },
  { id: 3, name: "Applique a muro", price: 39.00, image: "assets/applique.webp", category: "Illuminazione" },
  { id: 4, name: "Striscia LED", price: 18.00, image: "assets/striscia_led.webp", category: "Illuminazione" },
  { id: 5, name: "Lampada sospesa minimal", price: 44.00, image: "assets/lampada_sospesa.webp", category: "Illuminazione" },
  { id: 6, name: "Tappeto moderno", price: 39.90, image: "assets/tappeto.webp", category: "Tessili" },
  { id: 7, name: "Coperta", price: 22.90, image: "assets/coperta.webp", category: "Tessili" },
  { id: 8, name: "Tenda da finestra", price: 19.50, image: "assets/tenda.webp", category: "Tessili" },
  { id: 9, name: "Cuscino decorativo", price: 15.00, image: "assets/cuscino.webp", category: "Tessili" },
  { id: 10, name: "Plaid caldo", price: 27.00, image: "assets/plaid.webp", category: "Tessili" },
  { id: 11, name: "Set di tazze", price: 12.00, image: "assets/tazze.webp", category: "Articoli per la tavola" },
  { id: 12, name: "Bicchieri", price: 14.20, image: "assets/bicchieri.webp", category: "Articoli per la tavola" },
  { id: 13, name: "Servizio piatti", price: 45.00, image: "assets/piatti.webp", category: "Articoli per la tavola" },
  { id: 14, name: "Posate in acciaio", price: 29.99, image: "assets/posate.webp", category: "Articoli per la tavola" },
  { id: 15, name: "Brocca in vetro", price: 16.50, image: "assets/brocca.webp", category: "Articoli per la tavola" },
  { id: 16, name: "Cornice fotografica", price: 9.99, image: "assets/cornice.webp", category: "Decorazioni per la casa" },
  { id: 17, name: "Specchio da parete", price: 29.95, image: "assets/specchio.webp", category: "Decorazioni per la casa" },
  { id: 18, name: "Vaso decorativo", price: 15.75, image: "assets/vaso.webp", category: "Decorazioni per la casa" },
  { id: 19, name: "Quadro astratto", price: 34.99, image: "assets/quadro.webp", category: "Decorazioni per la casa" },
  { id: 20, name: "Orologio da muro", price: 22.80, image: "assets/orologio.webp", category: "Decorazioni per la casa" },
  { id: 21, name: "Libreria modulare", price: 99.00, image: "assets/libreria.webp", category: "Arredo ufficio" },
  { id: 22, name: "Sedia ergonomica", price: 89.90, image: "assets/sedia.webp", category: "Arredo ufficio" },
  { id: 23, name: "Cassettiera compatta", price: 49.90, image: "assets/cassettiera.webp", category: "Arredo ufficio" },
  { id: 24, name: "Scrivania", price: 17.50, image: "assets/scrivania.webp", category: "Arredo ufficio" },
  { id: 25, name: "Sgabello", price: 34.99, image: "assets/sgabello.webp", category: "Arredo ufficio" }
];

// -------------------
// CARRELLO E PREFERITI
// -------------------
const cart = JSON.parse(localStorage.getItem("cart")) || {};
const favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);

// -------------------
// ELEMENTI DOM (opzionali)
// -------------------
const cartItems = document.getElementById("cart-items");
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const favoriteCountEls = document.querySelectorAll(".favorite-count");

// -------------------
// CATALOGO
// -------------------
function showCatalog(filter = "") {
  if (!productGrid) return;

  const categories = [...new Set(products.map(p => p.category))];
  productGrid.innerHTML = "";

  categories.forEach(category => {
    const items = products.filter(p => p.category === category && p.name.toLowerCase().includes(filter.toLowerCase()));
    if (!items.length) return;

    const section = document.createElement("section");
    section.className = "category-section";

    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = category;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "product-category-grid";

    items.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      const isFav = favorites.has(product.id);

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <h3>${product.name}</h3>
        <p>€${product.price.toFixed(2)}</p>
        <div class="product-buttons">
          <button onclick="addToCart(${product.id})">Aggiungi al carrello</button>
          <button class="favorite-btn" onclick="toggleFavorite(${product.id}, this)">
            ${isFav ? "❤" : "♡"}
          </button>
        </div>
      `;
      grid.appendChild(div);
    });

    section.appendChild(grid);
    productGrid.appendChild(section);
  });
}

// -------------------
// CARRELLO
// -------------------
function addToCart(id) {
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    const product = products.find(p => p.id === id);
    if (product) cart[id] = { ...product, quantity: 1 };
  }
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function updateQuantity(id, qty) {
  const quantity = parseInt(qty);
  if (isNaN(quantity) || quantity <= 0) {
    removeFromCart(id);
  } else {
    cart[id].quantity = quantity;
    updateCartUI();
  }
}

function updateCartUI() {
  if (cartItems) cartItems.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  for (const id in cart) {
    const item = cart[id];
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;

    if (cartItems) {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <span>${item.name}</span>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" />
        <span>€${(item.quantity * item.price).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Rimuovi</button>
      `;
      cartItems.appendChild(div);
    }
  }

  document.querySelectorAll(".cart-count").forEach(el => (el.textContent = totalItems));
  document.querySelectorAll(".cart-total").forEach(el => (el.textContent = totalPrice.toFixed(2)));

  const emptyMsg = document.getElementById("empty-cart-message");
  if (emptyMsg) emptyMsg.style.display = totalItems === 0 ? "block" : "none";

  localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
  for (const id in cart) delete cart[id];
  updateCartUI();
  localStorage.removeItem("cart");
}

// -------------------
// PREFERITI
// -------------------
function toggleFavorite(id, button) {
  if (favorites.has(id)) {
    favorites.delete(id);
    if (button) button.textContent = "♡";
  } else {
    favorites.add(id);
    if (button) button.textContent = "❤";
  }
  updateFavoriteCount();
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
}

function updateFavoriteCount() {
  favoriteCountEls.forEach(el => (el.textContent = favorites.size));
}

// -------------------
// EVENTI
// -------------------
if (searchInput) {
  searchInput.addEventListener("input", e => {
    showCatalog(e.target.value);
  });
}

const clearCartButton = document.getElementById("clear-cart-button");
if (clearCartButton) {
  clearCartButton.addEventListener("click", clearCart);
}

const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (email && email.includes("@")) {
      newsletterMessage.textContent = "Grazie per esserti iscritto!";
      newsletterForm.reset();
    } else {
      newsletterMessage.textContent = "Inserisci un indirizzo email valido.";
    }
  });
}

// -------------------
// INIZIALIZZAZIONE
// -------------------
showCatalog();
updateCartUI();
updateFavoriteCount();
