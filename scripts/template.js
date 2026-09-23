function getBasketItem(menuItemName) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === menuItemName) {
            return basket[i];
        }
    }
    return null;
}

function getMenuCardTemplate(menuItem, i) {
    const basketItem = getBasketItem(menuItem.name);

    let buttonText = 'Add to basket';
    let buttonClass = 'btn-add-basket';

    if (basketItem) {
        buttonText = 'Added ' + basketItem.amount;
        buttonClass = 'btn-add-basket is-added';
    }

    return `
    <article class="menu-card">
        <img src="${menuItem.image}" alt="${menuItem.name}" class="menu-card-img">
        <div class="menu-card-right">
            <div class="menu-card-header">
                <h4 class="menu-card-title">${menuItem.name}</h4>
                <span class="menu-card-price">${menuItem.price.toFixed(2).replace('.', ',')}€</span>
            </div>
            
            <p class="menu-card-desc">${menuItem.description}</p>
            
            <div class="menu-card-footer">
                <button type="button" class="${buttonClass}" onclick="addToBasket(${i})">
                    ${buttonText}
                </button>
            </div>
        </div>
    </article>
    `;
}

function getBasketItemTemplate(item, itemTotalPrice, i) {
    const isSingle = item.amount === 1;

    let trashHeaderHTML = '';
    if (!isSingle) {
        trashHeaderHTML = `
            <img src="./assets/icons/trash.svg" 
                 alt="Delete" 
                 class="btn-trash-top" 
                 onclick="deleteBasketItem(${i})">
        `;
    }

    let controlLeftHTML = '';
    if (isSingle) {
        controlLeftHTML = `
            <img src="./assets/icons/trash.svg" 
                 alt="Delete" 
                 class="btn-control-trash" 
                 onclick="deleteBasketItem(${i})">
        `;
    } else {
        controlLeftHTML = `
            <span class="btn-control-text" onclick="decreaseAmount(${i})">-</span>
        `;
    }

    return `
        <div class="basket-item">
            <div class="basket-item-header">
                <span class="basket-item-title">${item.amount} x ${item.name}</span>
                ${trashHeaderHTML}
            </div>

            <div class="basket-item-bottom">
                <div class="basket-item-controls">
                    ${controlLeftHTML}
                    <span class="item-amount-num">${item.amount}</span>
                    <span class="btn-control-text" onclick="increaseAmount(${i})">+</span>
                </div>
                <span class="basket-item-price">${itemTotalPrice.toFixed(2).replace('.', ',')}€</span>
            </div>
        </div>
    `;
}

function getBasketTotalTemplate(subtotal, deliveryFee, total) {
    return `
        <div class="basket-total-wrapper">
            <div class="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2).replace('.', ',')}€</span>
            </div>
            <div class="total-row">
                <span>Delivery fee</span>
                <span>${deliveryFee.toFixed(2).replace('.', ',')}€</span>
            </div>
            <div class="total-divider"></div>
            <div class="total-row total-bold">
                <span>Total</span>
                <span>${total.toFixed(2).replace('.', ',')}€</span>
            </div>
            <button type="button" class="btn-buy-now">
                Buy now (${total.toFixed(2).replace('.', ',')}€)
            </button>
        </div>
    `;
}