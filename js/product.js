let cart = {};
function loadProduct() {
    // Перевіряю чи є в localstorage - productID
    if(localStorage.getItem('productID')) {
        // Якщо є - розшифровую і записую в змінну cart
        current = localStorage.getItem('productID')
        showProduct();
    }
}
function showProduct() {
    $.getJSON('goods.json', function(data) {
        let product = data;
        let out = '';
        let outName = '';
        let outButton =  '';
        out += `<img src="img/catalog/${product[current].img}" alt="Picture">`;
        out += ``;
        outName += `<div class="product_name">${product[current].name}</div>`;
        outName += `<div class="product_color">${product[current].description}</div>`
        outName += `<div class="product_price"><span class="through">$36</span> $${product[current].cost}</div>`;
        outName += `<div class="product_rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>`;
        outButton += `<button data-id="${current}" type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">Add to Cart</button>`;
        $('.product_img').html(out);
        $('.product_info-top').html(outName);
        $('.product_button').html(outButton);
        $('.btn-dark').on('click', addToCart);
    })
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

function loadCart() {
    // Перевіряю чи є в localstorage - cart
    if(localStorage.getItem('cart')) {
        // Якщо є - розшифровую і записую в змінну cart
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    console.log(cart)
}

function saveCart() {
    // Зберігаємо корзину в localstorage
    localStorage.setItem('cart', JSON.stringify(cart)); // Обєкт корзина в рядок
}

$(document).ready(function() {
    loadProduct();
    loadCart();
})