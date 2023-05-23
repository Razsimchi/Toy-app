const fs = require('fs');
var toys = require('../data/toy.json')

function query({ txt, sort, inStock }) {
    if (inStock) inStock = JSON.parse(inStock)
    let toysToDisplay = toys
    if (txt) {
        const regExp = new RegExp(txt, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }
    if (sort) {
        if (sort === 'name') {
            toysToDisplay.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sort === 'price') {
            toysToDisplay.sort((a, b) => a.price - b.price)
        } else if (sort === 'createdAt') {
            toysToDisplay.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }
    }
    if (inStock) {
        toysToDisplay = toysToDisplay.filter(toy => toy.inStock)
    }
    return Promise.resolve(toysToDisplay)
}
function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}
function remove(toyId) {
    toys = toys.filter(toy => toy._id !== toyId)
    return _saveToysToFile()
}
function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('id not exist!')
         toyToUpdate.name=toy.name
         toyToUpdate.price=toy.price
    } else {
        toy._id = _makeId()
        toy.createdAt= Date.now()
        toy.inStock = true
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
}
function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}
module.exports = {
    query,
    get,
    remove,
    save
}
