const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard page, with authentication middleware ensureAuthenticated passed as second param to protect logged in routes
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  // When logged in you have access to req.user
  res.render('dashboard', {
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    age: req.user.age,
    email: req.user.email,
    dateUpdated: req.user.dateUpdated,
    admin: req.user.admin,
    dateCreated: req.user.dateCreated,
    lastActive: req.user.lastActive
  }));

module.exports = router;