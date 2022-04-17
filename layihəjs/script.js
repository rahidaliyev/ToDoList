let inputSelector = document.querySelector('.myText');
let myBtn = document.querySelector('.myButton');
let myList=document.querySelector('.list');
let todoArray = []
let allInput=document.querySelector('#input-list')

myBtn.addEventListener('click', e => {
    e.preventDefault();
    let todo = localStorage.getItem('todo')
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(inputSelector.value)
    inputSelector.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();

});


function displayTodo() {
    let todo = localStorage.getItem('todo')
    if (todo === null) {
        todoArray = []
    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
   for(
    let todo_arr_index = 0; todo_arr_index < todoArray.length; todo_arr_index++ 
){
    htmlCode += `
        <div>
        <div>
        <input class="myText" type="text" value="${todoArray[todo_arr_index]}"> <div class="remove"><i id="delete" onclick='deleteTodo(${todo_arr_index})' class="bi bi-x-circle"></i></div>
        </div>
        </div>`
   }
    myList.innerHTML=htmlCode;
    let inputlist = allInput.getElementsByTagName("input"); 
    if (inputlist) 
        for (let index = 0; index < inputlist.length; index++) { 
            inputlist[index].addEventListener("blur", (e) => { 
                e.preventDefault(); 
                let todo = localStorage.getItem("todo"); 
                todoArray = JSON.parse(todo); 
                todoArray[index] = e.target.value; 
                localStorage.setItem("todo", JSON.stringify(todoArray)); 
            }); 
        }
}

function deleteTodo(index){
    let todo = localStorage.getItem('todo')
    todoArray = JSON.parse(todo);
    todoArray.splice(index,1);
    localStorage.setItem("todo",JSON.stringify(todoArray));
    displayTodo();
}

window.addEventListener('DOMContentLoaded',()=>{
    displayTodo();
    sorter();
    
})
let counter=0;
function sorter(){
    let todo = localStorage.getItem('todo')
    
    if(counter==0){
        counter++;
        todoArray.sort().reverse();
        localStorage.setItem("todo",JSON.stringify(todoArray));
    }
    else if(counter==1){
        counter--;
        todoArray.sort()
        localStorage.setItem("todo",JSON.stringify(todoArray));
    }
  displayTodo();
}


inputSelector.addEventListener('click', function (event) {
    event.target.style.outline = '0'
})
inputSelector.addEventListener('focus', function (event) {
    event.target.style.outline = '0'
})

allInput.addEventListener('click', function (event) {
    event.target.style.outline = '0'
})
allInput.addEventListener('focus', function (event) {
    event.target.style.outline = '0'
})

function myFunction(x) {
    x.classList.toggle("fa-arrow-up-short-wide");
  }

  new Sortable(allInput,{ 
    animation:300 
});


