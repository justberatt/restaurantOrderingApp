import { menuArray } from './data.js'

const menu = document.querySelector('#menu');
const menuItems = menuArray.map(item => {
    return `
        <li class="menu-item">
            <div class="emoji-container">
                <div id=${item.name.toLowerCase()}-emoji class="emoji">${item.emoji}</div>
            </div>
            <div class="item-info">
                <h2 id="${item.name.toLowerCase()}" class="item-name">${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(' ')}</p>
                <h4 class="price">$${item.price}</h4>
            </div>
            <button class="add-to-card__btn" data-add="${item.id}">+</button>
        </li>
        <hr>
    `
}).join('')

menu.innerHTML = menuItems;

document.addEventListener('click', (e) => {
    if (e.target.dataset.add)
        handleAddToListClick(e.target.dataset.add);
    if (e.target.dataset.remove)
        handleRemoveFromListClick(e.target.dataset.remove)
    
    const preCheckoutListContainer = document.querySelector('#pre-checkout-list-container');
    if (checkoutListArr.length !== 0) {
        preCheckoutListContainer.classList.remove('hidden')
    } else {
        preCheckoutListContainer.classList.add('hidden')
    }
})


const checkoutListArr = [];

const handleAddToListClick = (addButtonID) => {
    menuArray.forEach(item => {
        if (addButtonID == item.id) {
            checkoutListArr.push(item)
            renderPrecheckoutList()
        }
    })
}

const renderPrecheckoutList = () => {
    const preCheckoutList = checkoutListArr.map(item => {
        return `
            <li class="ordered-item">
                <h2 id="${item.name.toLowerCase()}" class="ordered-item-name">${item.name}</h2>
                <button class="remove-btn" id="remove-btn" data-remove="${item.id}">remove</button>
                <h4 class="price">$${item.price}</h4>
            </li>
        `
    }).join('')
    document.querySelector('#pre-checkout-list').innerHTML = preCheckoutList
}

const handleRemoveFromListClick = (removeButtonID) => {
    const item = checkoutListArr.filter(item => item.id == removeButtonID)
    const itemIndex = checkoutListArr.indexOf(item)
    checkoutListArr.splice(itemIndex, 1)
    renderPrecheckoutList()
}
// const togglePreCheckoutList = () => {
//     const preCheckoutList = document.querySelector('#pre-checkout-list');
//     if (preCheckoutList)
// }