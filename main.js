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
theme();
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
  }else if(e.target.tagName === "IMG"){
    e.target.parentElement.remove()
    deletedata(e.target.id)
  }
});
function addToPage(arr) {
  arr.forEach((task) => {
    text = task.text;
    const div = document.createElement("div");
    div.className = "task";
    div.id = "task";
    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = task.id;
    input.className = "rounded-full";
    let label = document.createElement("label");
    let image = document.createElement("img");
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper"
    if (task.completed == true) {
      wrapper.className = "wrapper done";
      input.checked = true;
    }
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.id = "task";
    label.setAttribute("for", task.id);
    label.innerHTML = text;
    wrapper.appendChild(input);
    wrapper.appendChild(label);
    div.appendChild(wrapper);
    image.setAttribute("src", "./images/icon-cross.svg");
    image.id = task.id;
    image.style.opacity = "0";
    image.style.transition = "0.3s";
    image.style.cursor = "pointer";
    div.appendChild(image);
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
function theme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  moon.addEventListener("click", () => {
    localStorage.theme === "dark";
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  });
  sun.addEventListener("click", () => {
    localStorage.theme === "light";
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  });
}
// window.onload = function style(task){
//   let opacity = 0
//   task.style.opacity = "0"
//   setInterval(() => {

//   }, );
// }
function deletedata(taskId) {
  taskArray = taskArray.filter((item) => item.id != taskId);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}
