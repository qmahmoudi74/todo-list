const appInput = document.getElementById("app-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

const todos = [];

function getNewTodoElement(todo) {
  const newTodoElement = document.createElement("li");

  newTodoElement.classList.add("todo");

  newTodoElement.innerHTML = `
    <div class="todo-tick" style="visibility: ${
      todo.isDone ? "visible" : "hidden"
    }">✅</div>

    <p class="todo-title" onclick="setIsTodoDone('${
      todo.id
    }', ${!todo.isDone})" style="text-decoration:${
    todo.isDone ? "line-through" : "none"
  };">${todo.title}</p>

    <button class="remove-todo" onclick="removeTodo('${todo.id}')">✕</button>
  `;

  return newTodoElement;
}

function updateTodoList() {
  const todoElements = todos.map(getNewTodoElement);
  todoList.replaceChildren(...todoElements, emptyState);
  emptyState.hidden = todos.length !== 0;
}

function addNewTodo(givenTitle) {
  todos.push({
    title: givenTitle,
    id: crypto.randomUUID(),
    isDone: false
  });
  updateTodoList();
}

function removeTodo(givenId) {
  const todoIndex = todos.findIndex(({ id }) => givenId === id);
  todos.splice(todoIndex, 1);
  updateTodoList();
}

function setIsTodoDone(givenId, givenIsDone) {
  const todo = todos.find(({ id }) => givenId === id);
  todo.isDone = givenIsDone;
  updateTodoList();
}

addButton.addEventListener("click", () => {
  if (!appInput.value) return;
  addNewTodo(appInput.value);
  appInput.value = "";
});
