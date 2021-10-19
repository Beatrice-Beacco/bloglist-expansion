const Blog = require('../models/blog')

const initialBlogs = [{
    name: "Post",
    author: "Me",
    link: "coolblog.com",
    likes: 1,
},
{
    name: "Post 2",
    author: "Me",
    link: "coolblog.com",
}]

const initialUsers = [
    {
        "username": "Beuccia",
        "name": "Bea",
        "notes": [],
        "id": "61633ebc7eee58450b2983c6"
    },
    {
        "username": "Cicciotto",
        "name": "Ferdinando",
        "notes": [],
        "id": "616341cccb4071151bf2f73b"
    },
    {
        "username": "bbb",
        "name": "Ferdinando",
        "notes": [],
        "id": "616344021d6a3fe9f33088f9"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    console.log(blogs);
    return blogs.map(blog => blog.toJSON())
}


module.exports = {initialBlogs, initialUsers, blogsInDb}
