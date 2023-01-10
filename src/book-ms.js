const express = require('express')
const app = express()

const bookList = [
    { title: 'Cien anios de soledad', author: 'Gabriel Garcia Marquez', genre: 'Fantasia'},
]

app.get('/', (req, res)=> {
    res.send({ bookList }).status(200)
})

app.listen(8300, ()=>console.log('user microservice is running on port: 8300'))