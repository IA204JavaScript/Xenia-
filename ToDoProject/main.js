import { TaskManager } from './taskManager.js';
import { renderTasks } from './ui.js';

const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskStatus = document.getElementById('task-status');
const searchInput = document.getElementById('search');
const filterStatus = document.getElementById('filter-status');

const manager = new TaskManager();

function updateUI() {
  const search = searchInput.value.toLowerCase();
  const status = filterStatus.value;
  const filtered = manager.getFilteredTasks(search, status);
  renderTasks(filtered, manager);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  const status = taskStatus.value;
  if (title) {
    manager.addTask(title, status);
    taskInput.value = '';
    updateUI();
  }
});

searchInput.addEventListener('input', updateUI);
filterStatus.addEventListener('change', updateUI);

updateUI();
