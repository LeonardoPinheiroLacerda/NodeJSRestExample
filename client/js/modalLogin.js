var loginEmail = document.querySelector("#login-email");
var loginPassword = document.querySelector("#login-password");
var loginBtn = document.querySelector("#login-btn");

var loginModal;

function showLoginModal(){
    loginModal.show();
}


function hideLoginModal(){
    loginModal.hide();
}

function login() {

    loginBtn.disabled = true;

    const payload = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    axiosRequest(`${END_POINT}/auth`, 'POST', payload, (err, response) => {
        loginBtn.disabled = false;

        if(err) {
            loginPassword.value = "";
            loginEmail.focus();
            toastr.error("Credenciais incorretas", "Erro!");
            return;
        }

        localStorage.setItem("token", response.data.token);
        toastr.success("Login realizado!", "Sucesso!");
        hideLoginModal();
        updateGameTable();
    });

}

function pressEnter(e){
    if(e.key === 'Enter') login();
}


//Initializing this modal and it's variables
document.body.innerHTML += `
<div class="modal fade" id="modal-login" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Login</h5>
            </div>
            <div class="modal-body">
                <label class="form-label" for="email">E-mail</label>
                <input class="form-control" type="text" id="login-email" name="email" placeholder="E-mail"/>

                <label class="form-label mt-2" for="password">Senha</label>
                <input class="form-control my-1" type="password" id="login-password" name="password" placeholder="Senha"/>
            </div>
            <div class="modal-footer">
                <button type="button" id="login-btn" onclick="login()" class="btn btn-primary">Login</button>
            </div>
        </div>
    </div>
</div>
`;

loginModal = bootstrap.Modal.getOrCreateInstance(document.querySelector("#modal-login"));

loginEmail = document.querySelector("#login-email");
loginPassword = document.querySelector("#login-password");

loginBtn = document.querySelector("#login-btn");

//Initializing listerns

loginEmail.addEventListener("keydown", pressEnter);
loginPassword.addEventListener("keydown", pressEnter);