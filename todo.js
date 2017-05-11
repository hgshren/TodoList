
var log = function() {
    console.log.apply(console, arguments)
}

var insertTodo = function(todo) {
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var e = function(selector) {
    return document.querySelector(selector)
}

// 创建一个 todos 数组用来保存所有的 todo
var todos = []

// 载入页面的时候  把已经有的 todo 加载到页面中
var loadTodos = function() {
    todos = JSON.parse(localStorage.simpletodos)
    for (var i = 0; i < todos.length; i++) {
        var t = todos[i]
        insertTodo(t)
    }
}

// 给 add button 绑定添加 todo 事件
var addButton = e('#id-button-add')
addButton.addEventListener('click', function(event) {
    // 获得 input.value
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    // 把新添加的 todo 加入 todos 并且写入到 localStorage
    log('todo', todo)
    todos.push(todo)
    localStorage.simpletodos = JSON.stringify(todos)
    // 删除页面中所有的 todo 并重新把 所有的 todo
    // 添加到 container 中
    e('#id-div-container').innerHTML = ''
    loadTodos()
})

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <div class="todo-done"></div>
            <span contenteditable='true'>${todo}</span>
            <div class='todo-delete'>×</div>
        </div>
        `
    return t
}

var todoContainer = e('#id-div-container')

// 通过 event.target 的 class 来检查点击的是什么
todoContainer.addEventListener('click', function(event) {
    log('container click', event, event.target)
    var target = event.target
    if (target.classList.contains('todo-done')) {
        log('done')
        // 给 todo div 开关一个状态 class
        toggleClass(target, 'done-color')
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
    } else if (target.classList.contains('todo-delete')) {
        // log('delete')
        var button = event.target
        var cell = button.parentElement

        var cells = cell.parentElement.children
        var index = 0
        for (var i = 0; i < cells.length; i++) {
            var c = cells[i]
            if (c == cell) {
                index = i
                break
            }
        }
        log('点击的 todo 下标', index)

        todos.splice(index, 1)
        localStorage.simpletodos = JSON.stringify(todos)
        // 删除 todo-cell
        var todoDiv = target.parentElement
        todoDiv.remove()
    }
})

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

//这个函数用来打开主题列表
var select = e('.select')
select.addEventListener('click', function(event) {
    var list = document.querySelector('.color')
    toggleClass(list, 'show')
})

//这个函数用于更换皮肤
var stylelist = e('.color')
stylelist.addEventListener('click', function(event) {
    log('click')
    var target = event.target
    var head = document.querySelector('head')
    var red = `<link rel="stylesheet" href="red.css" class="style">`
    var blue = `<link rel="stylesheet" href="blue.css" class="style">`
    var grey = `<link rel="stylesheet" href="grey.css" class="style">`
    if (target.classList.contains('skin')) {
        var style = document.querySelector('.style')
        style.remove()
    }
    if (target.classList.contains('red')) {
        log('red')
        head.insertAdjacentHTML('beforeend', red)
    }
    if (target.classList.contains('blue')) {
        log('blue')
        head.insertAdjacentHTML('beforeend', blue)
    }
    if (target.classList.contains('grey')) {
        log('grey')
        head.insertAdjacentHTML('beforeend', grey)
    }
})
loadTodos()
