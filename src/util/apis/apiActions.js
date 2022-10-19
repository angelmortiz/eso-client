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