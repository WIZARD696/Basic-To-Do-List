const addToDoBtn = document.getElementById("addTodoBtn")
const inputTag=document.getElementById("todoInput")
let todoText;//this should be populated when the user clicks on the add button
let todos=[];
let todoString =localStorage.getItem("todos")
let todoListUL=document.getElementById("todoList")
//if we have todos in the localStorage, we will read it
if(todoString){
    todos=JSON.parse(todoString)
}

const populateTodos=()=>{
    string="";
    for(const todo of todos){//learn this syntax of the javaScript For loop
        string+=`<li id="todo-${todo.id}" class="${todo.isCompleted?"completed":""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted?"checked":""}>
                    <span class="todo-text">${todo.title}</span>  
                    <button class="delete-btn">×</button>
                </li>`
    }
    todoListUL.innerHTML= string

    //this is the addition handling part
    const todoCheckboxes= document.querySelectorAll(".todo-checkbox")

todoCheckboxes.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        if(e.target.checked){
            element.parentNode.classList.add("completed")
            //now we grab this particular todo from the todo's array and set it's isCompleted as true
            todos=todos.map(todo=>{
                if("todo-" +todo.id==element.parentNode.id){
                    return {...todo,isCompleted:true};
                }
                else{
                    return todo;
                }
            })
            localStorage.setItem("todos",JSON.stringify(todos))
        }
        else{
            element.parentNode.classList.remove("completed")
            //similarly with remove we do the same
            todos=todos.map(todo=>{
                if("todo-" +todo.id==element.parentNode.id){
                    return {...todo,isCompleted:false};
                }
                else{
                    return todo;
                }
            })
            localStorage.setItem("todos",JSON.stringify(todos));
        }
    })
})

    //now let us handle the delete buttons
    let deleteBtns=document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click",(e)=>{
            todos=todos.filter((todo)=>{
                return "todo-"+todo.id!==(e.target.parentNode.id);
            })
             localStorage.setItem("todos",JSON.stringify(todos))
            populateTodos()
        })
       
    })
}
addToDoBtn.addEventListener("click",(e)=>{
    todoText=inputTag.value
    console.log(todoText)
    inputTag.value=""
    let todo= {
        id:Date.now(),
        title:todoText,
        isCompleted:false
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
    populateTodos()
})
populateTodos()
