let basket = [];
let overlayTimeout;

function renderDishes() {
    document.getElementById('burger-list').innerHTML = '';
    document.getElementById('pizza-list').innerHTML = '';
    document.getElementById('salad-list').innerHTML = '';

    for (let i = 0; i < myDishes.length; i++) {
        let menuItem = myDishes[i];
        let html = getMenuCardTemplate(menuItem, i);

        if (menuItem.category === "burger") {
            document.getElementById('burger-list').innerHTML += html;
        } else if (menuItem.category === "pizza") {
            document.getElementById('pizza-list').innerHTML += html;
        } else {
            document.getElementById('salad-list').innerHTML += html;
        }
    }
}

function addToBasket(index) {
    let selectedDish = myDishes[index];
    document.getElementById('basketWrapper').classList.remove('d-none');

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

    renderBasket();
    
    let basketItem = getBasketItem(selectedDish.name);
    let btn = document.getElementById(`menu-btn-${index}`);
    btn.classList.add('is-added');
    btn.innerText = `Added ${basketItem.amount}`;
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
    document.querySelector('.basket').classList.add('is-empty');
    document.getElementById('basketTotal').innerHTML = '';
    document.getElementById('addedItems').innerHTML = `
        <div class="empty-basket-container">
            <p class="empty-basket-text">Nothing here yet.<br>Go ahead and choose something delicious!</p>
            <div class="empty-basket-icon"><img src="./assets/icons/cart-big.svg" alt="Empty cart"></div>
        </div>
    `;
}

function showBasketItems() {
    document.querySelector('.basket').classList.remove('is-empty');
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

function checkoutOrder() {
    basket = [];
    renderBasket();
    renderDishes();

    if (window.innerWidth > 768) {
        document.getElementById('basketWrapper').classList.add('d-none');
    } else {
        closeMobileBasket(); 
    }

    document.getElementById('orderOverlay').classList.remove('d-none');

    clearTimeout(overlayTimeout);
    overlayTimeout = setTimeout(function() {
        closeOrderOverlay();
    }, 3000);
}

function closeOrderOverlay() {
    document.getElementById('orderOverlay').classList.add('d-none');
}

function openMobileBasket() {
    let basketWrapper = document.getElementById('basketWrapper');
    if (basketWrapper.classList.contains('is-open')) {
        closeMobileBasket();
        return;
    }
    basketWrapper.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeMobileBasket() {
    document.getElementById('basketWrapper').classList.remove('is-open');
    document.body.style.overflow = '';
}

function updateMobileCartBadge() {
    let badge = document.getElementById('mobileCartCount');
    let cartBtn = document.querySelector('.cart-nav-btn');
    let totalCount = 0;
    
    for (let i = 0; i < basket.length; i++) {
        totalCount += basket[i].amount;
    }

    if (totalCount > 0) {
        badge.innerText = totalCount;
        badge.classList.remove('d-none');
        cartBtn.classList.add('has-items');
    } else {
        badge.classList.add('d-none');
        cartBtn.classList.remove('has-items');
    }
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.body.style.overflow = ''; 
        document.getElementById('basketWrapper').classList.remove('is-open');
    }
});

function categoryMenu() {
    document.getElementById('nav-menu').classList.toggle('is-open');
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
});

function goToCategory(categoryId) {
    categoryMenu();
    document.getElementById(categoryId).scrollIntoView({ behavior: 'smooth' });
}