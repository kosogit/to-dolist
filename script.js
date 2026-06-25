document.addEventListener('DOMContentLoaded',()=>{
const inputbox = document.getElementById("typebox")
const btn = document.getElementById("btn")
const ulist = document.getElementById("to-dolist")

let task = JSON.parse(localStorage.getItem("task"))|| [];
task.forEach((task) => rendertask(task));

btn.addEventListener("click",()=>{
    const tasktext  = inputbox.value.trim();
    if(tasktext == "") return;

    const datatext ={
        id:Date.now(),
        text:tasktext,
        completed:false
    }
    task.push(datatext);
    saveTask();
    inputbox.value="";
    rendertask(datatext); 
    console.log(task);
    

})
function rendertask(taskit){
 const li = document.createElement('li')
 li.setAttribute("data-id",taskit.id);
 if(taskit.completed) li.classList.add("completed");
 li.innerHTML=`
     <span>${taskit.text}</span>
     <button> delete </button>
 `;
  li.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON') return;
    taskit.completed = !taskit.completed;
    li.classList.toggle("completed");
    
    saveTask();
    
  });
  li.querySelector('button').addEventListener('click',(e) => {
    e.stopPropagation() // prevent toggle from firing 
    task = task.filter(t => t.id !== taskit.id)
    saveTask();
    li.remove();
  });
  ulist.appendChild(li);
 
}
function saveTask(){
    localStorage.setItem('task',JSON.stringify(task))
}
})  