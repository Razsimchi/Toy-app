import { httpService } from "./http.service"

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

function query(filterBy={}) {
    return httpService.get(BASE_URL, filterBy)
}
function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL+'save', toy)
    } else {
        return httpService.post(BASE_URL+'save', toy)
    }
}
function getEmptyToy() {
    return {
        createdAt: Date.now(),
        name: '',
        price: '',
        inStock: true
    }
}


