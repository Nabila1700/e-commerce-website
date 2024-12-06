// Initialize the cart from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to cart
function addToCart(productId) {
    const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
    const imageName = productDiv.getAttribute('data-image');
    const productName = productDiv.querySelector('h3').textContent;
    const productPrice = parseFloat(productDiv.querySelector('p').textContent.replace('$', ''));

    // Check if the product is already in the cart
    const existingProduct = cartItems.find(item => item.id === productId);

    if (existingProduct) {
        // If product is already in the cart, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If product is not in the cart, add it
        cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: imageName,
            quantity: 1
        });
    }

    // Save the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count display
    updateCartCount();

    alert(`${productName} added to cart!`);
}

// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length;
}

// Event listener for add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.closest('.product').getAttribute('data-id');
        addToCart(productId);
    });
});
