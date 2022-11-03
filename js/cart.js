let cart = {};
function loadCart() {
    // Перевіряю чи є в localstorage - cart
    if(localStorage.getItem('cart')) {
        // Якщо є - розшифровую і записую в змінну cart
        cart = JSON.parse(localStorage.getItem('cart'))
        showCart();
    } else {
        $('.cart_goods').html('<div class="empty">Cart is empty</div>');
    }
}

function showCart() {
    if(!isEmpty(cart)) {
        $('.cart_goods').html('<div class="empty">Cart is empty</div>');
    } else {
        $.getJSON('goods.json', function(data) {
            let goods = data;
            let out = '';
            let sum = 0;
            for(let id in cart) {
                sum += Math.round(cart[id] * goods[id].cost)
                out += `<div class="cart_products">`;
                out += `<div class="products_row">`;
                out += `<button data-id="${id}" style="font-size: 23px;" class="del-goods">X</button>`
                out += `<div class="products_column item1">`;
                out += `<img src="img/catalog/${goods[id].img}" alt="product" width="200px">`;
                out += `</div>`;
                out += `<div class="products_column item2">`
                out += `<h2>${goods[id].name}</h2>`
                out += `</div>`
                out += `<div class="products_column item3">`
                out += `<button data-id="${id}" style="font-size: 23px;" class="minus-goods">-</button>`
                out += `${cart[id]}`
                out += `<button data-id="${id}" style="font-size: 23px;" class="plus-goods">+</button>`
                out += `</div>`
                out += `<div class="products_column item4">`
                out += `$${Math.round(cart[id] * goods[id].cost)}`
                out += `</div>`
                out += `</div>`
                out += `</div>`
            }
            out += `<div class="subtotal_row">`
            out += `<div class="subtotal_title">Subtotal</div>`
            out += `<div class="subtotal_price">$${sum}</div>`
            out += `</div>`
            $('.cart_goods').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        })
    }
} 

function delGoods() {
    // Видаляємо товар з корзини
    let id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusGoods() {
    // Добавляємо кількість товару в корзину
    let id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    // Віднімаємо кількість товару з корзини
    let id = $(this).attr('data-id');
    if(cart[id] == 1){
        delete cart[id]
    }else{
       cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    // Зберігаємо корзину в localstorage
    localStorage.setItem('cart', JSON.stringify(cart)); // Обєкт корзина в рядок
}

function isEmpty(object) {
    // Перевірка корзини на пустоту
    for (let key in object)
    if(object.hasOwnProperty(key)) return true;
    return false;
}

$(document).ready(function() {
    loadCart();
})
