require('dotenv').config()

exports.serverPort = process.env.PORT
exports.secret = process.env.SECRET_SESSION

exports.sessionConfig = {
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}

exports.apiLimiterConfig = {
    windowMs: 5 * 60 * 1000,
    max: 5,
    // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    // legacyHeaders: false, // disable the `X-RateLimit-*` headers
}

exports.proxies = {
    "/users": {
        protected: true,
        target: 'http://localhost:8200/',
        changeOrigin: true,
        pathRewrite: {
            [`^/users`]: ""
        }
    },
    "/books": {
        protected: false,
        target: 'http://localhost:8300/',
        changeOrigin: true,
        pathRewrite: {
            [`^/books`]: ""
        }
    }

}
