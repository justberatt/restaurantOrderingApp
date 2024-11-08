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
            <button class="add-to-card__btn" id="${item.id}">+</button>
        </li>
        <hr>
    `
}).join('')

menu.innerHTML = menuItems;

menu.addEventListener('click', (e) => {
    handleAddToCartClick(e)
})

const handleAddToCartClick = (e) => {
    console.log("targetID: ", e.target.id)
    menuArray.forEach(item => {
        if (e.target.id == item.id) {
            const preCheckoutList = `
                <li>
                    <h2 id="${item.name.toLowerCase()}" class="item-name">${item.name}</h2>
                    <button>remove</button>
                    <h4 class="price">$${item.price}</h4>
                </li>
            `
            document.querySelector('#items-ordered').innerHTML = preCheckoutList
        }
    })
    // const preCheckoutList = menuArray.map(item => {
    //     return `
            // <li>
            //     <h2 id="${item.name.toLowerCase()}" class="item-name">${item.name}</h2>
            //     <button>remove</button>
            //     <h4 class="price">$${item.price}</h4>
            // </li>
    //     `
    // })
    // document.querySelector('#items-ordered').innerHTML = preCheckoutList
}