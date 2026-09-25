// [1] 장바구니에 담긴 아이템인지 확인하는 보조 함수
function getBasketItem(menuItemName) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === menuItemName) {
            return basket[i];
        }
    }
    return null;
}

// [2] 메뉴판 카드 HTML을 만들어주는 함수
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
        <picture>
        <!-- 모바일 화면(768px 이하)일 때만 선명한 와이드 WebP 로드 -->
        <source media="(max-width: 768px)" srcset="${menuItem.imageMobile}">
        <!-- 기본(데스크톱) 화면일 때는 기존 이미지 유지 -->
        <img src="${menuItem.image}" alt="${menuItem.name}" class="menu-card-img" loading="lazy">
    </picture>
        <div class="menu-card-right">
            <div class="menu-card-header">
                <h4 class="menu-card-title">${menuItem.name}</h4>
                <!-- ★ 데스크톱 환경에서 상단에 표시될 가격 -->
                <span class="menu-card-price desktop-price">${menuItem.price.toFixed(2).replace('.', ',')}€</span>
            </div>
            
            <p class="menu-card-desc">${menuItem.description}</p>
            
            <div class="menu-card-footer">
                <!-- ★ 모바일 환경에서 하단 버튼 옆에 표시될 가격 -->
                <span class="menu-card-price mobile-price">${menuItem.price.toFixed(2).replace('.', ',')}€</span>
                
                <!-- id="menu-btn-${i}" 가 적용된 버튼 -->
                <button type="button" id="menu-btn-${i}" class="${buttonClass}" onclick="addToBasket(${i})">
                    ${buttonText}
                </button>
            </div>
        </div>
    </article>
    `;
}

// [3] 장바구니 안의 각 음식 아이템 HTML을 만들어주는 함수
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

// [4] 배달/포장 스위치가 포함된 영수증 총액 함수
function getBasketTotalTemplate(subtotal, deliveryFee, total) {
    const activeDeliveryClass = isDelivery ? 'switch-btn active' : 'switch-btn';
    const activePickupClass = !isDelivery ? 'switch-btn active' : 'switch-btn';
    
    const deliveryRowHTML = isDelivery 
        ? `<span>${deliveryFee.toFixed(2).replace('.', ',')}€</span>` 
        : `<span class="discount-text">- ${deliveryFee.toFixed(2).replace('.', ',')}€ (Pickup)</span>`;

    return `
        <div class="delivery-switch-container">
            <button type="button" class="${activeDeliveryClass}" onclick="toggleDeliveryOption(true)">Delivery</button>
            <button type="button" class="${activePickupClass}" onclick="toggleDeliveryOption(false)">Pickup</button>
        </div>
        <div class="basket-total-wrapper">
            <div class="total-row"><span>Subtotal</span><span>${subtotal.toFixed(2).replace('.', ',')}€</span></div>
            <div class="total-row"><span>Delivery fee</span>${deliveryRowHTML}</div>
            <div class="total-divider"></div>
            <div class="total-row total-bold"><span>Total</span><span>${total.toFixed(2).replace('.', ',')}€</span></div>
            <button type="button" class="btn-buy-now" onclick="checkoutOrder()">Buy now (${total.toFixed(2).replace('.', ',')}€)</button>
        </div>
    `;
}