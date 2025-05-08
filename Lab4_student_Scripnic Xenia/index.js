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
