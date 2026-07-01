// Cart is kept in memory (an array of {id, name, price, qty})
let cart = [];

const cartListEl = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');
const emptyMsgEl = document.getElementById('empty-msg');
const orderForm = document.getElementById('order-form');

// --- Add to cart ---
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    renderCart();
  });
});

// --- Render cart ---
function renderCart() {
  cartListEl.innerHTML = '';

  if (cart.length === 0) {
    cartListEl.appendChild(emptyMsgEl);
    cartTotalEl.textContent = '0';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    const lineTotal = item.price * item.qty;
    total += lineTotal;

    li.innerHTML = `
      <span>${item.name} (₹${item.price})</span>
      <div class="qty-controls">
        <button type="button" class="dec" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button type="button" class="inc" data-id="${item.id}">+</button>
      </div>
    `;
    cartListEl.appendChild(li);
  });

  cartTotalEl.textContent = total;

  // attach +/- handlers
  cartListEl.querySelectorAll('.inc').forEach(b => {
    b.addEventListener('click', () => changeQty(b.dataset.id, 1));
  });
  cartListEl.querySelectorAll('.dec').forEach(b => {
    b.addEventListener('click', () => changeQty(b.dataset.id, -1));
  });
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

// --- Place order ---
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Your cart is empty. Please add at least one item.');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !phone || !address) {
    alert('Please fill in all your details.');
    return;
  }

  // Build a readable order summary
  let message = `*New Order - Tasty Bites*\n\n`;
  message += `*Customer:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Address:* ${address}\n\n`;
  message += `*Order Details:*\n`;

  let total = 0;
  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    message += `- ${item.name} x${item.qty} = ₹${lineTotal}\n`;
  });

  message += `\n*Total: ₹${total}*`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Open WhatsApp (app on mobile, WhatsApp Web on desktop)
  window.open(waUrl, '_blank');
});

renderCart();
