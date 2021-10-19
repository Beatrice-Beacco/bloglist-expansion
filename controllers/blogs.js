const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


//Deletes an entry based on the id
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

//Add new entries
blogsRouter.put('/:id', async (request, response) => {

    const body = request.body

    const entry = {
        title: body.title,
        author: body.autor,
        url: body.url,
        likes: body.likes,
        id: request.params.id
    }

    const updated = await Blog.findByIdAndUpdate(request.params.id, entry)
    response.json(updated)
})

//Defines the get request. Uses the blog schema to get all the notes
//Async/await syntax
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('users')
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

//Defines the post request using the blog schema
//Async/await syntax 
blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }


    const user = await User.findById(decodedToken.id)

    console.log("Found user",user);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        users: user._id
    })

    const newEntry = await blog.save()

    user.blogs = user.blogs.concat(newEntry._id)
    await user.save()

    response.status(201).json(newEntry)
})

module.exports = blogsRouter