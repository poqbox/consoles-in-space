async function bodies() {
    return axios.get("https://api.le-systeme-solaire.net/rest/bodies/").then(response => response.data.bodies)
}


export {bodies}