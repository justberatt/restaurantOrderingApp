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
            <button class="add-to-card__btn" id="add-to-card__btn">+</button>
        </li>
        <hr>
    `
}).join('')

menu.innerHTML = menuItems;