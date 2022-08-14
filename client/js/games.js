const GAME_TBODY = document.querySelector("#game-list");
const GAME_CREATION_FORM = document.querySelector("#new-game");
const GAME_UPDATE_FORM = document.querySelector("#edit-game");

function updateGameTable(){

    GAME_TBODY.innerHTML = "";

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
                    <td class="user-select-none d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-fill mx-1 action-button ms-auto" viewBox="0 0 16 16"
                            onclick="loadUpdateGameFields(${game.id})"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar"
                        >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>

                    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash-fill mx-1 action-button" viewBox="0 0 16 16"
                            onclick="deleteGameItem(${game.id})"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remover"
                        >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </td>
                </tr>
            `;
        }, "");

        GAME_TBODY.innerHTML = trs;
        enableBootstrapTooltips();

    });        

}

function deleteGameItem(id){

    axiosRequest(`${END_POINT}/games/${id}`, 'DELETE', {}, 
    (err, response) => {
        if(response.status == 200){
            if(handleAxiosError(err)) return;
            updateGameTable();
        }
    })

}

function loadUpdateGameFields(id){

    axiosRequest(`${END_POINT}/games/${id}`, 'GET', {}, 
    (err, response) => {
        if(handleAxiosError(err)) return;

        const game = response.data;

        document.querySelector("#edit-game-id").value = game.id;
        document.querySelector("#edit-game-title").value = game.title;
        document.querySelector("#edit-game-price").value = game.price;
        document.querySelector("#edit-game-year").value = game.year;

    });
        
}

GAME_CREATION_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const title = document.querySelector("#game-title").value;
    const price = document.querySelector("#game-price").value;
    const year = document.querySelector("#game-year").value;

    const game = {title, price, year};

    if(isNaN(price)){
        toastr.warning("Preço deve contér um valor numérico.", "Atenção!");
        return;
    }

    if(isNaN(year)){
        toastr.warning("Ano de lançamento deve contér um valor numérico.", "Atenção!");
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
        toastr.warning("Preço deve contér um valor numérico.", "Atenção!");
        return;
    }

    if(isNaN(year)){
        toastr.warning("Ano de lançamento deve contér um valor numérico.", "Atenção!");
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

