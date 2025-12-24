const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const total = document.getElementById("total");
const done = document.getElementById("done");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
  list.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
      completed++;
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <span onclick="toggle(${index})">✅</span>
        <span onclick="edit(${index})">🖋️</span>
        <span onclick="removeTask(${index})">❌</span>
      </div>
    `;
    list.appendChild(li);
  });

  total.textContent = tasks.length;
  done.textContent = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  if (input.value === "") return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  render();
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  render();
}

function edit(i) {
  const newText = prompt("Edit task", tasks[i].text);
  if (newText) {
    tasks[i].text = newText;
    render();
  }
}

function removeTask(i) {
  tasks.splice(i, 1);
  render();
}

document.getElementById("addBtn").onclick = addTask;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

render();
