# Лабораторная работа №4. Работа с DOM-деревом и событиями в JavaScript

## Цель работы

Ознакомиться с основами взаимодействия JavaScript с DOM-деревом на примере веб-приложения для учёта личных финансов.

---

## Структура проекта

```

├── index.html         // Главная HTML-страница
├── style.css          // Стили

    ├── index.js       // Главный JS-файл
    ├── transactions.js // Работа с массивом транзакций
    ├── ui.js          // Работа с DOM
    └── utils.js       // Вспомогательные функции
```

---

## Функционал

### ➤ Представление транзакции

Каждая транзакция содержит:
- `id`: уникальный идентификатор
- `date`: дата и время
- `amount`: сумма
- `category`: категория (выбирается из списка)
- `description`: полное описание

### ➤ Отображение транзакций

- Таблица со столбцами: Дата и Время, Категория, Описание (сокращённое), Удаление
- Цвет строки:
  - Зелёный — положительная сумма
  - Красный — отрицательная сумма

### ➤ Добавление транзакций

- Через форму (input + select)
- Валидация формы на заполненность и корректность данных

### ➤ Удаление транзакций

- Кнопка "Удалить" в каждой строке
- Делегирование событий: слушатель вешается на `<table>`

### ➤ Подсчёт суммы

- Функция `calculateTotal()` вычисляет сумму всех транзакций
- Общая сумма отображается под таблицей

### ➤ Полное описание

- При клике на строку отображается полное описание транзакции ниже таблицы

---

## Пример транзакции (JavaScript)

```js
{
  id: 'abc123',
  date: '2025-05-08 12:30',
  amount: -120,
  category: 'Transport',
  description: 'Оплата проезда в метро и маршрутке'
}
```

---

## Документирование кода

Код снабжен комментариями в формате JSDoc. Пример:

```js
/**
 * Добавляет транзакцию в таблицу и в массив данных.
 * @param {Object} transaction - объект транзакции
 */
function addTransaction(transaction) { ... }
```
## Код index.html
```html

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Финансовый учёт</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Учёт личных финансов</h1>

  <!-- Форма добавления транзакции -->
  <form id="transaction-form">
    <input type="number" id="amount" placeholder="Сумма" required />
    <select id="category" required>
      <option value="" disabled selected>Категория</option>
      <option value="Доход">Доход</option>
      <option value="Продукты">Продукты</option>
      <option value="Транспорт">Транспорт</option>
      <option value="Прочее">Прочее</option>
    </select>
    <input type="text" id="description" placeholder="Описание" required />
    <button type="submit">Добавить</button>
  </form>

  <!-- Общая сумма -->
  <h2>Итоговая сумма: <span id="total">0</span> lei</h2>

  <!-- Таблица -->
  <table id="transactions-table" border="1">
    <thead>
      <tr>
        <th>Дата и Время</th>
        <th>Категория</th>
        <th>Описание</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <!-- Полное описание -->
  <div id="full-description"></div>

  <script type="module" src="index.js"></script>
</body>
</html>

```
## Код style.css
```css
body {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  input, select, button {
    margin-right: 10px;
  }
  
  .green {
    background-color: #d4edda;
  }
  
  .red {
    background-color: #f8d7da;
  }
  
  #full-description {
    margin-top: 20px;
    font-weight: bold;
  }
  ```

## Код index.js
```js
import { addTransaction, transactions } from './transactions.js';
import { renderTransaction, updateTotal, showFullDescription } from './ui.js';

const form = document.getElementById('transaction-form');
const table = document.getElementById('transactions-table').querySelector('tbody');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  const transaction = addTransaction(amount, category, description);
  renderTransaction(transaction);
  updateTotal();
  form.reset();
});

table.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    const row = e.target.closest('tr');
    row.remove();
    const index = transactions.findIndex((t) => t.id === id);
    if (index !== -1) transactions.splice(index, 1);
    updateTotal();
  } else if (e.target.tagName === 'TD') {
    const row = e.target.closest('tr');
    const id = row.dataset.id;
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) showFullDescription(transaction.description);
  }
});
```
## Код utils.js
```js
export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  export function formatDate(date) {
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
```
## Код transactions.js
```js
import { generateId } from './utils.js';

export const transactions = [];

export function addTransaction(amount, category, description) {
  const transaction = {
    id: generateId(),
    date: new Date(),
    amount,
    category,
    description
  };

  transactions.push(transaction);
  return transaction;
}
```
## Код ui.js
```js
import { formatDate } from './utils.js';
import { transactions } from './transactions.js';

const tableBody = document.querySelector('#transactions-table tbody');
const totalElement = document.getElementById('total');
const fullDescriptionBlock = document.getElementById('full-description');

export function renderTransaction(transaction) {
  const row = document.createElement('tr');
  row.dataset.id = transaction.id;

  const dateCell = document.createElement('td');
  dateCell.textContent = formatDate(transaction.date);

  const categoryCell = document.createElement('td');
  categoryCell.textContent = transaction.category;

  const shortDescription = transaction.description.split(' ').slice(0, 4).join(' ');
  const descCell = document.createElement('td');
  descCell.textContent = shortDescription;

  const actionCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.dataset.id = transaction.id;
  actionCell.appendChild(deleteBtn);

  row.appendChild(dateCell);
  row.appendChild(categoryCell);
  row.appendChild(descCell);
  row.appendChild(actionCell);

  row.classList.add(transaction.amount >= 0 ? 'green' : 'red');

  tableBody.appendChild(row);
}

export function updateTotal() {
  const total = transactions.reduce((sum, t) => sum += t.amount, 0);
  totalElement.textContent = total.toFixed(2);
}

export function showFullDescription(text) {
  fullDescriptionBlock.textContent = `Полное описание: ${text}`;
}
```

## Контрольные вопросы

**1. Как получить доступ к элементу на веб-странице?**  
Методы: `getElementById`, `querySelector`, `getElementsByClassName`, и др.

**2. Что такое делегирование событий?**  
Это приём, при котором обработчик события добавляется на родительский элемент, чтобы обрабатывать события от дочерних элементов.

**3. Как изменить содержимое DOM-элемента?**  
С помощью `textContent`, `innerHTML`, `value` и других свойств.

**4. Как добавить элемент в DOM?**  
Использовать `document.createElement()` и методы вставки: `appendChild`, `prepend`, `insertBefore`.

---

## Заключение

В результате лабораторной работы реализовано веб-приложение, позволяющее добавлять, отображать, удалять и анализировать транзакции. Были освоены навыки взаимодействия с DOM, управления событиями, работы с модулями и валидацией форм.

Приложение может служить основой для более сложных систем учёта финансов.
