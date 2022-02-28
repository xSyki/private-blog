const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const authUser = require('../middleware/auth');

router.post('/', authUser, async(req, res) => {
    const {content, photo, audio, created_at} = req.body;
    try {
        const article = await BlogPost.create({content, photo, audio, creator: req.user.id, created_at})
        req.user.articles.push(article._id);
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.get('/', authUser, async(req, res) => {
    try {
        const articles = await BlogPost.find();
        res.json(articles.filter(post => post.creator == req.user.id))
    } catch (e) {
        res.status(404).json(e.message);
    }
})

router.delete('/', authUser, async(req, res) => {
    const { id } = req.body;
    try {
        const article = await BlogPost.deleteById(id);
        res.status(200).json(article);
    } catch (e) {
        res.status(404).json(e.message);
    }
})

router.post('/edit', authUser, async(req, res) => {
    const {id, content} = req.body;
    try {
        await BlogPost.updateOne(
            {
                _id: id
            },
            {
                content: content,
            });
        res.status(200);
    } catch (e) {
        res.status(404).json(e.message);
    }
})

module.exports = router;