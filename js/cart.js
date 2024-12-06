// Fetch cart data from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const cartList = document.getElementById('cart-list');
const subtotalElem = document.getElementById('subtotal');
const vatElem = document.getElementById('vat');
const totalElem = document.getElementById('total');

// Function to display cart items and calculate totals
function displayCartItems() {
    cartList.innerHTML = ''; // Clear current cart display

    let subtotal = 0;
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <input type="checkbox" class="cart-item-checkbox" data-id="${item.id}" checked>
            <img class="cart-item-image" src="images/${item.image}" alt="${item.name}" width="50"> <!-- Use item.image -->
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1">
            <p>Subtotal: $<span class="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span></p>
        `;
        cartList.appendChild(cartItemDiv);

        // Add to subtotal calculation
        subtotal += item.price * item.quantity;
    });

    // Update subtotal, VAT, and total
    const vat = subtotal * 0.075; // 7.5% VAT
    const total = subtotal + vat;

    subtotalElem.textContent = subtotal.toFixed(2);
    vatElem.textContent = vat.toFixed(2);
    totalElem.textContent = total.toFixed(2);
}

// Function to update quantities and checkboxes
function updateCart() {
    const checkboxes = document.querySelectorAll('.cart-item-checkbox');
    const quantities = document.querySelectorAll('.quantity');

    cartItems = cartItems.filter(item => {
        const checkbox = document.querySelector(`.cart-item-checkbox[data-id="${item.id}"]`);
        return checkbox.checked;
    });

    quantities.forEach(input => {
        const productId = input.getAttribute('data-id');
        const updatedQuantity = parseInt(input.value);
        const product = cartItems.find(item => item.id == productId);
        if (product) {
            product.quantity = updatedQuantity;
        }
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

// Event listener for quantity changes and checkboxes
document.addEventListener('input', event => {
    if (event.target.classList.contains('quantity') || event.target.classList.contains('cart-item-checkbox')) {
        updateCart();
    }
});

// Initialize cart items display when the page loads
displayCartItems();
