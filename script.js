// Array di oggetti che rappresentano i prodotti disponibili
const products = [
    { id: 1, name: "Divano Moderno", price: 799.99, image: "https://placehold.co/150x150/CCE5FF/0056B3?text=Divano" },
    { id: 2, name: "Tavolo da Pranzo", price: 349.50, image: "https://placehold.co/150x150/B3E0FF/0056B3?text=Tavolo" },
    { id: 3, name: "Set 4 Sedie", price: 180.00, image: "https://placehold.co/150x150/99D6FF/0056B3?text=Sedie" },
    { id: 4, name: "Lampada da Terra", price: 89.99, image: "https://placehold.co/150x150/80CCFF/0056B3?text=Lampada" },
    { id: 5, name: "Libreria a Muro", price: 210.00, image: "https://placehold.co/150x150/66C2FF/0056B3?text=Libreria" },
    { id: 6, name: "Armadio a 3 Ante", price: 520.00, image: "https://placehold.co/150x150/4DC8FF/0056B3?text=Armadio" },
    { id: 7, name: "Letto Matrimoniale", price: 450.00, image: "https://placehold.co/150x150/33BFFF/0056B3?text=Letto" },
    { id: 8, name: "Comodino Design", price: 65.00, image: "https://placehold.co/150x150/1AAFFF/0056B3?text=Comodino" },
    { id: 9, name: "Scrivania Ufficio", price: 120.00, image: "https://placehold.co/150x150/0099FF/0056B3?text=Scrivania" },
    { id: 10, name: "Tappeto Kilim", price: 95.00, image: "https://placehold.co/150x150/0088EE/0056B3?text=Tappeto" },
    { id: 11, name: "Specchio da Parete", price: 40.00, image: "https://placehold.co/150x150/0077DD/0056B3?text=Specchio" },
    { id: 12, name: "Vaso in Ceramica", price: 25.00, image: "https://placehold.co/150x150/0066CC/0056B3?text=Vaso" }
];

// Array per memorizzare gli articoli nel carrello
let cart = [];

// Ottenimento dei riferimenti agli elementi del DOM
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceSpan = document.getElementById('total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutButton = document.getElementById('checkout-button');
const messageBox = document.getElementById('message-box');
const messageTitle = document.getElementById('message-title');
const messageContent = document.getElementById('message-content');
const messageCloseButton = document.getElementById('message-close-button');


/**
 * Mostra una finestra di messaggio personalizzata al posto di alert().
 * @param {string} title - Il titolo del messaggio.
 * @param {string} message - Il contenuto del messaggio.
 */
function showMessageBox(title, message) {
    messageTitle.textContent = title;
    messageContent.textContent = message;
    messageBox.classList.remove('hidden');
}

// Event listener per il pulsante di chiusura della finestra di messaggio
messageCloseButton.addEventListener('click', () => {
    messageBox.classList.add('hidden');
});

/**
 * Renderizza i prodotti nel catalogo.
 * Ogni prodotto viene creato come una card HTML con immagine, nome, prezzo e un pulsante "Aggiungi al Carrello".
 */
function renderProducts() {
    productsContainer.innerHTML = ''; // Pulisce il contenitore prima di aggiungere i prodotti
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card'; // Classe CSS per la card prodotto
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-info">
                <h3>${product.name}</h3>
                <p>${product.price.toFixed(2)} €</p>
                <button onclick="addToCart(${product.id})"
                        class="add-to-cart-button">
                    Aggiungi al Carrello
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

/**
 * Aggiunge un prodotto al carrello o ne incrementa la quantità se già presente.
 * @param {number} productId - L'ID del prodotto da aggiungere.
 */
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        updateCartDisplay(); // Aggiorna la visualizzazione del carrello e il totale
        showMessageBox('Aggiunto al Carrello', `${productToAdd.name} è stato aggiunto al carrello.`);
    }
}

/**
 * Rimuove un articolo dal carrello o decrementa la quantità.
 * Se la quantità raggiunge zero, l'articolo viene completamente rimosso.
 * @param {number} productId - L'ID del prodotto da rimuovere/decrementare.
 */
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // Rimuove l'elemento se la quantità è 1
        }
        updateCartDisplay();
    }
}

/**
 * Aggiorna la visualizzazione degli elementi nel carrello e il messaggio di carrello vuoto.
 */
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Pulisce il contenitore degli articoli del carrello
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden'); // Mostra il messaggio di carrello vuoto
    } else {
        emptyCartMessage.classList.add('hidden'); // Nasconde il messaggio di carrello vuoto
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item'; // Classe CSS per l'elemento del carrello
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p>${item.name}</p>
                        <p>${item.quantity} x ${item.price.toFixed(2)} €</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button onclick="removeFromCart(${item.id})"
                            class="remove-from-cart-button">
                        -
                    </button>
                    <span class="cart-item-subtotal">${(item.quantity * item.price).toFixed(2)} €</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
    calculateTotal(); // Ricalcola il totale dopo ogni aggiornamento del carrello
}

/**
 * Calcola e aggiorna il prezzo totale del carrello.
 */
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceSpan.textContent = `${total.toFixed(2)} €`;
}

// Gestisce il click sul pulsante "Procedi al Checkout"
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        showMessageBox('Carrello Vuoto', 'Il tuo carrello è vuoto. Aggiungi prima alcuni prodotti!');
    } else {
        showMessageBox('Checkout', `Grazie per il tuo acquisto! Totale: ${totalPriceSpan.textContent}`);
        cart = []; // Svuota il carrello dopo il checkout
        updateCartDisplay(); // Aggiorna la visualizzazione del carrello
    }
});

// Carica i prodotti e aggiorna la visualizzazione del carrello all'apertura della pagina
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay(); // Assicura che il carrello sia visualizzato correttamente all'inizio
});
