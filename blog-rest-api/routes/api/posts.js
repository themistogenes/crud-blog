const express = require('express');
const router = express.Router();

// Posts Model
const Posts = require('../../models/Posts');

// @routes POST api/posts
// @desc Create a post
router.post('/', async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const post = await newPost.save();
    if(!post) throw Error('Something went wrong while saving the post.');
    res.status(200).json(post);
  } catch(err) {
    res.status(400).json({ msg: err});
  }
})

// @routes GET api/posts/:id
// @desc Read one post
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if(!post) throw Error('Item not found.');
    res.status(200).json(post);
  } catch(err) {
    res.status(400).json({msg: err});
  }
})

// @routes GET api/posts
// @desc Read all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    if(!posts) throw Error('No items');
    res.status(200).json(posts);
  } catch(err) {
    res.status(400).json({msg: err});
  }
})

// @routes PATCH api/posts/:id
// @desc Update a post
router.patch('/:id', async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error('Post to be updated not found.');
    res.status(200).json({success: true});
  } catch(err) {
    res.status(400).json({msg: err});
  }
})

// @routes DEL api/posts/:id
// @desc Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if(!post) throw Error('Post to be deleted not found.');
    res.status(200).json({success: true});
  } catch(err) {
    res.status(400).json({msg: err});
  }
})

module.exports = router;