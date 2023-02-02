function renderTemplate(burger, i) {

    return `
    <div class="menuRow">
        <div class="menuDish">
            <div><span class="menuFood">${burger["name"]}</span><img src="./icons/info-2-64.png" alt="Info"></div>
            <img onclick="addMenuToBasket(${i})" class="menuAddButton" src="./icons/plus-8-64.png" alt="Hinzufügen">
        </div>
        <span>${burger["toppings"]}</span>
        <span style="font-size: 13px">${burger["additions"]}</span>
        <span class="menuPrice">${burger["price"].toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}€</span>
    </div>`
}

function renderBasketTemplate(i, sum) {
    return `
    <div class="addBasket">

        <div>
            <span><b>${amounts[i]}</b></span>
            <span class="addBasketMenuSpan"><u><b>${menus[i]}</b></u></span>
        </div>
        <span>${sum.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}€</span>
    </div>
    <div class="positionPlusMinus text-bold underline">
        <img onclick="deleteMealBasket(${i})" class="plusMinusButtonMenu" src="./icons/minus-2-64.png">
        <img onclick="addMealBasket(${i})" class="plusMinusButtonMenu" src="./icons/plus-8-64.png">
    </div>
    </div>`
}

function calculateBasketTemplate() {
    return `
    <div id="basketSumTotal" class="basketSumTotal">
        <div class="basketSumRow">
            <span>Zwischensumme</span>
            <span>${calculateSubtotal()}€</span>
        </div>
        <div class="basketSumRow">
            <span>Lieferkosten</span>
            <span>${deliveryCosts()}</span>
        </div>
        <div class="basketSumRow">
            <span><b>Gesamt</b></span>
            <span id="sumTotalBasket"><b>${calculateSumTotal()}€</b></span>
        </div>
    </div>
    <div id="orderButtonContainer" class="orderButtonContainer">
        <span onclick="pay()" class="orderButton"><b>Bezahlen (${calculateSumTotal()} €)</b></span>
    </div>`
}

function shoppingResponsiveTemplate() {
    return `
    <div class="shoppingBasketBoxResponsive">
        <div onclick="openBasketResponsive()" class="shoppingBasketButtonResponsive">
            <img src="./icons/cart-12-64-white.png" alt="Warenkorb">
            <span>Warenkorb (${calculateSumTotal()} €)</span>
        </div>
    </div>`
}