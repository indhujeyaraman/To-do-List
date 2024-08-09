const todoList = [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate, completed } = todoObject;
    const checked = completed ? "checked" : "";
    const completedClass = completed ? "completed" : "";

    const html = `
      <div class="todo-item">
        <input type="checkbox" class="checkbox js-complete-todo-button" ${checked}>
        <div class="todo-text ${completedClass}">${name} - ${dueDate}</div>
        <button class="delete-button js-delete-todo-button">Delete</button>
      </div>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });

  document
    .querySelectorAll(".js-complete-todo-button")
    .forEach((checkbox, index) => {
      checkbox.addEventListener("change", () => {
        todoList[index].completed = checkbox.checked;
        renderTodoList();
      });
    });
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-input");
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  if (name && dueDate) {
    todoList.push({
      name,
      dueDate,
      completed: false,
    });

    inputElement.value = "";
    dateInputElement.value = "";
    renderTodoList();
  } else {
    alert("Please enter both a name and a due date.");
  }
}
