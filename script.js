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
    console.log('클릭한 아이템 인덱스:', index);
}