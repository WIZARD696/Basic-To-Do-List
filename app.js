const addToDoBtn = document.getElementById("addTodoBtn")
const inputTag=document.getElementById("todoInput")
let todoText;//this should be populated when the user clicks on the add button
let todos=[];
let todoString =localStorage.getItem("todos")
let todoListUL=document.getElementById("todoList")
let remaining =document.getElementById("remaining-count")
let clear=document.getElementById("clearCompletedBtn")
const filterBtns = document.querySelectorAll(".filter-btn");
let currentFilter = "all";
//if we have todos in the localStorage, we will read it
if(todoString){
    todos=JSON.parse(todoString)
}

const populateTodos=()=>{
    let filteredTodos = todos;

    if (currentFilter === "active") {
        filteredTodos = todos.filter((todo) => {
            return todo.isCompleted === false;
        });
    }

    else if (currentFilter === "completed") {
        filteredTodos = todos.filter((todo) => {
            return todo.isCompleted === true;
        });
    }
    string="";
    for(const todo of filteredTodos){//learn this syntax of the javaScript For loop
        string+=`<li id="todo-${todo.id}" class=" todo-item ${todo.isCompleted?"completed":""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted?"checked":""}>
                    <span class="todo-text">${todo.title}</span>  
                    <button class="delete-btn">×</button>
                </li>`
    }
    todoListUL.innerHTML= string
    //this here will run whenever the page reloads or any event happens deletion insertion etc.
    remaining.innerHTML=todos.filter((item)=>{return item.isCompleted!=true}).length;


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
            remaining.innerHTML=todos.filter((item)=>{return item.isCompleted!=true}).length;
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
            remaining.innerHTML=todos.filter((item)=>{return item.isCompleted!=true}).length;
            localStorage.setItem("todos",JSON.stringify(todos));
        }
    })
})

    //handling the clear completed button
    clear.addEventListener("click",()=>{
        todos=todos.filter((item)=>{ return item.isCompleted!=true
        })
        populateTodos()
        localStorage.setItem("todos",JSON.stringify(todos))
    })


    //now let us handle the delete buttons
    let deleteBtns=document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click",(e)=>{
            const confirmation=confirm("Do you really want to Delete this task?")
            if(confirmation){
            todos=todos.filter((todo)=>{
                return "todo-"+todo.id!==(e.target.parentNode.id);
            })
             localStorage.setItem("todos",JSON.stringify(todos))
            populateTodos()
        }
        })
       
    })
}
//handling the filter buttons
filterBtns.forEach((button) => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        filterBtns.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        populateTodos();
    });
});
addToDoBtn.addEventListener("click",(e)=>{
    todoText=inputTag.value
    if(todoText.trim().length<3){
        alert("Task cannot be this small!!")
        return;
    }
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
