export function renderTasks(tasks, manager) {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty">Нет задач</li>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task ${task.status}`;
    li.innerHTML = `
      <span>${task.title}</span>
      <div class="actions">
        <button class="toggle">${task.status === 'в процессе' ? '✔' : '↺'}</button>
        <button class="delete">✖</button>
      </div>
    `;

    li.querySelector('.toggle').addEventListener('click', () => {
      manager.toggleStatus(task.id);
      renderTasks(manager.getFilteredTasks('', 'все'), manager);
    });

    li.querySelector('.delete').addEventListener('click', () => {
      manager.deleteTask(task.id);
      renderTasks(manager.getFilteredTasks('', 'все'), manager);
    });

    list.appendChild(li);
  });
}
