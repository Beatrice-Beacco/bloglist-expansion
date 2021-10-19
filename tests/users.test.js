const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

//Adds an invalid user (fields shorter than 3 characters or absent)
test('adding an invalid user', async () => {

    const invalidUser = {
        username: "",
        name: "Ferdinando",
        password: "bb"
    }

    const result = await api
        .post('/api/blogs')
        .send(invalidUser)
        .expect(400)
    
    expect(result).toThrow('ValidationError')
    
})


afterAll(() => {
    mongoose.connection.close()
})