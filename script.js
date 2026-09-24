let basket = [];
let overlayTimeout = null;

// ==========================================
// 1. 기존 메뉴 렌더링 및 장바구니 조작 로직
// ==========================================
function renderDishes() {
    const burgerList = document.getElementById('burger-list');
    const pizzaList = document.getElementById('pizza-list');
    const saladList = document.getElementById('salad-list');

    burgerList.innerHTML = '';
    pizzaList.innerHTML = '';
    saladList.innerHTML = '';

    for (let i = 0; i < myDishes.length; i++) {
        const menuItem = myDishes[i];

        if (menuItem.category === "burger") {
            burgerList.innerHTML += getMenuCardTemplate(menuItem, i);
        } else if (menuItem.category === "pizza") {
            pizzaList.innerHTML += getMenuCardTemplate(menuItem, i);
        } else {
            saladList.innerHTML += getMenuCardTemplate(menuItem, i);
        }
    }
}

function addToBasket(index) {
    const selectedDish = myDishes[index];
    const basketWrapper = document.getElementById('basketWrapper');
    if (basketWrapper) {
        basketWrapper.classList.remove('d-none');
    }

    let itemIndex = -1;
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === selectedDish.name) {
            itemIndex = i;
            break;
        }
    }

    if (itemIndex === -1) {
        basket.push({
            name: selectedDish.name,
            price: selectedDish.price,
            amount: 1
        });
    } else {
        basket[itemIndex].amount++;
    }

    // 장바구니 영역 갱신
    renderBasket();
    
    // ★ 템플릿에 있는 getBasketItem 함수를 활용하여 클릭한 버튼만 업데이트
    const basketItem = getBasketItem(selectedDish.name);
    const count = basketItem ? basketItem.amount : 0;
    const btn = document.getElementById(`menu-btn-${index}`);
    
    if (btn) {
        btn.classList.add('is-added');
        btn.innerText = `Added ${count}`;
    }
}

function deleteBasketItem(index) {
    basket.splice(index, 1);
    renderBasket();
    renderDishes();
}

function decreaseAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1);
    }
    renderBasket();
    renderDishes();
}

function increaseAmount(index) {
    basket[index].amount++;
    renderBasket();
    renderDishes();
}


// ==========================================
// 2. 정리된 장바구니 화면 제어 로직
// ==========================================
let isDelivery = true; 

function toggleDeliveryOption(delivery) {
    isDelivery = delivery;
    renderBasket();
}

function renderBasket() {
    if (basket.length === 0) {
        showEmptyBasket();
    } else {
        showBasketItems();
        showReceipt();
    }
    updateMobileCartBadge();
}

function showEmptyBasket() {
    const basketElement = document.querySelector('.basket');
    if (basketElement) basketElement.classList.add('is-empty');
    
    document.getElementById('basketTotal').innerHTML = '';
    document.getElementById('addedItems').innerHTML = `
        <div class="empty-basket-container">
            <p class="empty-basket-text">Nothing here yet.<br>Go ahead and choose something delicious!</p>
            <div class="empty-basket-icon"><img src="./assets/icons/cart-big.svg" alt="Empty cart"></div>
        </div>
    `;
}

function showBasketItems() {
    const basketElement = document.querySelector('.basket');
    if (basketElement) basketElement.classList.remove('is-empty');
    
    let itemsHTML = '';
    for (let i = 0; i < basket.length; i++) {
        let item = basket[i];
        let itemTotalPrice = item.price * item.amount;
        itemsHTML += getBasketItemTemplate(item, itemTotalPrice, i);
    }
    document.getElementById('addedItems').innerHTML = itemsHTML;
}

function showReceipt() {
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount;
    }

    let deliveryFee = 4.99;
    let finalDeliveryFee = isDelivery ? deliveryFee : 0;
    let total = subtotal + finalDeliveryFee;

    document.getElementById('basketTotal').innerHTML = getBasketTotalTemplate(subtotal, deliveryFee, total);
}


// ==========================================
// 3. 결제 완료 모달 및 모바일 동작 로직
// ==========================================
function checkoutOrder() {
    const overlay = document.getElementById('orderOverlay');
    const basketWrapper = document.getElementById('basketWrapper');

    basket = [];
    renderBasket();
    renderDishes();

    if (window.innerWidth > 768) {
        if (basketWrapper) {
            basketWrapper.classList.add('d-none');
        }
    } else {
        closeMobileBasket(); 
    }

    if (overlay) {
        overlay.classList.remove('d-none');
    }

    if (overlayTimeout !== null) {
        clearTimeout(overlayTimeout);
    }

    overlayTimeout = setTimeout(function() {
        closeOrderOverlay();
    }, 3000);
}

function closeOrderOverlay() {
    const overlay = document.getElementById('orderOverlay');
    if (overlay) {
        overlay.classList.add('d-none');
    }
    
    if (overlayTimeout !== null) {
        clearTimeout(overlayTimeout);
        overlayTimeout = null;
    }
}

function openMobileBasket() {
    const basketWrapper = document.getElementById('basketWrapper');
    if (basketWrapper) {
        if (basketWrapper.classList.contains('is-open')) {
            closeMobileBasket();
            return;
        }
        basketWrapper.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileBasket() {
    const basketWrapper = document.getElementById('basketWrapper');
    if (basketWrapper) {
        basketWrapper.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

function updateMobileCartBadge() {
    const badge = document.getElementById('mobileCartCount');
    const cartBtn = document.querySelector('.cart-nav-btn');
    if (!badge) return;

    let totalCount = 0;
    for (let i = 0; i < basket.length; i++) {
        totalCount += basket[i].amount;
    }

    if (totalCount > 0) {
        badge.innerText = totalCount;
        badge.classList.remove('d-none');
        if (cartBtn) cartBtn.classList.add('has-items');
    } else {
        badge.classList.add('d-none');
        if (cartBtn) cartBtn.classList.remove('has-items');
    }
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.body.style.overflow = ''; 
        const basketWrapper = document.getElementById('basketWrapper');
        if (basketWrapper) {
            basketWrapper.classList.remove('is-open');
        }
    }
});