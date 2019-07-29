const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');

// DB config
const keys = require('./config/keys');

const app = express();
app.use(cors());

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

// Express Session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Connect flash
app.use(flash());

// Global Vars Middleware
app.use((req, res, next) => {
  // set global variables by using res.locals
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));































