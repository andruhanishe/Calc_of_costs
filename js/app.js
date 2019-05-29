import {Purchase} from "./lib.js";
import {findMostExpensivePurchase, findMostExpensiveCategory} from "./lib.js";
import {calculateTotal, countPurchases} from "./lib.js";
import {grouping} from "./lib.js";


//------------привязка к id элементов на странице------------------
const inputNameEl = document.getElementById('name');
const inputCategoryEl = document.getElementById('category');
const inputPriceEl = document.getElementById('price');
const buttonEl = document.getElementById('add');
const itemsEl = document.getElementById('items');
const mostPurchaseEl = document.getElementById('most_exp_pur');
const mostCategoryEl = document.getElementById('most_exp_cat');
const totalSumEl = document.getElementById('totalSum');
const totalCountEl = document.getElementById('totalCount');

//------------создаем нужные блоки на странице------------------
let purchases = [];
const mostExpPurCol_1 = document.createElement('div');
const mostExpPurCol_2 = document.createElement('div');
const mostExpPurCol_3 = document.createElement('div');

const mostExpCatCol_1 = document.createElement('div');
const mostExpCatCol_2 = document.createElement('div');

const totalSumCol_1 = document.createElement('div');
const totalSumCol_2 = document.createElement('div');

const totalCountCol_1 = document.createElement('div');
const totalCountCol_2 = document.createElement('div');

//------------добавление новой покупки в список по клику------------------
buttonEl.addEventListener("click", () => {
    const nameOfPurchase = inputNameEl.value;
    const categoryOfPurchase = inputCategoryEl.value;
    const priceOfPurchase = Number(inputPriceEl.value);
    purchases.push(new Purchase(nameOfPurchase, categoryOfPurchase, priceOfPurchase));

    const itemEl = document.createElement('li');
    const itemElCol_1 = document.createElement('div');
    itemEl.appendChild(itemElCol_1);
    itemElCol_1.className = 'col-3 d-inline-block';
    const itemElCol_2 = document.createElement('div');
    itemEl.appendChild(itemElCol_2);
    itemElCol_2.className = 'col-5 d-inline-block';
    const itemElCol_3 = document.createElement('div');
    itemEl.appendChild(itemElCol_3);
    itemElCol_3.className = 'col-3 d-inline-block';
    const itemElCol_4 = document.createElement('div');
    itemEl.appendChild(itemElCol_4);
    itemElCol_4.className = 'col-1 d-inline-block';

    itemElCol_1.textContent = nameOfPurchase;
    itemElCol_2.textContent = categoryOfPurchase;
    itemElCol_3.textContent = priceOfPurchase;

    itemEl.className = 'row list-group-item';
    itemsEl.appendChild(itemEl);

//------------находим самую дорогую покупку--------------------
    mostPurchaseEl.appendChild(mostExpPurCol_1);
    mostExpPurCol_1.className = 'col-3 d-inline-block';
    mostPurchaseEl.appendChild(mostExpPurCol_2);
    mostExpPurCol_2.className = 'col-5 d-inline-block';
    mostPurchaseEl.appendChild(mostExpPurCol_3);
    mostExpPurCol_3.className = 'col-3 d-inline-block';

    let mostExpPurchase = findMostExpensivePurchase(purchases);
    mostExpPurCol_1.textContent = mostExpPurchase.name;
    mostExpPurCol_2.textContent = mostExpPurchase.category;
    mostExpPurCol_3.textContent = mostExpPurchase.price;

//-------------находим самую дорогую категорию----------------------------
    mostCategoryEl.appendChild(mostExpCatCol_1);
    mostExpCatCol_1.className = 'col-8 d-inline-block';
    mostCategoryEl.appendChild(mostExpCatCol_2);
    mostExpCatCol_2.className = 'col-4 d-inline-block';

    let groups = grouping(purchases);
    let mostExpCategory = findMostExpensiveCategory(groups);
    mostExpCatCol_1.textContent = mostExpCategory.category;
    mostExpCatCol_2.textContent = mostExpCategory.sum;

//-------------счет общей суммы и количества покупок----------------------
    totalSumCol_1.className = 'col-8 d-inline-block';
    totalSumCol_1.textContent = 'Total';
    totalSumEl.appendChild(totalSumCol_1);

    totalSumCol_2.className = 'col-4 d-inline-block';
    totalSumCol_2.textContent = calculateTotal(purchases);
    totalSumEl.appendChild(totalSumCol_2);

    totalCountCol_1.className = 'col-8 d-inline-block';
    totalCountCol_1.textContent = 'Count';
    totalCountEl.appendChild(totalCountCol_1);

    totalCountCol_2.className = 'col-4 d-inline-block';
    totalCountCol_2.textContent = countPurchases(purchases);
    totalCountEl.appendChild(totalCountCol_2);


//-------------удаление элементов----------------------
    const removeEl = document.createElement('button');
    removeEl.className = 'btn btn-danger btn-sm';
    removeEl.textContent = 'X';
    itemElCol_4.appendChild(removeEl);

    removeEl.addEventListener('click', () => {

        const parent = document.getElementById("items");
        const target = itemEl;


        let index;
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === target)
                index = i;}

        purchases.splice(index, 1);

        if (purchases.length !== 0) {
            mostExpPurchase = findMostExpensivePurchase(purchases);
            mostExpPurCol_1.textContent = mostExpPurchase.name;
            mostExpPurCol_2.textContent = mostExpPurchase.category;
            mostExpPurCol_3.textContent = mostExpPurchase.price;

            groups = grouping(purchases);
            mostExpCategory = findMostExpensiveCategory(groups);
            mostExpCatCol_1.textContent = mostExpCategory.category;
            mostExpCatCol_2.textContent = mostExpCategory.sum;

            totalSumCol_2.textContent = calculateTotal(purchases);
            totalCountCol_2.textContent = countPurchases(purchases);
        }
        else {
            mostExpPurCol_1.textContent = '';
            mostExpPurCol_2.textContent = '';
            mostExpPurCol_3.textContent = '';

            mostExpCatCol_1.textContent = '';
            mostExpCatCol_2.textContent = '';

            totalSumCol_2.textContent = '';
            totalCountCol_2.textContent = '';

        }

        itemsEl.removeChild(itemEl);

        console.log(purchases);
    });


//-------------очищаем поля ввода----------------------
    inputNameEl.value = '';
    inputPriceEl.value = '';
    inputCategoryEl.value = '';

});

