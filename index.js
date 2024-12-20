import { menuArray } from './data.js'

const menu = document.querySelector('#menu');
const menuItems = menuArray.map(item => {
    return `
        <li class="menu-item" role="menuitem">
            <div class="emoji-container">
                <div id=${item.name.toLowerCase()}-emoji class="emoji">${item.emoji}</div>
            </div>
            <div class="item-info">
                <h2 id="${item.name.toLowerCase()}" class="item-name">${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(' ')}</p>
                <h4 class="price">$${item.price}</h4>
            </div>
            <button class="add-to-card__btn" data-add="${item.id}" aria-label="Add ${item.name} to cart">+</button>
        </li>
    `
}).join('')

menu.innerHTML = menuItems;

document.addEventListener('click', (e) => {
    if (e.target.dataset.add)
        handleAddToListClick(e.target.dataset.add);
    if (e.target.dataset.remove)
        handleRemoveFromListClick(e.target.dataset.remove)
    if (e.target.id === 'complete-order-btn')
        handleCompleteOrderClick()
    if (e.target.id === 'close-modal-btn')
        closeModal()
})

const cardInput = document.getElementById('card-number');
const cvvInput = document.getElementById('cvv-number');

cardInput.addEventListener('input', (e) => {
    // Remove any non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    // Insert a space every 4 digits
    value = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = value;
});

cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3); // Only allow three digits
});

const handlePreCheckoutToggle = () => {
    const preCheckoutListContainer = document.querySelector('#pre-checkout-list-container');
    if (checkoutListArr.length !== 0) {
        preCheckoutListContainer.classList.remove('hidden')
    } else {
        preCheckoutListContainer.classList.add('hidden')
    }
}

const checkoutListArr = [];

const handleAddToListClick = (addButtonID) => {
    menuArray.forEach(item => {
        if (addButtonID == item.id) {
            checkoutListArr.push(item)
            renderPrecheckoutList()
            totalPrice(checkoutListArr)
        }
    })
    handlePreCheckoutToggle()
}

const renderPrecheckoutList = () => {
    const preCheckoutList = checkoutListArr.map(item => {
        return `
            <li class="ordered-item" role="listitem">
                <h2 id="${item.name.toLowerCase()}" class="ordered-item-name">${item.name}</h2>
                <button class="remove-btn" id="remove-btn" data-remove="${item.id}"  aria-label="Remove ${item.name} from cart">remove</button>
                <h4 class="price">$${item.price}</h4>
            </li>
        `
    }).join('')
    document.querySelector('#pre-checkout-list').innerHTML = preCheckoutList
}

const handleRemoveFromListClick = (removeButtonID) => {
    const item = checkoutListArr.filter(item => item.id == removeButtonID)[0]
    const itemIndex = checkoutListArr.indexOf(item)
    checkoutListArr.splice(itemIndex, 1)
    renderPrecheckoutList()
    totalPrice(checkoutListArr)
    handlePreCheckoutToggle()
}

const totalPrice = (arr) => {
    const totalPrice = document.querySelector('#total-price');
    totalPrice.innerHTML = '$' + arr.reduce((total, currentItem) => total + currentItem.price, 0)
}

const handleCompleteOrderClick = () => {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = () => {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

const paymentForm = document.querySelector('#payment-form');
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('cardHolderName')
    document.querySelector('#payment-success-wrapper').innerHTML = `
        <div class="payment-success-msg-container">
            <p class="payment-success-msg">Thanks, ${name}! Your order is on your way!</p>
        </div>
    `
    closeModal()
    document.querySelector('#pre-checkout-list-container').classList.add('hidden')
    renderPrecheckoutList()
})