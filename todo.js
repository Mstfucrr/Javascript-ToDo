const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todolist = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners()

function eventListeners() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    secondCardBody.addEventListener("click", deleteTodoUI)
    filter.addEventListener("keypress", filterTodos)
    clearButton.addEventListener("click", AllClearTodos)
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase()
    const listitems = document.querySelectorAll(".list-group-item")

    listitems.forEach(function (listitem) {
        const text = listitem.textContent.toLowerCase()
        if (text.indexOf(filterValue) === -1) {
            // Bulunamadı
            listitem.setAttribute("style", "display:none !important")
        } else {
            listitem.setAttribute("style", "display:block")
        }
    })
}


function loadAllTodosToUI() {
    let todos = getTodosFromStorage()
    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })

}

function addTodo(e) {

    const newTodo = todoInput.value.trim() // trim ile başındaki ve sonundaki boşluklar gider
    if (newTodo === "") {
        showAlert("danger", "Lütfen bir todo girin...");

    } else {

        addTodoToUI(newTodo) // String değerini list item olarak ui 'a ekleyecek
        addTodoToStorage(newTodo)
        showAlert("success", "Todo başarıyla eklendi");
    }

    e.preventDefault()
}


function showAlert(type, message) {

    const alert = document.createElement("div")
    alert.className = 'alert col-md-10 alert-' + type
    alert.textContent = message
    firstCardBody.appendChild(alert)
    setTimeout(function () {
        alert.remove()
    }, 1000);

}

function getTodosFromStorage() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}


function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))

}


function addTodoToUI(newTodo) {

    // List item oluşturma
    const listitem = document.createElement("li")

    // Link oluşturma
    const link = document.createElement("a")

    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listitem.className = "list-group-item d-flex justify-content-between list-group-item-info"

    listitem.appendChild(document.createTextNode(newTodo))  // inputtaki verilen veriyi alma
    listitem.appendChild(link)
    todolist.appendChild(listitem)
    todoInput.value = ""


}

function deleteTodoUI(e) {
    if (e.target.className === "fa fa-remove") {
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        e.target.parentElement.parentElement.remove()
    }
}

function deleteTodoFromStorage(todo) {
    let todos = getTodosFromStorage()
    let index = todos.indexOf(todo)
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function AllClearTodos(e) {
    if (confirm("Tümünü silmek istediğinize eminmisiniz")) {
        // todolist.innerHTML = ""  YAVAŞ
        while (todolist.firstElementChild != null) {
            todolist.removeChild(todolist.firstElementChild)
        }
        localStorage.clear()
    }



}
