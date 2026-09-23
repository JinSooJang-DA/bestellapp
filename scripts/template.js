function getMenuCardTemplate(menuItem, i) {
    return `
    <article class="menu-card">
            <img src="${menuItem.image}" alt="${menuItem.name}" class="menu-card-img">
            <div class="menu-card-right">
              <div class="menu-card-header">
                <h4 class="menu-card-title">${menuItem.name} </h4>
                <p class="menu-card-desc">${menuItem.description}</p>
              </div>
              
              <div class="menu-card-footer">
                <span class="menu-card-price">
                ${menuItem.price.toFixed(2).replace('.',',')}€</span>
                <button type="button" class="btn-add-basket"
                onclick="addToBasket(${i})">Add to basket
                </button>
              </div>
            </div>
    </article>
            `;
}