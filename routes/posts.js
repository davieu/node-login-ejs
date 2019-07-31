const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

const User = require('../models/User')
const Post = require('../models/Post');

router.get('/create', ensureAuthenticated, async (req, res) => {

  req.user.posts.push({post: 'aaa'})
  // console.log(req)
  // console.log(req.user)
  // res.send(req.user)
  // const post = new Post(req.body);
  // try {
  //   const result = await post;
  //   res.send(result)
  // } catch(err) {
  //   res.send({
  //     err,
  //     msg: 'Could not post'
  //   })
  // }
});

module.exports = router;