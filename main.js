let textFrom = document.getElementById("text-form");
let checkBox = document.getElementById("form");
let taskss = document.getElementById("tasks");
let clear = document.getElementById("clear");
let t = document.getElementById("task");
let items = document.getElementById("items");
let menu = document.querySelectorAll("#links li");
let list = document.querySelector("#links");

let moon = document.getElementById("moon");
let sun = document.getElementById("sun");
let text;
let taskArray = [];
if (localStorage.getItem("tasks")) {
  taskArray = JSON.parse(localStorage.getItem("tasks"));
}
localData();
theme()
function getValue(textFrom, check) {
  checkBox.addEventListener("click", function () {
    if (check.checked) {
      if (!textFrom.value == "") {
        const task = {
          id: Date.now(),
          text: textFrom.value,
          completed: false,
        };
        taskss.innerHTML = "";
        console.log(JSON.stringify(taskArray));
        taskArray.push(task);
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        location.reload();
        theme();
      }
    }
  });
}
getValue(textFrom, checkBox);
taskss.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    updateStatus(e.target.id);
    e.target.parentElement.classList.toggle("done");
  }
});
function addToPage(arr) {
  arr.forEach((task) => {
    text = task.text;
    let div = document.createElement("div");
    div.className = "task";
    div.id = "task";
    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = task.id;
    input.className = "rounded-full";
    if (task.completed == true) {
      div.className = "task done";
      input.checked = true;
    }
    let label = document.createElement("label");
    label.setAttribute("for", task.id);
    label.innerHTML = text;
    div.appendChild(input);
    div.appendChild(label);
    taskss.appendChild(div);
    items.innerHTML = `${taskArray.length} items`;
  });
}
function localData() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let final = JSON.parse(data);
    addToPage(final);
  }
}
function updateStatus(taskId) {
  for (i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == taskId) {
      taskArray[i].completed == false
        ? (taskArray[i].completed = true)
        : (taskArray[i].completed = false);
    }
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }
}
clear.addEventListener("click", () => {
  taskArray = taskArray.filter((task) => task.completed == false);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  location.reload();
});
list.addEventListener("click", (e) => {
  menu.forEach((li) => {
    li.classList.remove("active");
  });
  e.target.classList.add("active");
  let compTask = [];
  let active = [];
  for (i = 0; i < taskArray.length; i++) {
    if (e.target.id === "completed") {
      if (taskArray[i].completed == true) {
        taskss.innerHTML = "";
        compTask.push(taskArray[i]);
        addToPage(compTask);
      } else {
        taskss.innerHTML = "";
        let nothing = document.createElement("span");
        nothing.className = "nothing";
        let text = document.createTextNode("Complete a Task To Show");
        nothing.appendChild(text);
        taskss.appendChild(nothing);
      }
    } else if (e.target.id === "active") {
      if (taskArray[i].completed == false) {
        taskss.innerHTML = "";
        active.push(taskArray[i]);
        addToPage(active);
      }
    } else if (e.target.id === "all") {
      taskss.innerHTML = "";
      addToPage(taskArray);
    }
  }
});
function theme(){
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  moon.addEventListener("click", () => {
    localStorage.theme === 'dark'
    localStorage.setItem("theme","dark")
    document.documentElement.classList.add('dark')
  });
  sun.addEventListener("click", () => {
    localStorage.theme === 'light'
    document.documentElement.classList.remove('dark')
    localStorage.setItem("theme","light")
  });
}

