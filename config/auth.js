module.exports = {
  // Will be used as middleware for authentification. Can be added to any route that needs to be protected
  ensureAuthenticated: (req, res, next) => {
    // isAuthenticated is a method for req
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/users/login');
  }
}