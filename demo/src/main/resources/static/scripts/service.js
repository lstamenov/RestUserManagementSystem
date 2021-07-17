const baseUrl = 'http://localhost:8080/'

let listAllUsers = () => {
    let url = baseUrl + 'users/';
    return  fetch(url)
        .then(response => response.json());
}

let addUser = async (user) => {
    console.log(user);
    let response = await fetch(baseUrl + 'add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

let deleteUserById = async (id) => {
     let response = await fetch(baseUrl + `delete/${id}`, {
        method: 'DELETE'
    });
}

let updateUserById = async (id, user) => {
    await fetch(baseUrl + `update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

let getUserById = async (id) => {
    let r =  await fetch(baseUrl + `user/${id}`)
    .then(resp => resp.json());

    return r;   
}

export default {
    addUser,
    listAllUsers,
    deleteUserById,
    updateUserById,
    getUserById
};
