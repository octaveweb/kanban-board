import "./style.css"
const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");

const column = [todo, progress, done]

let dragElement = null;

const tasks = document.querySelectorAll(".task")


tasks.forEach((task, idx) => {
  task.addEventListener("drag", (e) => {
    dragElement = task
  })
})


function dragEventOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over")
  })
  column.addEventListener("dragleave", (e) => {
    column.classList.remove("hover-over")
    e.preventDefault();
  })

  column.addEventListener("dragover", (e)=>{
    e.preventDefault();
  })

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement)
    column.classList.remove("hover-over")

  })
}
dragEventOnColumn(todo)
dragEventOnColumn(progress)
dragEventOnColumn(done)








const toggleModal = document.getElementById("togle-modal");
const modal = document.getElementById("modal");

let inputTitel = document.getElementById("title").value;
let inputDecription = document.getElementById("decription").value ;
let addTaskButton = document.getElementById("add-task-btn") 
  console.log(inputTitel, inputDecription);



toggleModal.addEventListener("click",()=>{
  if(!modal.classList.contains("active")){
    modal.classList.add("active")
  }
})
 modal.addEventListener("click", (e)=>{
   if(e.target.className === "bg"){
       modal.classList.remove("active")

   }
   
})

addTaskButton.addEventListener("click",()=>{
  console.log(inputTitel, inputDecription);

})