const END_POINT = "http://localhost:8080";

function getAxiosConfig() {
    return {
        headers:{
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViamV0IjoibGVvbi5sYWNlcmRhMjAxNUBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNTA5MDEsImV4cCI6MTY2MDMyMzcwMX0.sTdb-6zXgyFWteHNPOjfcnePd81y2IjSNZaGVxI4zRM"
        }
    };
}

function axiosRequest(url, method = "GET", body = {}, callback){
    let request;
    switch(method){
        case 'get':
        case 'GET':
            request = axios.get(url, getAxiosConfig());
            break;
        case 'post':
        case 'POST':
            request = axios.post(url, body, getAxiosConfig());
            break;
        case 'put':
        case 'PUT':
            request = axios.put(url, body, getAxiosConfig());
            break;
        case 'delete':
        case 'DELETE':
            request = axios.delete(url, getAxiosConfig());
            break;
        default:
            return false;
    }

    request.then(result => {
        callback(undefined, result);
    })
    .catch(err => {
        callback(err);
    })
}

function handleAxiosError(error){
    if(error){
        if(error.response.status == 401 || error.response.status == 403){
            alert("Precisa logar");
        }else{
            alert("Deu ruim");
            console.error(error);
        }
        return true;
    }
    return false;
}