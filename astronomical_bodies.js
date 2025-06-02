let bodies = await fetchBodies()
let ids = []
let names = []
let english_names = []


for (const body of bodies) {
    ids.push(body.id)
    names.push(body.name)
    english_names.push(body.englishName)
}


async function fetchBodies() {
    return axios.get("https://api.le-systeme-solaire.net/rest/bodies/").then(response => response.data.bodies)
}


async function getBodyById(id) {
    return axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${id}`).then(response => response.data)
}


async function getIdsByEnglishName(english_name) {
    const ids = []
    for (const [index, name] of english_names.entries()) {
        if (name === english_name)
            ids.push(this.ids[index])
    }
    switch(ids.length) {
        case 0:
            return new Error(`English name (${english_name}) does not exist as a astronomical body.`)
        case 1:
            return ids[0]
        default:
            return ids
    }
}


export {bodies, ids, names, english_names, getBodyById, getIdsByEnglishName}