import { menuArray } from './data.js'

const container = document.querySelector('#container');
const menu = menuArray.map(item => {
    return `
        <li class="menu-item">
            <span id=${item.name.toLowerCase()}-emoji class="emoji">${item.emoji}</span>
            <h2 id="${item.name.toLowerCase()}" class="item-name">${item.name}</h2>
            <p class="ingredients">${item.ingredients.join(' ')}</p>
            <p class="price">${item.price}</p>
        </li>
    `
}).join('')

container.innerHTML = menu;