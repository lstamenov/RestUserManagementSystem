import service from './service.js';

const resultDivElement = document.getElementById('result');

const submitButton = document.getElementById('submit');
const deleteButton = document.getElementById('delete_user');
const updateButton = document.getElementById('submit-update');
const findUserButton = document.getElementById('find-user-button');

const showAllUsersButton = document.getElementById('show-all-users');
const showCreateUserElement = document.getElementById('show-create-element');
const showUpdateUserElement = document.getElementById('show-update-element');
const showDeleteUserElement = document.getElementById('show-delete-element');

const createUserElement = document.getElementById('add-user-element');
const updateUserElement = document.getElementById('update-user-element');
const deleteUserElement = document.getElementById('delete-user-element');


const navButtons = document.querySelector('.nav');
const articleElements = document.querySelectorAll('article');
const usersTableElement = document.getElementById('users-table');

showUpdateUserElement.addEventListener('click', function () {
    for(let i = 0; i < articleElements.length; i++){
        articleElements[i].style.display = 'none';
    }
    updateUserElement.style.display = 'block';
})

showCreateUserElement.addEventListener('click', function () {
    for(let i = 0; i < articleElements.length; i++){
        articleElements[i].style.display = 'none';
    }
    createUserElement.style.display = 'block';
});


showAllUsersButton.addEventListener('click', function() {
    for(let i = 0; i < articleElements.length; i++){
        articleElements[i].style.display = 'none';
    }
    usersTableElement.style.display = 'block';

    if(usersTableElement.firstElementChild.children.length > 1){
        for(let i = 1; i < usersTableElement.firstElementChild.children.length; i++){
            usersTableElement.firstElementChild.children[i].remove();
            i--;
        }
    }

    service.listAllUsers()
        .then(data => {
            for(let i = 0; i < data.length; i++){
                let tableDataIdElement = document.createElement('td');
                let tableDataFirstNameElement = document.createElement('td');
                let tableDataLastNameElement = document.createElement('td');
                let tableDataEmailElement = document.createElement('td');
                let tableDataAgeElement = document.createElement('td');

                let tableRecord = document.createElement('tr');
                let userElement = data[i];

                tableDataIdElement.textContent = userElement.id;
                tableDataFirstNameElement.textContent = userElement.firstName;
                tableDataLastNameElement.textContent = userElement.lastName;
                tableDataEmailElement.textContent = userElement.email;
                tableDataAgeElement.textContent = userElement.age;

                tableRecord.appendChild(tableDataIdElement);
                tableRecord.appendChild(tableDataFirstNameElement);
                tableRecord.appendChild(tableDataLastNameElement);
                tableRecord.appendChild(tableDataEmailElement);
                tableRecord.appendChild(tableDataAgeElement);

                usersTableElement.firstElementChild.appendChild(tableRecord);
            }
        })
        .catch(err => {
            resultDivElement.innerHTML += `<p>${err}</p>`
        })
});

for (let i = 0; i < navButtons.children.length; i++) {
    console.log(navButtons);
    let currentButton = navButtons.children[i].firstElementChild;
    console.log(currentButton);
    currentButton.addEventListener('mouseover', function (e) {
        e.target.style.backgroundColor = 'dimgray';
    });
    currentButton.addEventListener('mouseout', function (e){
        e.target.style.backgroundColor = 'gray';
        e.target.style.cursor = 'pointer';
    });
}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    let inputFields = document.getElementsByTagName('input');

    let user = {
        email: inputFields[2].value,
        firstName: inputFields[0].value,
        lastName: inputFields[1].value,
        age: inputFields[3].value
    };

    service.addUser(user).then(r => console.log(r));
    [...inputFields].forEach(f => f.value = '');
});

deleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    let id = document.getElementById('user_id').value;
    service.deleteUserById(id).then(r => console.log(r));
});

findUserButton.addEventListener('click', function () {
    let id = findUserButton.previousElementSibling.value;
    let user = service.getUserById(id);
    let form = document.getElementById('update-form');
    let inputFields = form.querySelectorAll('input');

    form.style.display = 'block';
    user.then(data => {
        inputFields[0].value = data.firstName;
        inputFields[1].value = data.lastName;
        inputFields[2].value = data.email;
        inputFields[3].value = data.age;
    });

});





