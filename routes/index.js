const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard page, with authentication middleware ensureAuthenticated passed as second param to protect logged in routes
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  // When logged in you have access to req.user
  res.render('dashboard', {
    name: req.user.name
  }));

module.exports = router;