const route = require('express').Router()
const { 
    createPost,
    getAllPosts,
    getSinglePost,
    upvote,
    downvote,
    updatePost,
    deletePost,
    search
}= require('../controllers/postController')


// Get all post
route.get('/', getAllPosts)

// Get single post
route.get('/:id', getSinglePost)

//Psot a new post
route.post('/', createPost)

 // Edit post by ID or Slug
route.patch('/:id', updatePost)

// Delete Posts by id
route.delete('/:id', deletePost )

// Search Posts
route.post('/:terms', search)

// Add Upvote
route.get('/:id/upvote', upvote)
// Add down vote
route.get('/:id/downvote', downvote)


module.exports = route 