const END_POINT = "http://localhost:8080";

const TBODY = document.querySelector("#game-list");
const CREATION_FORM = document.querySelector("#new-game");

async function getAllGames(){
    return axios.get(`${END_POINT}/games`);
}

function clearTable(){
    TBODY.innerHTML = "";
}

async function updateGameTable(){
    try{
        const response = await getAllGames();
        const games = response.data;
        
        const trs = games.reduce((trs, game) => {
            return `${trs}
                <tr>
                    <td>${game.id}</td>
                    <td>${game.title}</td>
                    <td>R$${game.price.toFixed(2)}</td>
                    <td>${game.year}</td>
                </tr>
            `;
        }, "");

        TBODY.innerHTML = trs;

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

    axios.post(`${END_POINT}/games`, game).then((res) => {
        if(res.status == 201){
            clearTable();
            updateGameTable();
        }
    }).catch(e => {
        alert(`Algo deu errado: ${e}.`);
    });
});

window.onload = updateGameTable();