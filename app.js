const addToDoBtn = document.getElementById("addToDoBtn")
const inputTag=document.getElementById("todoInput")
let todoText;//this should be populated when the user clicks on the add button
let todos=[];
let todoString =localStorage.getItem("todos")
//if we have todos in the localStorage, we will read it
if(todoString){
    todos=JSON.parse(todoString)
}
addToDoBtn.addEventListener("click",(e)=>{
    console.log("Hey I just Clicked")
    todoText=inputTag.value
    console.log(todoText)
    inputTag.value=""
    let todo= {
        title:todoText,
        isCompleted:false
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
})