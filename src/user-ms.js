const express = require('express')
const app = express()

const userList = [
    { fullname: 'Lucas Andres Marsel', age: 34, gender: 'male'},
    { fullname: 'Gabriel Garcia Marquez', age: 90, gender: 'male'},
    { fullname: 'Gabriela Mistral', age: 102, gender: 'female'},
    { fullname: 'Isabela Allende', age: 74, gender: 'female'},
    { fullname: 'Ruben Dario Sarmiento', age: 114, gender: 'male'},
]

app.get('/', (req, res)=> {
    res.send({ userList }).status(200)
})

app.listen(8200, ()=>console.log('user microservice is running on port: 8200'))