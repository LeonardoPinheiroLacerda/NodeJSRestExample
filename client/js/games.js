const TBODY = document.querySelector("#game-list");
const GAME_CREATION_FORM = document.querySelector("#new-game");
const GAME_UPDATE_FORM = document.querySelector("#edit-game");

function updateGameTable(){

    TBODY.innerHTML = "";

    axiosRequest(`${END_POINT}/games`, 'GET', {}, 
    (err, response) => {
    
        if(handleAxiosError(err)) return;

        const games = response.data;
    
        const trs = games.reduce((trs, game) => {
            return `${trs}
                <tr>
                    <td>${game.id}</td>
                    <td>${game.title}</td>
                    <td>R$${game.price.toFixed(2)}</td>
                    <td>${game.year}</td>
                    <td class="col-lg-3 col-md-4 col-sm-5">
                        <button class="btn btn-warning mx-1"
                            onclick="loadUpdateFields(${game.id})">
                            Atualizar
                        </button>
                        <button class="btn btn-danger mx-1" 
                            onclick="deleteItem(${game.id})">
                            Deletar
                        </button>
                    </td>
                </tr>
            `;
        }, "");

        TBODY.innerHTML = trs;

        scrollTo(0, 0);
    });        

}

function deleteItem(id){

    axiosRequest(`${END_POINT}/games/${id}`, 'DELETE', {}, 
    (err, response) => {
        if(response.status == 200){
            if(handleAxiosError(err)) return;
            updateGameTable();
        }
    })

}

function loadUpdateFields(id){

    axiosRequest(`${END_POINT}/games/${id}`, 'GET', {}, 
    (err, response) => {
        if(handleAxiosError(err)) return;

        const game = response.data;

        document.querySelector("#edit-game-id").value = game.id;
        document.querySelector("#edit-game-title").value = game.title;
        document.querySelector("#edit-game-price").value = game.price;
        document.querySelector("#edit-game-year").value = game.year;

        scrollTo(0, document.body.scrollHeight);
    });
        
}

GAME_CREATION_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const title = document.querySelector("#game-title").value;
    const price = document.querySelector("#game-price").value;
    const year = document.querySelector("#game-year").value;

    const game = {title, price, year};

    if(isNaN(price)){
        alert("Preço deve contér um valor numérico");
        return;
    }

    axiosRequest(`${END_POINT}/games`, 'POST', game,
    (err, response) => {
        if(response.status == 201){
            if(handleAxiosError(err)) return;
            updateGameTable();
        }
    });
});

GAME_UPDATE_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const id = document.querySelector("#edit-game-id").value;
    const title = document.querySelector("#edit-game-title").value;
    const price = document.querySelector("#edit-game-price").value;
    const year = document.querySelector("#edit-game-year").value;

    if(isNaN(price)){
        alert("Preço deve contér um valor numérico");
        return;
    }

    const game = {title, price, year};

    axiosRequest(`${END_POINT}/games/${id}`, 'PUT', game, 
    (err, response) => {
        if(response.status == 200){
            if(handleAxiosError(err)) return;
            updateGameTable();
        }
    });
});

window.onload = updateGameTable();