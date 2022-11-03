let cart = {};
function init() {
    // Вивід товару на сторінку
    $.getJSON("goods.json", goodsOut);
}
function goodsOut(data){
    // Вивід на сторінку
    console.log(data)
    let out = '';
    for(let key in data) {
        out += `<div class="products_column">`;
        out += `<a href="product.html" data-id="${key}" class="products_pic"><img src="img/catalog/${data[key].img}" alt="Picture"></a>`
        out += `<p class="products_name">${data[key].name} <span class="products_description">(${data[key].description})</span></p>`
        out += `<p class="products_price">$${data[key].cost}</p>`
        out += `<button data-id="${key}" type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">Add to Cart</button>`;
        out += `</div>`;
    }
    $('.products_row').html(out);
    $('.btn-dark').on('click', addToCart);
    $('.products_pic').on('click', getProductID);
    $('.products_pic').on('auxclick', getProductID);
}
function getProductID() {
    let productID = $(this).attr('data-id');
    localStorage.setItem('productID', productID);
}
function addToCart() {
    // Дабавляємо товар в корзину
    let id = $(this).attr('data-id');
    if(cart[id] == undefined) {
        cart[id] = 1; // Якщо в корзині немає такого товару - робимо = 1
    } else {
        cart[id]++; // Якщо такий товар вже є, збільшую на 1
    }
    saveCart();
}

function saveCart() {
    // Зберігаємо корзину в localstorage
    localStorage.setItem('cart', JSON.stringify(cart)); // Обєкт корзина в рядок
}

function loadCart() {
    // Перевіряю чи є в localstorage - cart
    if(localStorage.getItem('cart')) {
        // Якщо є - розшифровую і записую в змінну cart
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    console.log(cart)
}
$(document).ready(function() {
    init();
    loadCart();
})
