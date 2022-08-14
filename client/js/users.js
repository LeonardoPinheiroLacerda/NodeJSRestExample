const USER_TBODY = document.querySelector("#user-list");
const USER_CREATION_FORM = document.querySelector("#new-user");
const USER_UPDATE_FORM = document.querySelector("#edit-user");

function updateUserTable(){

    USER_TBODY.innerHTML = "";

    axiosRequest(`${END_POINT}/users`, 'GET', {}, 
    (err, response) => {
    
        if(handleAxiosError(err)) return;

        const users = response.data;
    
        const trs = users.reduce((trs, user) => {
            return `${trs}
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td class="user-select-none d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-fill mx-1 action-button ms-auto" viewBox="0 0 16 16"
                            onclick="loadUpdateUserFields(${user.id})"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar"
                        >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
    
                    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash-fill mx-1 action-button" viewBox="0 0 16 16"
                            onclick="deleteUserItem(${user.id})"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remover"
                        >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </td>
                </tr>
            `;
        }, "");

        USER_TBODY.innerHTML = trs;
        enableBootstrapTooltips();

    });        

}

function loadUpdateUserFields(id){
    axiosRequest(`${END_POINT}/users/${id}`, 'GET', {}, 
    (err, response) => {
        if(handleAxiosError(err)) return;

        const user = response.data;

        document.querySelector("#edit-user-id").value = user.id;
        document.querySelector("#edit-user-name").value = user.name;
        document.querySelector("#edit-user-email").value = user.email;
    });
}

function deleteUserItem(id){
    axiosRequest(`${END_POINT}/users/${id}`, 'DELETE', {}, 
    (err, response) => {
        if(response.status == 200){
            if(handleAxiosError(err)) return;
            updateUserTable();
        }
    })
}

USER_CREATION_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const name = document.querySelector("#user-name").value;
    const email = document.querySelector("#user-email").value;
    const password = document.querySelector("#user-password").value;

    const user = {name, email, password};

    axiosRequest(`${END_POINT}/users`, 'POST', user,
    (err, response) => {
        if(response.status == 201){
            if(handleAxiosError(err)) return;
            updateUserTable();
        }
    });

})

USER_UPDATE_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const id = document.querySelector("#edit-user-id").value;
    const name = document.querySelector("#edit-user-name").value;
    const email = document.querySelector("#edit-user-email").value;

    const user = {name, email};

    axiosRequest(`${END_POINT}/users/${id}`, 'PUT', user, 
    (err, response) => {
        if(response.status == 200){
            if(handleAxiosError(err)) return;
            updateUserTable();
        }
    });

})