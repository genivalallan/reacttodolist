
export function UserTodos(userName) {
  if (!userName) return null;
  
  this.userName = userName;
  this.todos = [];
}

export function TodoList(listName, listDesc) {
  if (!listName) return null;

  this.listName = listName;
  this.description = listDesc;
  this.items = [];
  this.showCompleted = false;
}

export function TodoItem(description, done = false) {
  if (!description) return null;

  this.description = description;
  this.done = done;
}