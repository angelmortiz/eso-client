// const API_ADDRESS = "http://192.168.4.173:3000/api";
// const API_ADDRESS = "http://192.168.4.129:3000/api";
const API_ADDRESS = "http://localhost:3000/api";

export const apiGet = path => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(`${API_ADDRESS}${path}`, requestOptions)
    .then(apiResponse => {
        return apiResponse.json();
    })
    .catch(error => {
            console.log("An error ocurred while fetching information: ", error);
        }
    );
}

export const apiPost = (path, body) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify(body)
    };

    return fetch(`${API_ADDRESS}${path}`, requestOptions)
    .then(apiResponse => {
        return apiResponse.json();
    })
    .catch(error => {
        console.log("An error ocurred while posting information: ", error);
    });
}

export const apiPut = (path, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify(body)
    };

    return fetch(`${API_ADDRESS}${path}`, requestOptions)
    .then(apiResponse => {
        return apiResponse.json();
    })
    .catch(error => {
        console.log("An error ocurred while updating information: ", error);
    });
}

export const apiDelete = (path) => {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include'
    };

    return fetch(`${API_ADDRESS}${path}`, requestOptions)
    .then(apiResponse => {
        return apiResponse.json();
    })
    .catch(error => {
        console.log("An error ocurred while deleting document: ", error);
    });
}