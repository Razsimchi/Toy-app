const express = require('express')
const app = express()
const toyService = require('./services/toy.service')
const path = require('path')
const cors = require('cors')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// const corsOptions = {
//     origin: [
//         'http://127.0.0.1:8080',
//         'http://localhost:8080',
//         'http://127.0.0.1:3000',
//         'http://localhost:3000'
//     ],
//     credentials: true
// }
// app.use(cors(corsOptions))
app.use(express.json())
// app.use(express.static('public'))



app.get('/api/toy', (req, res) => {
    const { txt, sort, inStock } = req.query
    const filterBy = { txt, sort, inStock }
    console.log(typeof inStock);
    toyService.query(filterBy)
        .then(toys => res.send(toys))
})
app.post('/api/toy/save', (req, res) => {
    const { name, price } = req.body
    const toy = {
        price: +price,
        name
    }
    toyService.save(toy).then(savedtoy => {
        res.send(savedtoy)
    }).catch((err) => res.status(403).send(err))
})
app.put('/api/toy/save', (req, res) => {
    const { name, _id, price } = req.body
    const toy = {
        _id,
        price: +price,
        name
    }
    toyService.save(toy).then(savedtoy => {
        res.send(savedtoy)
    })
})
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => res.status(403).send(err))
})
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(msg => {
            res.send({ msg, toyId })
        })
})

// app.listen(3030, () => console.log('Server ready at port 3030!'))
const port = process.env.PORT || 3030;

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'
));

})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});