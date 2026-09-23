function getMenuCardTemplate(menuItem, i) {
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
                <button type="button" class="btn-add-basket" onclick="addToBasket(${i})">
                    Add to basket
                </button>
            </div>
        </div>
    </article>
    `;
}