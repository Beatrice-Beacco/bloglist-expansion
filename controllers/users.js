const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//Gets and populates
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')

    response.json(users)
})

//Saves a new user that adheres to the parameters, else returns status 400
//and an error
usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try{
    const savedUser = await user.save()
    response.json(savedUser)
    } catch (err) {
    next(err)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter