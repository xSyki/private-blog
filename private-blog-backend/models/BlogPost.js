const mongoose = require('mongoose');
const dateOptions = {
    weekday: 'lo'
}

const BlogPostSchema = new mongoose.Schema({

    content: {
        type: 'string',
        required: true
    },
    photo: {
        type: 'string',
        required: false
    },
    audio: {
        type: 'string',
        required: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: 'string',
        default: new Date().toISOString()
    }
})

BlogPostSchema.statics.deleteById = function(_id) {
    return this.deleteOne({ _id: _id });
  };

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;