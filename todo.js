const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}
// toDos 배열에서 가져와 로컬에 저장하는 일
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintTodo(text) {
    // console.log(text)
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // console.log("loadedToDos" + loadedToDos)
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos)
        parsedToDos.forEach(function (toDo) {
            paintTodo(toDo.text)
        });
    }
}


function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();