const mongoose = require('mongoose')
const Post = require('../models/Post')


// Create Post Controller

const createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        category: req.body.category || 'General',
        tag: req.body.tag || [],
        imageUrl: req.body.imageUrl || '',
        slug: req.body.slug || req.body.title.split(' ').join('_').toLowerCase()
    })

    post.save()
        .then(post => {
            res.status(201).json({
                message: "Post Created Successfully",
                post
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Server Error',
                error
            })
        })
}


// Get All Posts
const getAllPosts = (req, res, next) => {
    Post.find()
        .then(users => {
            res.status(200).json({
                users
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Server Error',
                error
            })
        })
}


// Get Single post by Id or slug

const getSinglePost = (req, res, next) => {
    let { id } = req.params
    
    if(mongoose.Types.ObjectId.isValid(id)) {

        Post.findById(id)
            .then(post => {
                if(post) {
                    res.status(200).json({
                        post
                    })
                }else{
                    res.status(204).json({
                        message: "NO post Found"
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Server Error',
                    error
                })
            })

    }else {

        Post.findOne({slug: id})
            .then(post => {
                if(post){
                    res.status(200).json({
                        post
                    })
                }else {
                    res.status(204).json({
                        message: "No post found"
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Server Error',
                    error
                })
            })
    }
}


// Upvote Controller

const upvote =(req, res, next) => {
    let {id} = req.params

    Post.findById(id)
        .then(post => {
            Post.findByIdAndUpdate(id, {$set: {vote: post.vote + 1}})
                .then(post1 => {
                    message: "Done vote"
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Server Error',
                        error
                    })
                })
        })
}
// Down vote Controller

const downvote =(req, res, next) => {
    let {id} = req.params

    Post.findById(id)
        .then(post => {
            Post.findByIdAndUpdate(id, {$set: {vote: post.vote - 1}})
                .then(post1 => {
                    message: "Done vote"
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Server Error',
                        error
                    })
                })
        })
}


// Edit a Post
const updatePost = (req, res, next) => {
    let {id} = req.params
    Post.findOneAndUpdate({_id: id}, {$set: req.body})
        .then(post => Post.findById(id))
        .then(post => {
            res.json({
                message: "Update Successfully",
                post
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Server Error',
                error
            })
        })
}

// Delete Post
const deletePost = (req, res, next) => {
    let { id } = req.params

    Post.findByIdAndDelete({_id: id})
        .then(post => {
            res.json({
                message: "Post Deleted Successfully",
                post
             })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Server Error", 
                error 
            })
        })
}

// Search 
const search = (req, res, next) => {
    let terms = req.body.terms 

    Post.find({$text: {$search: terms}})
        .then(results => {
            if(results.length === 0){
                res.json({
                    message: "No data found"
                })
            }else{
                res.json({
                    results
                })
            }
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({
                message: "server Error",
                error 
            })
            
        })
}




module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    upvote,
    downvote,
    updatePost,
    deletePost,
    search
}