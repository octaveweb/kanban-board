import "./style.css"

const todo = document.getElementById("todo")
const progress = document.getElementById("progress")
const done = document.getElementById("done")

const columns = [todo, progress, done]

const toggleModal = document.getElementById("togle-modal")
const modal = document.getElementById("modal")
const addTaskButton = document.getElementById("add-task-btn")

let dragElement = null
let editTarget = null

let taskData = JSON.parse(localStorage.getItem("taskData")) || {
  todo: [],
  progress: [],
  done: []
}

function saveToLocalStorage() {
  localStorage.setItem("taskData", JSON.stringify(taskData))
}

function updateData() {
  columns.forEach(col => {
    taskData[col.id] = Array.from(col.querySelectorAll(".task")).map(t => ({
      title: t.querySelector(".task-title").innerText,
      desc: t.querySelector(".task-dec").innerText
    }))
  })
}

function createTaskElement(title, desc) {

  const task = document.createElement("div")
  task.className = "task"
  task.draggable = true

  task.innerHTML = `
    <h1 class="task-title">${title}</h1>
    <h2 class="task-dec">${desc}</h2>
    <div class="btn-contener">
      <div class="btn edit">Edit</div>
      <div class="btn delete">Delete</div>
    </div>
  `

  task.addEventListener("dragstart", () => {
    dragElement = task
  })

  task.querySelector(".delete").addEventListener("click", () => {
    task.remove()
    updateData()
    saveToLocalStorage()
  })

  task.querySelector(".edit").addEventListener("click", () => {

    editTarget = task

    const t = task.querySelector(".task-title").innerText
    const d = task.querySelector(".task-dec").innerText

    document.getElementById("title").value = t
    document.getElementById("decription").value = d

    addTaskButton.innerText = "Update"

    modal.classList.add("active")
  })

  return task
}

function loadTasks() {
  columns.forEach(col => {
    col.innerHTML = ""
    taskData[col.id].forEach(t => {
      const task = createTaskElement(t.title, t.desc)
      col.appendChild(task)
    })
  })
}

columns.forEach(column => {

  column.addEventListener("dragover", e => {
    e.preventDefault()
  })

  column.addEventListener("dragenter", e => {
    e.preventDefault()
    column.classList.add("hover-over")
  })

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over")
  })

  column.addEventListener("drop", e => {
    e.preventDefault()
    column.appendChild(dragElement)
    column.classList.remove("hover-over")
    updateData()
    saveToLocalStorage()
  })

})

toggleModal.addEventListener("click", () => {
  modal.classList.add("active")
})

modal.addEventListener("click", e => {
  if (e.target.className === "bg") {
    resetModal()
  }
})

addTaskButton.addEventListener("click", () => {

  const title = document.getElementById("title").value
  const desc = document.getElementById("decription").value

  if (!title || !desc) return

  if (editTarget) {

    editTarget.querySelector(".task-title").innerText = title
    editTarget.querySelector(".task-dec").innerText = desc

    editTarget = null
    addTaskButton.innerText = "Add Task"

  } else {

    const task = createTaskElement(title, desc)
    todo.appendChild(task)

  }

  updateData()
  saveToLocalStorage()

  resetModal()
})

function resetModal() {
  modal.classList.remove("active")
  document.getElementById("title").value = ""
  document.getElementById("decription").value = ""
  editTarget = null
  addTaskButton.innerText = "Add Task"
}

loadTasks()