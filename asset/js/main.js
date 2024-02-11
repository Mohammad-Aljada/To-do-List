const formlist = document.querySelector(".formTask");
formlist.onsubmit = addTask;
let tasks = [];
function addTask(e) {
  e.preventDefault();
  let task = {};
  task.value = document.querySelector(".formTask .input").value;
  task.isChecked = false;
  tasks.push(task);
  setdataFromLocalstorage();
  if (!task) return alert("Please enter a task");
  e.target.reset();
  printData();
}
function printData() {
  let result = "";
  let data = getdataFromLocalStorage();
  result += data
    .map(function (task) {
      return `
      <div class="task-group">
          <li class="task">
        <input type="checkbox"  name="checkbox" class="checkbox" ${
          task.isChecked ? "checked" : ""
        }/>
        <span class="task-title ${
          task.isChecked ? "line" : ""
        }">${task.value}</span>
        </li>
        <button class="btn-deleteTask">Delete</button>
      </div>
    
        `;
    })
    .join(" ");
  document.querySelector(".TasksList").innerHTML = result;
  addline();
  deleteTask();
}
function addline() {
  let getdata = getdataFromLocalStorage();
  const li = document.querySelectorAll(".task");
  const check = document.querySelectorAll('.task input[type="checkbox"]');
  for (let i = 0; i < check.length; i++) {
    check[i].onclick = function (e) {
      if (check[i].checked == true) {
        tasks[i].isChecked = true;
        check[i].nextElementSibling.classList.add("line");
        li[i].classList.add("success-checked");
        li[i].classList.remove("task");
      } else {
        check[i].nextElementSibling.classList.remove("line");
        li[i].classList.remove("success-checked");
        li[i].classList.add("task");
      }
    };
  }
}
function getdataFromLocalStorage() {
  let getdata = localStorage.getItem("tasks");
  let data = JSON.parse(getdata);
  return data;
}
function setdataFromLocalstorage() {
  let setdata = JSON.stringify(tasks);
  localStorage.setItem("tasks", setdata);
}
function deleteTask() {
  let getdata = getdataFromLocalStorage();
  const btn = document.querySelectorAll(".task-group .btn-deleteTask");
  for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = function (e) {
      btn[i].closest(".task-group").remove();
      tasks.splice(i, 1);
      setdataFromLocalstorage();
    };
  }
}
printData();
