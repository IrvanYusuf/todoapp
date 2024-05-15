const btnTodo = document.getElementById("btn-todo");
const todoInput = document.getElementById("todo-input");
const todosValueContainer = document.getElementsByClassName(
  "todo-value-container"
)[0];

let db = [];

const createUniqueId = () => {
  return Date.now().toString();
};

const handleAddTodo = () => {
  if (todoInput.value === "") {
    return Toastify({
      text: "Tidak boleh kosong",
      gravity: "bottom",
      close: true,
      style: {
        background: "linear-gradient(to right, #e65554, #f56564)",
      },
    }).showToast();
  }
  const data = {
    id: createUniqueId(),
    todo: todoInput.value,
  };
  db.push(data);
  updateUiTodo();
  todoInput.value = "";
};

const updateUiTodo = () => {
  todosValueContainer.innerHTML = "";
  if (db.length === 0) {
    todosValueContainer.appendChild(emptyTaskTodo());
  } else {
    db.forEach((item) => {
      const todoElement = createListTodoElement(item);
      todosValueContainer.appendChild(todoElement);
    });
  }
};

const createListTodoElement = (item) => {
  if (item.todo !== "") {
    const div = document.createElement("div");
    div.className = "todo-value-list";

    const content = `
        <div>
            <input type="checkbox" name="todoCheck" id="todoCheck-${item.id}">
            <p class='todo-task-${item.id}'>${item.todo}</p>
        </div>
        <div>
          <button id="btn-edit-${item.id}" class="btn-edit">Edit</button>
          <button id="btn-delete-${item.id}" class="btn-delete">Hapus</button>
        </div>
    `;

    // Add event listener for the delete button
    div.innerHTML = content;

    const deleteButton = div.querySelector(`#btn-delete-${item.id}`);
    deleteButton.addEventListener("click", () => handleDeleteTodo(item.id));

    const editButton = div.querySelector(`#btn-edit-${item.id}`);
    editButton.addEventListener("click", () => handleEditTodo(item.id));

    const doneButton = div.querySelector(`#todoCheck-${item.id}`);
    doneButton.addEventListener("click", () => handleDoneTodo(item.id));
    return div;
  }
};

// delete todo
const handleDeleteTodo = (id) => {
  db = db.filter((value) => value.id !== id);
  updateUiTodo();
};

// finish todo
const handleDoneTodo = (id) => {
  const todoTask = document.querySelector(`.todo-task-${id}`);
  if (todoTask) {
    todoTask.classList.toggle("done");
  }
};

// edit todo
const handleEditTodo = (id) => {
  const todoTask = document.querySelector(`.todo-task-${id}`);
  const newTodo = prompt("Edit your todo", todoTask.textContent);
  if (newTodo) {
    db = db.map((item) => (item.id === id ? { ...item, todo: newTodo } : item));
    updateUiTodo();
  }
};

// empty task todo
const emptyTaskTodo = () => {
  const divEmpty = document.createElement("div");
  divEmpty.className = "empty";

  const content = `
  <img src="assets/animation/mochi-young-woman-tired-at-work.gif" alt="animation empty todo"
                        width="300px">
  <p>No Task Todo</p>
  `;

  divEmpty.innerHTML = content;
  return divEmpty;
};

btnTodo.addEventListener("click", handleAddTodo);

// dipanggil pertama kali
updateUiTodo();
