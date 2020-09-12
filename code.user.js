// ==UserScript==
// @name         On+ Paid Days
// @namespace    on+_paid_days
// @version      1.0
// @description  Подсчёт количества оплаченных дней на сайте провайдера ОнПлюс
// @author       Alexandr Stankovich
// @match        https://stat.onplus.ru/*
// @grant        none
// ==/UserScript==

(function() {
    let balance = document.querySelector('tr:nth-child(4) > td.boxline.green').innerHTML;
    let request = new XMLHttpRequest();

    request.open('GET', 'https://stat.onplus.ru/?tact=info/services', true);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let parser = new DOMParser(),
                sentDOM = parser.parseFromString(request.responseText, 'text/html'),
                cost = sentDOM.querySelector('tr.boxline > td:nth-child(1)').innerHTML,
                paidDays = Math.ceil(balance.replace(',', '.')/cost.replace(',', '.')*30);

            document.querySelector('tr:nth-child(4) > td.boxline.green').innerHTML = balance + ' (дней с интернетом: ' + paidDays + ', включая этот)';
        }
    };
    request.send(null);
})();
