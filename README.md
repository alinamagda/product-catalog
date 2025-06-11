# HappyHomeShop - README

## Come funziona

HappyHomeShop è un'applicazione web che simula un semplice negozio online per la casa. Il codice permette di:

### 1. Visualizzare un catalogo prodotti

* Il file `script.js` contiene un array `products` con tutti i prodotti divisi per categoria (Illuminazione, Tessili, ecc.).
* La funzione `showCatalog()` crea dinamicamente la griglia dei prodotti suddivisa per categorie.
* Ogni prodotto include immagine, nome, prezzo, bottone per aggiunta al carrello e icona per aggiunta ai preferiti.
* Un campo di ricerca in alto filtra i prodotti per nome in tempo reale.

### 2. Aggiungere e gestire il carrello

* Quando l'utente clicca "Aggiungi al carrello", il prodotto viene inserito nell'oggetto `cart`.
* La funzione `updateCartUI()`:

  * mostra i prodotti nel carrello in fondo alla pagina
  * aggiorna il numero totale di articoli (`.cart-count`) e il prezzo totale (`.cart-total`)
  * mostra/hide il messaggio "Il carrello è vuoto"
* L'utente può modificare la quantità o rimuovere articoli.
* Il bottone "Svuota carrello" elimina tutti gli articoli.

### 3. Gestire i preferiti

* Ogni prodotto può essere aggiunto o rimosso dai preferiti cliccando l'icona a cuore.
* I preferiti sono memorizzati in un Set `favorites`.
* Il numero di preferiti viene aggiornato dinamicamente nella navbar (`.favorite-count`).

### 4. Navigazione tra pagine

* L'header include link a:

  * `account.html`: pagina account utente
  * `preferiti.html`: (da completare) per mostrare i preferiti salvati
  * `checkout.html`: riepilogo del carrello (da completare)

### 5. Accessibilità e responsive design

* Il layout è responsive:

  * su tablet i link di navigazione sono su una riga
  * su mobile sono centrati e disposti verticalmente
* La barra di ricerca e i bottoni hanno stili moderni, con ombre e bordi arrotondati.

## File principali

* `index.html` - pagina principale con catalogo, carrello e ricerca
* `script.js` - logica per catalogo, carrello, preferiti
* `styles.css` - stili responsive e UI
* `account.html`, `checkout.html`, `preferiti.html` - pagine secondarie

## Requisiti

Funziona su qualsiasi browser moderno. Non richiede backend o database.

## Prossimi miglioramenti

* Salvataggio di carrello e preferiti con `localStorage`
* Completamento pagine `checkout.html` e `preferiti.html`
* Funzionalità di login utente e ordini
