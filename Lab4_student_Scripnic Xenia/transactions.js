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
