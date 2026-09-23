function renderDishes() {
    // 1. 가져오기 및 비우기
    const burgerList = document.getElementById('burger-list');
    const pizzaList = document.getElementById('pizza-list');
    const saladList = document.getElementById('salad-list');

    burgerList.innerHTML = '';
    pizzaList.innerHTML = '';
    saladList.innerHTML = '';

    for (let i = 0; i < myDishes.length; i++) {
        const menuItem = myDishes[i];

        if (menuItem.category === "burger") {
            // template.js의 템플릿 함수를 호출해서 꽂아주면 코드가 훨씬 깔끔해집니다!
            burgerList.innerHTML += getMenuCardTemplate(menuItem, i);
        } else if (menuItem.category === "pizza") {
            pizzaList.innerHTML += getMenuCardTemplate(menuItem, i);
        } else {
            saladList.innerHTML += getMenuCardTemplate(menuItem, i);
        }
    }
}
