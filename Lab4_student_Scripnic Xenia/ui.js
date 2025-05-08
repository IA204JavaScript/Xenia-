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
