let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;

    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = cart.map(cartItem => `<p>${cartItem.item} - $${cartItem.price}</p>`).join('');
    document.getElementById('total').innerText = total;
}