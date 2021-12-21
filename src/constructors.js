
export function UserTodos(userName) {
  this.userName = userName;
  this.todos = [];
}

export function TodoList(listName) {
  if (!listName) return false;

  this.listName = listName;
  this.items = [];
  this.showCompleted = false;

  return true;
}

export function TodoItem(title, description, done = false) {
  if (!title || !description) return false;

  this.title = title;
  this.description = description;
  this.done = done;

  return true;
}