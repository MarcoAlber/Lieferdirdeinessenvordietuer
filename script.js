load();

window.onscroll = function () {
    var shoppingBasket = document.getElementById('shoppingBasket');
    var moveUp = document.getElementById('moveUp')
    if (window.pageYOffset > 72) {
        shoppingBasket.classList.add("shoppingBasketScroll");
        moveUp.classList.remove("dp-none");
    } else {
        shoppingBasket.classList.remove("shoppingBasketScroll");
        moveUp.classList.add("dp-none");
    }
}

function moveUp() {
    window.location = '#';
}

function render() {
    let menuRow = document.getElementById('menuRow');
    let heart = document.getElementById('heart');

    heart.innerHTML = `${heartButton()}`;
    menuRow.innerHTML = '';

    for (let i = 0; i < burgers.length; i++) {
        const burger = burgers[i];
        menuRow.innerHTML += renderTemplate(burger, i);
    }
    shoppingButtonResponsive();
    renderBasket();
}

function addMenuToBasket(i) {
    let menu = burgers[i].name;
    let price = burgers[i].price;
    let index = menus.indexOf(menu);
    if (index == -1) {
        menus.push(menu);
        prices.push(price);
        amounts.push(1);
    } else {
        amounts[index]++;
    }
    shoppingButtonResponsive();
    renderBasket();
    save();
}

function renderBasket() {
    let basket = document.getElementById('shoppingBasketAdd');
    basket.innerHTML = '';
    for (let i = 0; i < menus.length; i++) {
        let sum = sumMeals(i);
        basket.innerHTML += renderBasketTemplate(i, sum);
    }
    if (menus.length > 0) {
        document.getElementById('emptyBasket').classList.add('dp-none');
        basket.innerHTML += calculateBasketTemplate();
    }
    else {
        document.getElementById('emptyBasket').classList.remove('dp-none');
    }
}

function sumMeals(i) {
    let sum = prices[i] * amounts[i];
    return sum.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function sidePrice(i) {
    let sidePrice = sumMeals(i) + sumMeals(i);
    return sidePrice.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function addMealBasket(i) {
    amounts[i]++;
    shoppingButtonResponsive();
    renderBasket();
    save();
}

function deleteMealBasket(i) {
    amounts[i]--;
    if (amounts[i] == 0) {
        amounts.splice(i, 1);
        menus.splice(i, 1);
        prices.splice(i, 1);
    }
    shoppingButtonResponsive();
    renderBasket();
    save();
}

function calculateSubtotal() {
    subtotal = 0;
    for (let i = 0; i < menus.length; i++) {
        /*subtotal = subtotal + (prices[i] * amounts[i]);*/
        subtotal += (prices[i] * amounts[i]);
    }
    return subtotal.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function calculateSumTotal() {
    sumTotal = 0;
    for (let i = 0; i < menus.length; i++) {
        /*sumTotal = sumTotal + (prices[i] * amounts[i]);*/
        sumTotal += (prices[i] * amounts[i]);
    }
    if (sumTotal <= 35) {
        sumTotal = sumTotal + 5.99;
        return sumTotal.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
    else {
        sumTotal;
        return sumTotal.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
}

function deliveryCosts() {
    sumTotal = 0;
    for (let i = 0; i < menus.length; i++) {
        /*sumTotal = sumTotal + (prices[i] * amounts[i]);*/
        sumTotal += (prices[i] * amounts[i]);
    }
    if (sumTotal <= 35) {
        return 5.99.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '€';
    }
    else { return 'Kostenlos'; }
}

function heartButton() {
    if (heart == true) {
        return `<img style="background-color: rgba(211, 211, 211, 0.404)" onclick="removeLike()" src="./icons/favorite-3-64-red.png">`
    }
    else {
        return `<img onclick="addLike()" src="./icons/favorite-3-64.png">`
    }
}

function addLike() {
    heart = true;
    render();
    save();
}

function removeLike() {
    heart = false;
    render();
    save();
}

function shoppingButtonResponsive() {
    let shoppingBasketRes = document.getElementById('shoppingBasketResponsive');

    if (menus <= [0]) {
        shoppingBasketRes.classList.add('dp-none');
    }
    else {
        shoppingBasketRes.classList.remove('dp-none');
        shoppingBasketRes.innerHTML = shoppingResponsiveTemplate();
    }
}

function openBasketResponsive() {
    let shoppingBasket = document.getElementById('shoppingBasket');
    let header = document.getElementById('header');
    let mainContent = document.getElementById('mainContent');
    let menuRow = document.getElementById('menuRow');
    let closeHeaderBasket = document.getElementById('closeHeaderBasket');

    shoppingBasket.classList.remove('shoppingBasket');
    mainContent.classList.add('dp-none');
    menuRow.classList.add('dp-none');
    header.classList.add('dp-none');
    shoppingBasket.classList.add('shoppingBasketOpen');
    closeHeaderBasket.classList.remove('dp-none');
}

function closeBasketResponsive() {
    let shoppingBasket = document.getElementById('shoppingBasket');
    let header = document.getElementById('header');
    let mainContent = document.getElementById('mainContent');
    let menuRow = document.getElementById('menuRow');
    let closeHeaderBasket = document.getElementById('closeHeaderBasket');

    shoppingBasket.classList.add('shoppingBasket');
    mainContent.classList.remove('dp-none');
    menuRow.classList.remove('dp-none');
    header.classList.remove('dp-none');
    shoppingBasket.classList.remove('shoppingBasketOpen');
    closeHeaderBasket.classList.add('dp-none');
}

function pay() {
    menus = [];
    prices = [];
    amounts = [];

    alert("Deine Bestellung ist unterwegs.");
    window.location.href = "../lieferdirdeinessenvordietuer/index.html";

    render();
    save();
}


function save() {
    let menusASText = JSON.stringify(menus);
    let pricesASText = JSON.stringify(prices);
    let amountsASText = JSON.stringify(amounts);
    let heartASText = JSON.stringify(heart);
    localStorage.setItem('menusASText', menusASText);
    localStorage.setItem('pricesASText', pricesASText);
    localStorage.setItem('amountsASText', amountsASText);
    localStorage.setItem('heartASText', heartASText);
}

function load() {
    let menusASText = localStorage.getItem('menusASText');
    let pricesASText = localStorage.getItem('pricesASText');
    let amountsASText = localStorage.getItem('amountsASText');
    let heartASText = localStorage.getItem('heartASText');
    if (menusASText && pricesASText && amountsASText && heartASText) {
        menus = JSON.parse(menusASText);
        prices = JSON.parse(pricesASText);
        amounts = JSON.parse(amountsASText);
        heart = JSON.parse(heartASText);
    }
}