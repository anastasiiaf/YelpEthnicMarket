// declaration of several variables in line
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  ethnicMarket = require('./models/market'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds');

var marketRoutes = require('./routes/market'),
  commentRoutes = require('./routes/comments'),
  indexRoutes = require('./routes/index');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/YelpEthnicMarket?retryWrites=true&w=majority',
); // check how to encode password!!!

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // __dirname - refers to directory where this file is running
// seed: empties db and seeds with some data - easier to check if next models (comments) work
//seedDB();

app.use(methodOverride('_method'));
app.use(flash());

// PASS CONFIGURATION
app.use(
  require('express-session')({
    secret: 'HIIIII',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware which pass currentUser:req.user to all ejs in all routes
// function will be called in all routes
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/market', marketRoutes);
app.use('/market/:id/comments', commentRoutes);

app.listen(3000, process.env.IP, function () {
  console.log('YelpEthnicMarket server has started!');
});
