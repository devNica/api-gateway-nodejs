const config = require('./config')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const responseTime = require('response-time')
const rateLimit = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware')
const session = require('express-session')

const store = new session.MemoryStore()



const app = express()
const port = config.serverPort

const alwaysAllow = (_req, _res, next) => next()

const protect = (req, res, next) => {
    const { authenticated } = req.session
    if (!authenticated) res.sendStatus(401)
    else next()
}

app.use(session({...config.sessionConfig, store}))


app.get('/login', (req, res) => {
    const { authenticated } = req.session
    if (!authenticated) {
        req.session.authenticated = true
        res.send('successfully authenticated')
    } else res.send('Already authenticated')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Successfully logged out')
    })
})

app.get('/protected', protect, (req, res) => {
    const { name } = req.query
    res.send(`Hello: ${name}`) 
})


app.disable('x-powered-by')

app.use(cors({ origin: '*'}))
app.use(responseTime())
app.use(helmet())
app.use(rateLimit(config.apiLimiterConfig))

Object.keys(config.proxies).forEach((path)=> {
    const { protected, ...options } = config.proxies[path]
    const check = protected ? protect : alwaysAllow
    app.use(path, check, createProxyMiddleware(options))
})

app.use((req, res) => res.json({ message: 'Page not found' }).status(400))

app.listen(port, () => console.log(`server is running on port: ${port}`))