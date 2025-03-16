# Отчет по лабораторной работе №2: Основы работы с массивами, функциями и объектами в JavaScript
## Описание
Этот проект представляет собой консольное приложение для анализа транзакций с использованием JavaScript. В нем реализованы различные функции для работы с массивом транзакций, позволяющие выполнять такие операции, как фильтрация транзакций по типу, расчет общей суммы, нахождение транзакций в определенном диапазоне дат и многое другое.

## Цель работы
Целью данной лабораторной работы является изучение основ работы с массивами, функциями и объектами в JavaScript, а также применение этих знаний для анализа транзакций.

## Структура проекта
Проект состоит из одного JavaScript-файла, который реализует все необходимые функции для анализа транзакций. 

# Шаги выполнения:

### Шаг 1: Создание массива транзакций
Создан массив объектов с транзакциями, каждый объект включает следующие поля:
- `transaction_id`: уникальный идентификатор транзакции.
- `transaction_date`: дата транзакции.
- `transaction_amount`: сумма транзакции.
- `transaction_type`: тип транзакции (debit или credit).
- `transaction_description`: описание транзакции.
- `merchant_name`: название магазина или сервиса.
- `card_type`: тип карты (кредитная или дебетовая).

Пример массива транзакций:

```javascript
const transactions = [
    {
      transaction_id: 1,
      transaction_date: '2025-03-15',
      transaction_amount: 1000,
      transaction_type: 'debit',
      transaction_description: 'Purchase at Shop A',
      merchant_name: 'Shop A',
      card_type: 'debit'
    },
    {
      transaction_id: 2,
      transaction_date: '2025-03-15',
      transaction_amount: 500,
      transaction_type: 'credit',
      transaction_description: 'Refund from Shop B',
      merchant_name: 'Shop B',
      card_type: 'credit'
    },
    {
      transaction_id: 3,
      transaction_date: '2025-03-14',
      transaction_amount: 300,
      transaction_type: 'debit',
      transaction_description: 'Purchase at Shop C',
      merchant_name: 'Shop C',
      card_type: 'debit'
    },
    {
      transaction_id: 4,
      transaction_date: '2025-03-12',
      transaction_amount: 700,
      transaction_type: 'credit',
      transaction_description: 'Refund from Shop D',
      merchant_name: 'Shop D',
      card_type: 'credit'
    }
];
````

### Шаг 2: Реализация функций для анализа транзакций

**Функции:**

1. **getUniqueTransactionTypes(transactions)**
   //Возвращает массив уникальных типов транзакций.
   Эта функция принимает массив транзакций и возвращает массив уникальных типов транзакций. Она использует метод `map`, чтобы извлечь типы транзакций, и `Set`, чтобы удалить повторения.
   Используйте Set() для выполнения задания
   ````javascript
    function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
     }
     ````
2. **calculateTotalAmount(transactions)**
   //Вычисляет общую сумму всех транзакций.
   Функция суммирует все значения `transaction_amount` в массиве транзакций с использованием метода `reduce`. Начальное значение суммы равно 0.
   ````javascript
    function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
   }
   ````
3. **calculateTotalAmountByDate(transactions, year, month, day)**
   //Вычисляет сумму транзакций за указанный год, месяц и день.
   Функция фильтрует транзакции по году, месяцу и/или дню, если они переданы в качестве аргументов. Затем она суммирует соответствующие транзакции.
   ````javascript
   function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(transaction => {
      const date = new Date(transaction.transaction_date);
      const isSameYear = !year || date.getFullYear() === year;
      const isSameMonth = !month || date.getMonth() + 1 === month;
      const isSameDay = !day || date.getDate() === day;
      return isSameYear && isSameMonth && isSameDay;
    }).reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
   }
   ````

4. **getTransactionByType(transactions, type)**
   //Возвращает транзакции указанного типа (debit или credit).
   Эта функция фильтрует транзакции по переданному типу, например, `debit` или `credit`.
   ````javacript
   function getTransactionByType(transactions, type) {
   return transactions.filter(t => t.transaction_type === type);
   }
   ```` 


5. **getTransactionsInDateRange(transactions, startDate, endDate)**
   //Возвращает транзакции, совершенные в указанном диапазоне дат.
   Функция фильтрует транзакции, проверяя, попадают ли их даты в указанный диапазон (между `startDate` и `endDate`).
   ````javascript
   function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
    }
    ````
6. **getTransactionsByMerchant(transactions, merchantName)**
   //Возвращает транзакции для указанного магазина.
   Функция фильтрует транзакции по имени магазина, например, `Техномир`.
   ````javascript
   function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
   }
   ````
7. **calculateAverageTransactionAmount(transactions)**
   //Возвращает среднюю сумму транзакций.
   Эта функция вычисляет среднее значение транзакций, деля общую сумму на количество транзакций.
   ````javascript
    function calculateAverageTransactionAmount(transactions) {
    return transactions.length > 0
    ? calculateTotalAmount(transactions) / transactions.length
    : 0;
    }
    ````
8. **getTransactionsByAmountRange(transactions, minAmount, maxAmount)**
   //Возвращает транзакции, сумма которых в указанном диапазоне.
   Функция фильтрует транзакции, сумма которых находится в заданном диапазоне (`minAmount` - `maxAmount`).
   ````javascript
    function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
   }
   ````

9. **calculateTotalDebitAmount(transactions)**
   //Вычисляет сумму дебетовых транзакций.
   Функция фильтрует дебетовые транзакции и суммирует их суммы.
   ````javascript
   function calculateTotalDebitAmount(transactions) {
    return transactions.filter(t => t.transaction_type === 'debit')
      .reduce((sum, t) => sum + t.transaction_amount, 0);
    }
   ````

10. **findMostTransactionsMonth(transactions)**
    //Возвращает месяц с наибольшим количеством транзакций.
    Функция подсчитывает количество транзакций для каждого месяца и возвращает месяц с наибольшим количеством транзакций.
    ````javascript
    function findMostTransactionsMonth(transactions) {
    const monthsCount = transactions.reduce((acc, t) => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    const mostMonth = Object.entries(monthsCount).reduce((a, b) => (a[1] > b[1] ? a : b));
    return mostMonth[0];
    }
    ````


11. **findMostDebitTransactionMonth(transactions)**
    //Возвращает месяц с наибольшим количеством дебетовых транзакций.
    Функция работает аналогично предыдущей, но фильтрует только дебетовые транзакции.
    ````javascript
    function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = transactions.filter(t => t.transaction_type === 'debit');
    return findMostTransactionsMonth(debitTransactions);
    }
    ````

12. **mostTransactionTypes(transactions)**
    //Определяет, каких транзакций больше: дебетовых или кредитных.
    Функция подсчитывает количество дебетовых и кредитных транзакций и возвращает тип транзакций, которых больше.
    ````javascript
    function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(t => t.transaction_type === 'debit').length;
    const creditCount = transactions.filter(t => t.transaction_type === 'credit').length;
    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
    }
    ````

13. **getTransactionsBeforeDate(transactions, date)**
    //Возвращает транзакции до указанной даты.
    Эта функция фильтрует транзакции, даты которых предшествуют указанной.
    ````javascript
    function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
    }
    ````

14. **findTransactionById(transactions, id)**
    //Возвращает транзакцию по уникальному идентификатору.
    Функция возвращает транзакцию, идентификатор которой совпадает с переданным `id`.
    ````javascript
    function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
    }
    ````

15. **mapTransactionDescriptions(transactions)**
    //Возвращает массив описаний транзакций.
    Функция возвращает массив описаний всех транзакций.
    ````javascript
    function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
    }
    ````

### Шаг 3: Тестирование функций

Тестирование функций с использованием массива транзакций:

````javascript
console.log("Уникальные типы транзакций: ", getUniqueTransactionTypes(transactions)); 
console.log("Общая сумма всех транзакций: ", calculateTotalAmount(transactions)); 
console.log("Общая сумма транзакций за 2025-03-15: ", calculateTotalAmountByDate(transactions, 2025, 3, 15)); 
console.log("Дебетовые транзакции: ", getTransactionByType(transactions, 'debit')); 
console.log("Транзакции с 2025-03-14 по 2025-03-15: ", getTransactionsInDateRange(transactions, '2025-03-14', '2025-03-15')); 
console.log("Транзакции в магазине Shop A: ", getTransactionsByMerchant(transactions, 'Shop A')); 
console.log("Средняя сумма транзакций: ", calculateAverageTransactionAmount(transactions)); 
console.log("Транзакции в диапазоне суммы (100 до 700): ", getTransactionsByAmountRange(transactions, 100, 700)); 
console.log("Общая сумма дебетовых транзакций: ", calculateTotalDebitAmount(transactions)); 
console.log("Месяц с наибольшим количеством транзакций: ", findMostTransactionsMonth(transactions)); 
console.log("Месяц с наибольшим количеством дебетовых транзакций: ", findMostDebitTransactionMonth(transactions)); 
console.log("Частота транзакций: ", mostTransactionTypes(transactions)); 
console.log("Транзакции до 2025-03-15: ", getTransactionsBeforeDate(transactions, '2025-03-15')); 
console.log("Транзакция с ID 2: ", findTransactionById(transactions, 2)); 
console.log("Описания транзакций: ", mapTransactionDescriptions(transactions)); 
````

### Дополнительные задания

Тестирование функций на пустом массиве транзакций:
````javascript
console.log("\nТестирование с массивом из одной транзакции:");
console.log("Уникальные типы транзакций: ", getUniqueTransactionTypes(singleTransaction)); // Функция 1
console.log("Общая сумма всех транзакций: ", calculateTotalAmount(singleTransaction)); // Функция 2
console.log("Общая сумма транзакций за 2025-03-15: ", calculateTotalAmountByDate(singleTransaction, 2025, 3, 15)); // Функция 3
console.log("Дебетовые транзакции: ", getTransactionByType(singleTransaction, 'debit')); // Функция 4
console.log("Транзакции с 2025-03-14 по 2025-03-15: ", getTransactionsInDateRange(singleTransaction, '2025-03-14', '2025-03-15')); // Функция 5
console.log("Транзакции в магазине Shop A: ", getTransactionsByMerchant(singleTransaction, 'Shop A')); // Функция 6
console.log("Средняя сумма транзакций: ", calculateAverageTransactionAmount(singleTransaction)); // Функция 7
````

Тестирование функций на массиве транзакций с одной транзакцией:
````javascript
console.log("\nТестирование с пустым массивом транзакций:");
console.log("Уникальные типы транзакций: ", getUniqueTransactionTypes(emptyTransactions)); // Функция 1
console.log("Общая сумма всех транзакций: ", calculateTotalAmount(emptyTransactions)); // Функция 2
console.log("Общая сумма транзакций за 2025-03-15: ", calculateTotalAmountByDate(emptyTransactions, 2025, 3, 15)); // Функция 3
console.log("Дебетовые транзакции: ", getTransactionByType(emptyTransactions, 'debit')); // Функция 4
console.log("Транзакции с 2025-03-14 по 2025-03-15: ", getTransactionsInDateRange(emptyTransactions, '2025-03-14', '2025-03-15')); // Функция 5
console.log("Транзакции в магазине Shop A: ", getTransactionsByMerchant(emptyTransactions, 'Shop A')); // Функция 6
console.log("Средняя сумма транзакций: ", calculateAverageTransactionAmount(emptyTransactions)); // Функция 7
````

## Вывод

В ходе выполнения лабораторной работы были реализованы функции для анализа транзакций, с использованием различных методов обработки массивов и работы с объектами. Функции позволяют:
- фильтровать данные по типу транзакции, магазину, диапазону дат и сумме.
- вычислять общие суммы транзакций и средние значения.
- находить транзакции по уникальному идентификатору и описаниям.

Функции были протестированы на различных примерах, что позволило подтвердить их корректность.

