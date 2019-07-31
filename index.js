const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(cors());

// Passport config
require('./config/passport')(passport);

// DB config
const keys = require('./config/keys');

// Connect to Mongo
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars Middleware
app.use((req, res, next) => {
  // set global variables by using res.locals
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.email = req.flash('email');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));































