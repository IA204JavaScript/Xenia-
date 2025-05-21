export class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(title, status) {
    const newTask = {
      id: Date.now().toString(),
      title,
      status
    };
    this.tasks.push(newTask);
    this.save();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.save();
  }

  toggleStatus(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = task.status === 'в процессе' ? 'выполнено' : 'в процессе';
      this.save();
    }
  }

  getFilteredTasks(search, status) {
    return this.tasks.filter(task => {
      const matchSearch = task.title.toLowerCase().includes(search);
      const matchStatus = status === 'все' || task.status === status;
      return matchSearch && matchStatus;
    });
  }
}
