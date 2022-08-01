const END_POINT = "http://localhost:8080";

const TBODY = document.querySelector("#game-list");
const CREATION_FORM = document.querySelector("#new-game");
const UPDATE_FORM = document.querySelector("#edit-game");

async function getAllGames(){
    return axios.get(`${END_POINT}/games`);
}

async function updateGameTable(){
    try{
        TBODY.innerHTML = "";
        const response = await getAllGames();
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
    }catch(e){
        alert(`Algo deu errado: ${e}.`);
    }
}

function deleteItem(id){
    axios.delete(`${END_POINT}/games/${id}`).then(res => {
        if(res.status == 200){
            updateGameTable();
        }
    }).catch(e => {
        alert(`Algo deu errado: ${e}.`);
    });
}

async function loadUpdateFields(id){
    const getById = async () => {
        return axios(`${END_POINT}/games/${id}`);
    }

    try{
        const response = await getById();
        const game = response.data;

        document.querySelector("#edit-game-id").value = game.id;
        document.querySelector("#edit-game-title").value = game.title;
        document.querySelector("#edit-game-price").value = game.price;
        document.querySelector("#edit-game-year").value = game.year;

        scrollTo(0, document.body.scrollHeight);
        
    }catch(e){
        alert(`Algo deu errado: ${e}.`);
    }
}

CREATION_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const title = document.querySelector("#game-title").value;
    const price = document.querySelector("#game-price").value;
    const year = document.querySelector("#game-year").value;

    const game = {title, price, year};

    axios.post(`${END_POINT}/games`, game).then(res => {
        if(res.status == 201){
            updateGameTable();
        }
    }).catch(e => {
        alert(`Algo deu errado: ${e}.`);
    });
});

UPDATE_FORM.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const id = document.querySelector("#edit-game-id").value;
    const title = document.querySelector("#edit-game-title").value;
    const price = document.querySelector("#edit-game-price").value;
    const year = document.querySelector("#edit-game-year").value;

    const game = {title, price, year};

    axios.put(`${END_POINT}/games/${id}`, game).then(res => {
        if(res.status == 200){
            updateGameTable();
        }
    }).catch(e => {
        alert(`Algo deu errado: ${e}.`);
    });
});

window.onload = updateGameTable();