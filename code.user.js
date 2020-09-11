// ==UserScript==
// @name         On+ Paid Days
// @namespace    on+_paid_days
// @version      1.0
// @description  Подсчёт количества дней с оплаченным интернетом
// @author       Alexandr Stankovich
// @match        https://stat.onplus.ru/*
// @grant        none
// ==/UserScript==

(function() {
    let balance = document.querySelector('tr:nth-child(4) > td.boxline.green').innerHTML; // Текущий баланс
    let request = new XMLHttpRequest(); // Объект запроса

    request.open('GET', 'https://stat.onplus.ru/?tact=info/services', true); // Запрос на страницу услуг on+
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) { // Если запрос завершён и ответ получен...
            let sentDOM = new DOMParser().parseFromString(request.responseText, 'text/html'), // Получение элементов со страницы услуг on+
                cost = sentDOM.querySelector('tr.boxline > td:nth-child(1)').innerHTML, // Нахождение цены за тариф
                paidDays = Math.ceil(balance.replace(',', '.')/cost.replace(',', '.')*30); // Рассчёт количества оплаченных дней

            document.querySelector('tr:nth-child(4) > td.boxline.green').innerHTML = balance + ' (дней с интернетом: ' + paidDays + ', включая этот)';
        }
    };
    request.send(null);
})();