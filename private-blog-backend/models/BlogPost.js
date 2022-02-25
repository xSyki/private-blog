const mongoose = require('mongoose');
const dateOptions = {
    weekday: 'lo'
}

const BlogPostSchema = new mongoose.Schema({
    cretor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: false
    },
    audio: {
        type: 'string',
        required: false
    },
    created_at: {
        type: 'string',
        default: new Date().toISOString()
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;