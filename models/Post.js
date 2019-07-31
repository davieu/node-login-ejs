const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  post: {
    type: String
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  datePostUpdated: {
    type: Date,
    default: null
  },
  username: {
    type: String,
    default: 'test'
  }
})

const Post = mongoose.model('Post', PostSchema, 'posts');

module.exports = Post;