import { t } from "./translations.js";
let taskDetails = document.getElementById("taskDetails");
let todoTable = document.getElementById("todoList");
let doneTable = document.getElementById("doneList");
let subButton = document.getElementById("subButton");
let valModal = new bootstrap.Modal(document.getElementById("subModal"));
let loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
let allUsers = JSON.parse(localStorage.getItem("AllUsers"));
let todoTasks = loggedUser.tasks.todo;
let doneTasks = loggedUser.tasks.done;
let editIndex = null;
let container;

displayTodoTasks();
displayDoneTasks();

function saveTask() {
  if (validateName() == true) {
    let todoTask = taskDetails.value;
    loggedUser.tasks.todo.push(todoTask);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
    displayTodoTasks();
    clearForm();
  } else {
    valModal.show();
  }
}

function displayTodoTasks() {
  container = "";
  for (let i = 0; i < todoTasks.length; i++) {
    container += `<tr>
            <td>${i + 1}</td>
            <td>${todoTasks[i]}</td>
            <td>
            <button data-translate="home_table_edit" onclick="editTask(${i})" type="button" class="btn btn-primary visit-button">
            ${t("home_table_edit")}
            </button>
            </td>
            <td><button data-translate="home_table_delete" onclick="deleteTask(${i}, 'Todo')" type="button" class="btn btn-danger">
            ${t("home_table_delete")}
            </button></td>

            <td><button data-translate="home_table_done" onclick="taskDone(${i})" type="button" class="btn btn-success">
            ${t("home_table_done")}
            </button></td>
        </tr>`;
  }
  todoTable.innerHTML = container;
}

function displayDoneTasks() {
  container = "";
  for (let i = 0; i < doneTasks.length; i++) {
    container += `<tr>
            <td>${i + 1}</td>
            <td>${doneTasks[i]}</td>
            <td><button data-translate="home_table_delete" onclick="deleteTask(${i}, 'Done')" type="button" class="btn btn-danger">
            ${t("home_table_delete")}
            </button></td>
        </tr>`;
  }
  doneTable.innerHTML = container;
}

function taskDone(elementIndex) {
  doneTasks.push(todoTasks[elementIndex]);
  todoTasks.splice(elementIndex, 1);
  loggedUser.tasks.todo = todoTasks;
  loggedUser.tasks.done = doneTasks;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
  displayTodoTasks();
  displayDoneTasks();
}

function deleteTask(elementIndex, deleteRef) {
  if (deleteRef === "Todo") {
    todoTasks.splice(elementIndex, 1);
    loggedUser.tasks.todo = todoTasks;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
    displayTodoTasks();
  } else {
    doneTasks.splice(elementIndex, 1);
    loggedUser.tasks.done = doneTasks;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
    displayDoneTasks();
  }
}

function editTask(elementIndex) {
  taskDetails.value = todoTasks[elementIndex];
  editIndex = elementIndex;
  subButton.innerText = "Update";
  subButton.setAttribute("onclick", "updateTask()");
}

function updateTask() {
  if (validateName() == true) {
    todoTasks[editIndex] = taskDetails.value;
    loggedUser.tasks.todo = todoTasks;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
    displayTodoTasks();
    clearForm();
    subButton.innerText = "Submit";
    subButton.setAttribute("onclick", "saveTask()");
    editIndex = null;
  } else {
    valModal.show();
  }
}

function clearForm() {
  taskDetails.value = "";
}

function validateName() {
  let regex = /^[a-zA-Z0-9\s.,!?'-]{3,}$/;
  if (regex.test(taskDetails.value)) {
    return true;
  }
  return false;
}

let navBox = document.querySelector(".welcome-title");
let logoutButton = document.querySelector(".logout-btn");
logoutButton.addEventListener("click", function () {
  window.location.href = "index.html";
  for (let i = 0; i < allUsers.length; i++) {
    console.log(allUsers[i].userEmail);
    console.log(loggedUser.userEmail);

    if (allUsers[i].userEmail === loggedUser.userEmail) {
      allUsers[i] = loggedUser;
      localStorage.setItem("AllUsers", JSON.stringify(allUsers));
    }
  }
  localStorage.removeItem("loggedInUser");
});

window.editTask = editTask;
window.updateTask = updateTask;
window.deleteTask = deleteTask;
window.taskDone = taskDone;
window.saveTask = saveTask
