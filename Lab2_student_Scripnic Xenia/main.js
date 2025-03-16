// Массив транзакций для тестирования
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
  
  /**
   * Функция 1: Возвращает массив уникальных типов транзакций.
   *
   * @param {Array} transactions - Массив транзакций, каждая из которых имеет поле `transaction_type`.
   * @returns {Array} Массив уникальных типов транзакций.
   */
  function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
  }
  
  /**
   * Функция 2: Вычисляет сумму всех транзакций.
   *
   * @param {Array} transactions - Массив транзакций, каждая из которых имеет поле `transaction_amount`.
   * @returns {number} Сумма всех транзакций.
   */
  function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
  }
  
  /**
   * Функция 3: [extra] Вычисляет сумму транзакций по году, месяцу и дню.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {number} [year] - Год для фильтрации транзакций (опционально).
   * @param {number} [month] - Месяц для фильтрации транзакций (опционально).
   * @param {number} [day] - День для фильтрации транзакций (опционально).
   * @returns {number} Сумма транзакций за указанный период.
   */
  function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(transaction => {
      const date = new Date(transaction.transaction_date);
      const isSameYear = !year || date.getFullYear() === year;
      const isSameMonth = !month || date.getMonth() + 1 === month;
      const isSameDay = !day || date.getDate() === day;
      return isSameYear && isSameMonth && isSameDay;
    }).reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
  }
  
  /**
   * Функция 4: Возвращает транзакции указанного типа.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {string} type - Тип транзакции (например, "debit" или "credit").
   * @returns {Array} Массив транзакций указанного типа.
   */
  function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
  }
  
  /**
   * Функция 5: Возвращает транзакции в указанном диапазоне дат.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {string} startDate - Начальная дата диапазона в формате "YYYY-MM-DD".
   * @param {string} endDate - Конечная дата диапазона в формате "YYYY-MM-DD".
   * @returns {Array} Массив транзакций, совершенных в указанном диапазоне.
   */
  function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  }
  
  /**
   * Функция 6: Возвращает транзакции по названию магазина.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {string} merchantName - Название магазина для фильтрации транзакций.
   * @returns {Array} Массив транзакций для указанного магазина.
   */
  function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
  }
  
  /**
   * Функция 7: Вычисляет среднее значение суммы транзакций.
   *
   * @param {Array} transactions - Массив транзакций.
   * @returns {number} Среднее значение суммы транзакций.
   */
  function calculateAverageTransactionAmount(transactions) {
    return transactions.length > 0
      ? calculateTotalAmount(transactions) / transactions.length
      : 0;
  }
  
  /**
   * Функция 8: Возвращает транзакции по диапазону суммы.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {number} minAmount - Минимальная сумма для фильтрации.
   * @param {number} maxAmount - Максимальная сумма для фильтрации.
   * @returns {Array} Массив транзакций с суммой в заданном диапазоне.
   */
  function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
  }
  
  /**
   * Функция 9: Вычисляет общую сумму дебетовых транзакций.
   *
   * @param {Array} transactions - Массив транзакций.
   * @returns {number} Сумма дебетовых транзакций.
   */
  function calculateTotalDebitAmount(transactions) {
    return transactions.filter(t => t.transaction_type === 'debit')
      .reduce((sum, t) => sum + t.transaction_amount, 0);
  }
  
  /**
   * Функция 10: Возвращает месяц с наибольшим количеством транзакций.
   *
   * @param {Array} transactions - Массив транзакций.
   * @returns {number} Месяц с наибольшим количеством транзакций.
   */
  function findMostTransactionsMonth(transactions) {
    const monthsCount = transactions.reduce((acc, t) => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    const mostMonth = Object.entries(monthsCount).reduce((a, b) => (a[1] > b[1] ? a : b));
    return mostMonth[0];
  }
  
  /**
   * Функция 11: Возвращает месяц с наибольшим количеством дебетовых транзакций.
   *
   * @param {Array} transactions - Массив транзакций.
   * @returns {number} Месяц с наибольшим количеством дебетовых транзакций.
   */
  function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = transactions.filter(t => t.transaction_type === 'debit');
    return findMostTransactionsMonth(debitTransactions);
  }
  
  /**
   * Функция 12: Определяет, каких транзакций больше — дебетовых или кредитных.
   *
   * @param {Array} transactions - Массив транзакций.
   * @returns {string} Тип транзакции, который встречается чаще: "debit", "credit" или "equal", если их количество одинаково.
   */
  function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(t => t.transaction_type === 'debit').length;
    const creditCount = transactions.filter(t => t.transaction_type === 'credit').length;
    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
  }
  
  /**
   * Функция 13: Возвращает транзакции до указанной даты.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {string} date - Дата в формате "YYYY-MM-DD", до которой должны быть возвращены транзакции.
   * @returns {Array} Массив транзакций, произошедших до указанной даты.
   */
  function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
  }
  
  /**
   * Функция 14: Возвращает транзакцию по уникальному идентификатору.
   *
   * @param {Array} transactions - Массив транзакций.
   * @param {number} id - Уникальный идентификатор транзакции.
   * @returns {Object|undefined} Транзакция с указанным идентификатором или `undefined`, если транзакция не найдена.
   */
  function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
  }
  
  /**
   * Функция 15: Возвращает массив описаний транзакций.
   *
   * @param {Array} transactions - Массив транзакций.
   * @returns {Array} Массив строк, каждая из которых — описание транзакции.
   */
  function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
  }
  
  // Тестирование функций с массивом транзакций
  console.log("Уникальные типы транзакций: ", getUniqueTransactionTypes(transactions)); // Функция 1
  console.log("Общая сумма всех транзакций: ", calculateTotalAmount(transactions)); // Функция 2
  console.log("Общая сумма транзакций за 2025-03-15: ", calculateTotalAmountByDate(transactions, 2025, 3, 15)); // Функция 3
  console.log("Дебетовые транзакции: ", getTransactionByType(transactions, 'debit')); // Функция 4
  console.log("Транзакции с 2025-03-14 по 2025-03-15: ", getTransactionsInDateRange(transactions, '2025-03-14', '2025-03-15')); // Функция 5
  console.log("Транзакции в магазине Shop A: ", getTransactionsByMerchant(transactions, 'Shop A')); // Функция 6
  console.log("Средняя сумма транзакций: ", calculateAverageTransactionAmount(transactions)); // Функция 7
  console.log("Транзакции в диапазоне суммы (100 до 700): ", getTransactionsByAmountRange(transactions, 100, 700)); // Функция 8
  console.log("Общая сумма дебетовых транзакций: ", calculateTotalDebitAmount(transactions)); // Функция 9
  console.log("Месяц с наибольшим количеством транзакций: ", findMostTransactionsMonth(transactions)); // Функция 10
  console.log("Месяц с наибольшим количеством дебетовых транзакций: ", findMostDebitTransactionMonth(transactions)); // Функция 11
  console.log("Частота транзакций: ", mostTransactionTypes(transactions)); // Функция 12
  console.log("Транзакции до 2025-03-15: ", getTransactionsBeforeDate(transactions, '2025-03-15')); // Функция 13
  console.log("Транзакция с ID 2: ", findTransactionById(transactions, 2)); // Функция 14
  console.log("Описания транзакций: ", mapTransactionDescriptions(transactions)); // Функция 15

  // Тестирование с массивом из одной транзакции
  console.log("\nТестирование с массивом из одной транзакции:");
  console.log("Уникальные типы транзакций: ", getUniqueTransactionTypes(singleTransaction)); // Функция 1
  console.log("Общая сумма всех транзакций: ", calculateTotalAmount(singleTransaction)); // Функция 2
  console.log("Общая сумма транзакций за 2025-03-15: ", calculateTotalAmountByDate(singleTransaction, 2025, 3, 15)); // Функция 3
  console.log("Дебетовые транзакции: ", getTransactionByType(singleTransaction, 'debit')); // Функция 4
  console.log("Транзакции с 2025-03-14 по 2025-03-15: ", getTransactionsInDateRange(singleTransaction, '2025-03-14', '2025-03-15')); // Функция 5
  console.log("Транзакции в магазине Shop A: ", getTransactionsByMerchant(singleTransaction, 'Shop A')); // Функция 6
  console.log("Средняя сумма транзакций: ", calculateAverageTransactionAmount(singleTransaction)); // Функция 7

  // Тестирование с пустым массивом транзакций
  console.log("\nТестирование с пустым массивом транзакций:");
  console.log("Уникальные типы транзакций: ", getUniqueTransactionTypes(emptyTransactions)); // Функция 1
  console.log("Общая сумма всех транзакций: ", calculateTotalAmount(emptyTransactions)); // Функция 2
  console.log("Общая сумма транзакций за 2025-03-15: ", calculateTotalAmountByDate(emptyTransactions, 2025, 3, 15)); // Функция 3
  console.log("Дебетовые транзакции: ", getTransactionByType(emptyTransactions, 'debit')); // Функция 4
  console.log("Транзакции с 2025-03-14 по 2025-03-15: ", getTransactionsInDateRange(emptyTransactions, '2025-03-14', '2025-03-15')); // Функция 5
  console.log("Транзакции в магазине Shop A: ", getTransactionsByMerchant(emptyTransactions, 'Shop A')); // Функция 6
  console.log("Средняя сумма транзакций: ", calculateAverageTransactionAmount(emptyTransactions)); // Функция 7