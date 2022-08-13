var loginEmail;
var loginPassword;
var loginBtn;

var signinName;
var signinEmail;
var signinPassword;
var signinBtn;

var signinModal;
var loginModal;

function showLoginModal(){
    loginModal.show();
}

function hideLoginModal(){
    loginModal.hide();
}

function hideSigninModal(){
    signinModal.hide();
}

function login(email, password) {

    loginBtn.disabled = true;

    let payload;

    if(email && password){
        payload = {
            email,
            password
        }
    }else{
        payload = {
            email: loginEmail.value,
            password: loginPassword.value
        }
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
        hideSigninModal();
        updateGameTable();
    });

}

function signin() {
    
    signinBtn.disabled = true;

    payload = {
        name: signinName.value,
        email: signinEmail.value,
        password: signinPassword.value
    }

    axiosRequest(`${END_POINT}/users`, 'POST', payload, (err, response) => {

        signinBtn.disabled = false;

        if(err) {
            toastr.error(err.response.data[0].message, "Erro!");
            return;
        }

        toastr.success("Seu usuário foi criado com sucesso, você será logado automaticamente.", "Sucesso!")
        login(payload.email, payload.password);

    });

}

function loginPressEnter(e){
    if(e.key === 'Enter') login();
}

function signinPressEnter(e){
    if(e.key === 'Enter') signin();
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
                <button type="button" id="login-btn" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modal-signin">Cadastrar</button>
                <button type="button" id="login-btn" onclick="login()" class="btn btn-primary">Login</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-signin" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Cadastrar</h5>
            </div>
            <div class="modal-body">
                <h6 class="mb-3">Para acessar o sistema é necessário possuir um usuário. <br> Cadastre-se utilizando o formulário abaixo.</h6>

                <label class="form-label" for="signin-name">Nome</label>
                <input class="form-control" type="text" id="signin-name" name="name" placeholder="Nome"/>

                <label class="form-label mt-2" for="signin-email">E-mail</label>
                <input class="form-control" type="text" id="signin-email" name="email" placeholder="E-mail"/>

                <label class="form-label mt-2" for="signin-password">Senha</label>
                <input class="form-control my-1" type="password" id="signin-password" name="password" placeholder="Senha"/>

            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modal-login" >Cancelar</button>
                <button type="button" id="signin-btn" onclick="signin()" class="btn btn-primary">Cadastrar</button>
            </div>
        </div>
    </div>
</div>
`;

loginModal = bootstrap.Modal.getOrCreateInstance(document.querySelector("#modal-login"));

loginEmail = document.querySelector("#login-email");
loginPassword = document.querySelector("#login-password");

loginBtn = document.querySelector("#login-btn");

signinModal = bootstrap.Modal.getOrCreateInstance(document.querySelector("#modal-signin"));

signinName = document.querySelector("#signin-name");
signinEmail = document.querySelector("#signin-email");
signinPassword = document.querySelector("#signin-password");

signinBtn = document.querySelector("#signin-btn");

//Initializing listerns

loginEmail.addEventListener("keydown", loginPressEnter);
loginPassword.addEventListener("keydown", loginPressEnter);

signinName.addEventListener("keydown", signinPressEnter);
signinEmail.addEventListener("keydown", signinPressEnter);
signinPassword.addEventListener("keydown", signinPressEnter);