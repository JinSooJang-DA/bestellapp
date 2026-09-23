let basket = [];

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
    renderDishes();
}

function renderBasket() {
    const basketContainer = document.getElementById('addedItems');
    const totalContainer = document.getElementById('basketTotal');
    const basketElement = document.querySelector('.basket');

    basketContainer.innerHTML = '';
    totalContainer.innerHTML = '';

    // 빈 바스켓일 때
    if (basket.length === 0) {
        if (basketElement) {
            basketElement.classList.add('is-empty');
        }
        basketContainer.innerHTML = `
            <div class="empty-basket-container">
                <p class="empty-basket-text">
                    Nothing here yet.<br>
                    Go ahead and choose something delicious!
                </p>
                <div class="empty-basket-icon">
                    <img src="./assets/icons/cart-big.svg" alt="Empty cart">
                </div>
            </div>
        `;
        return;
    }

    if (basketElement) {
        basketElement.classList.remove('is-empty');
    }

    // 아이템 계산 및 목록 생성
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        const itemTotalPrice = item.price * item.amount;
        subtotal += itemTotalPrice;

        basketContainer.innerHTML += getBasketItemTemplate(item, itemTotalPrice, i);
    }

    const deliveryFee = 4.99;
    const total = subtotal + deliveryFee;

    totalContainer.innerHTML = getBasketTotalTemplate(subtotal, deliveryFee, total);
}

// 1. 아이템 통째로 삭제 (휴지통)
function deleteBasketItem(index) {
    basket.splice(index, 1);
    renderBasket();
    renderDishes();
}

// 2. 수량 1개 감소 (-)
function decreaseAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1);
    }
    renderBasket();
    renderDishes();
}

// 3. 수량 1개 증가 (+)
function increaseAmount(index) {
    basket[index].amount++;
    renderBasket();
    renderDishes();
}