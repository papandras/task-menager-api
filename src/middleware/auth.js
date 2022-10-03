const jwt = require('jsonwebtoken')
const User = require('../models/user')

const maintenance = async (req, res, next) => {
    res.send('The site is under maintenance')
}

const blockGet = (req, res, next) => {
    if (req.method === 'GET') {
        res.send('Get requests are disabled')
    } else {
        next()
    }
}

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
        
    } catch(e) {
        res.status(401).send({ error: 'Login required'})
    }
}

module.exports = auth