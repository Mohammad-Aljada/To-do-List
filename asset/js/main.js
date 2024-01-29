const formlist = document.querySelector(".formTask");
formlist.onsubmit = addTask;
let tasks = [];
function addTask(e) {
  e.preventDefault();
  let task = {};

  task.value = document.querySelector(".formTask .input").value;
  task.isChecked = false;
  tasks.push(task);
  if (!task) return alert("Please enter a task");

  printData(e);
}

function printData(e) {
  let result = "";

  result += tasks
    .map(function (task) {
      return `
        <li class="task">
        <input type="checkbox"  name="checkbox" class="checkbox" ${
          task.isChecked ? "checked" : ""
        }/>
        <span class="task-title ${
          task.isChecked ? "line" : ""
        }">${task.value}</span>
        </li>
        
        `;
    })
    .join(" ");

  document.querySelector(".TasksList").innerHTML = result;
  e.target.reset();
  addline();
}
function addline() {
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
