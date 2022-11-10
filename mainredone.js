window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const listElement = document.querySelector('#tasks');

    todos = JSON.parse(localStorage.getItem('todos')) || [];

    console.log(todos)

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        
        if(!task) {
            alert('You definitely have something to do...')
            return
        }

        const todo = {
            content: task,
            id: Math.floor(Math.random() * 100000)
        }

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        todos.forEach(todo => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const taskContentElement = document.createElement('div');
        taskContentElement.classList.add("content");

        taskElement.appendChild(taskContentElement);

        const taskInputElement = document.createElement("input")
        taskInputElement.classList.add("text");
        taskInputElement.type = "text";
        taskInputElement.value = task;
        taskInputElement.setAttribute('readonly', 'readonly');

        taskContentElement.appendChild(taskInputElement);

        const taskActionsElement = document.createElement('div');
        taskActionsElement.classList.add("actions");

        const taskEditElement = document.createElement('button');
        taskEditElement.classList.add('edit');
        taskEditElement.innerHTML = "Edit";

        const taskDeleteElement = document.createElement('button');
        taskDeleteElement.classList.add('delete');
        taskDeleteElement.innerHTML = "Delete";

        taskActionsElement.appendChild(taskEditElement);
        taskActionsElement.appendChild(taskDeleteElement);

        taskElement.appendChild(taskActionsElement);

        listElement.appendChild(taskElement);

        input.value = '';

        taskEditElement.addEventListener('click', () => {
            if (taskEditElement.innerText.toLowerCase() == 'edit') {
                taskInputElement.removeAttribute('readonly');
                taskInputElement.focus();
                taskEditElement.innerText = "Save";
                localStorage.setItem("todos", JSON.stringify(todos));
        
            } else {
                taskInputElement.setAttribute('readonly', 'readonly');
                taskEditElement.innerText = 'Edit';
            }
        });

        taskDeleteElement.addEventListener('click', () => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            listElement.removeChild(taskElement);
            
            });
   
        }); 

    }); 
   
});