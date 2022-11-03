let order = {};
function loadCart() {
    // Перевіряю чи є в localstorage - cart
    if(localStorage.getItem('cart')) {
        // Якщо є - розшифровую і записую в змінну cart
        order = JSON.parse(localStorage.getItem('cart'))
        console.log(order)
        showCart();
    } else {
        $('.ordering-row').html('<div class="empty">Cart is empty</div>');
    }
}

function showCart() {
    if(!isEmpty(order)) {
        $('.ordering-row').html('<div class="empty">Cart is empty</div>');
    } else {
        $.getJSON('goods.json', function(data) {
            let goods = data;
            let out = '';
            let out2 = '';
            let sum = 0;
            for(let id in order) {
                sum += Math.round(order[id] * goods[id].cost)
                out += `<div class="products_row">`;
                out += `<div class="products_column column1">`
                out += `<img src="img/catalog/${goods[id].img}" alt="product">`
                out += `</div>`
                out += `<div class="products_column column2">`
                out += `<h2>${goods[id].name}</h2>`
                out += `</div>`
                out += `<div class="products_column column3">`
                out += `${order[id]}`
                out += `</div>`
                out += `<div class="products_column column4">`
                out += `$${Math.round(order[id] * goods[id].cost)}`
                out += `</div>`
                out += `</div>`
                out += `<hr>`
            }
            out2 += `<div class="final_price">`
            out2 += `<div class="final_price-row">`
            out2 += `<div class="final_price-column final1">Total</div>`
            out2 += `<div class="final_price-column final2">USD</div>`
            out2 += `<div class="final_price-column final3">$${sum}</div>`
            out2 += `</div>`
            out2 += `</div>`
            $('.ordering-row').html(out);
            $('.pricing').html(out2);
        })
    }
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