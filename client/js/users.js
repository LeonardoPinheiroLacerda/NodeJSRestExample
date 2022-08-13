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
                    <td class="col-lg-3 col-md-4 col-sm-5">
                        <button class="btn btn-warning mx-1"
                            onclick="loadUpdateUserFields(${user.id})">
                            Atualizar
                        </button>
                        <button class="btn btn-danger mx-1" 
                            onclick="deleteUserItem(${user.id})">
                            Deletar
                        </button>
                    </td>
                </tr>
            `;
        }, "");

        USER_TBODY.innerHTML = trs;

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