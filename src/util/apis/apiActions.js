const API_ADDRESS = "http://localhost:3000/api";

export const apiGet = path => {
    return fetch(`${API_ADDRESS}${path}`)
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

export const apiDelete = (path) => {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`${API_ADDRESS}${path}`, requestOptions)
    .then(apiResponse => {
        return apiResponse.json();
    })
    .catch(error => {
        console.log("An error ocurred while deleting document: ", error);
    });
}