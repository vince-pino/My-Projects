const todoList = JSON.parse(localStorage.getItem('todo-list')) || 
                  [
                    {
                      id: 0,
                      name: "",
                      dueDate: "",
                      status: 0
                    }
                  ];

renderTodoList();


function renderTodoList() {
  let todoListHTML = '';
  let textDecoration = '';
  let isCheck = '';

   todoList.forEach((todoObject, index) => {
    const { name, dueDate, id, status } = todoObject;

    let html = '';
    
    if (status === 1) {
      textDecoration = 'text-decoration-line-through';
      isCheck = 'checked';

      html = `
            <tr>
              <td>
                <input class="form-check-input mt-0 me-2 border border-primary
                  js-checkbox" data-id="${id}" type="checkbox" ${isCheck}>
                <label class="js-id-${id} ${textDecoration}">${name}</lable>
              </td>
              <td>
                ${dueDate}
              </td>
              <td>
                <button class="btn js-delete-button" >
                  <i class="fa-regular fa-trash-can fa-xl" style="color: #b80000;" ></i>
                </button>
              </td>
            </tr>
          `;
    }

    

    todoListHTML += html;
   })
   

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-button')
   .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index,1);
      saveToStorage();
      renderTodoList();
    });
   });

   document.querySelectorAll('.js-checkbox').forEach(task => {
    task.addEventListener('click', () => {
      const taskId = task.dataset.id;
      todoList.forEach((todoTask) => {
        if (todoTask.id == taskId && todoTask.status == 0) {
          todoTask.status = 1;
          saveToStorage();
          document.querySelector(`.js-id-${taskId}`).classList.add('text-decoration-line-through');
          console.log(todoTask);
        }
        else if (todoTask.id == taskId && todoTask.status == 1) {
          todoTask.status = 0;
          saveToStorage();
          document.querySelector(`.js-id-${taskId}`).classList.remove('text-decoration-line-through');
          console.log(todoTask);
        }
      });
    });
  });
}

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodoList();
  });



function addTodoList() {
 const inputElement = document.querySelector('.js-todo-name-input');
 const name = inputElement.value;

 const dateInputElement = document.querySelector('.js-due-date-input');
 const dueDate = dateInputElement.value;

 const status = 0;
 const id = generateRandomId();

 todoList.push({
  name,
  dueDate,
  status,
  id
 });

 document.querySelector('.js-todo-name-input').value = '';
 document.querySelector('.js-due-date-input').value = '';

 saveToStorage();

 renderTodoList();
}

function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return randomNumber;
}

function saveToStorage() {
  localStorage.setItem('todo-list',JSON.stringify(todoList));
}