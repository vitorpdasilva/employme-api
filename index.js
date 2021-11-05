const uri = "mongodb+srv://employme:vitor123@cluster0.b6tyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const jobRoutes = require('./routes/jobs');
const skillListRoute = require('./routes/skillList');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const User = require('./models/User');

const initializePassport = require('./passport-config');

initializePassport(passport, email => {
  User.find({ username: email }, (err, user) => {
    return user;
  })
});

// mongoose & express config
const app = express();
mongoose.connect(uri, {
  useNewUrlParser: true,
})
.then(() => console.log(chalk.green('db connect')))
.catch((err) => console.error(chalk.red(err)));

mongoose.set('debug', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(flash());
app.use(session({
  secret: 123, // move to .env later
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api', jobRoutes);
app.use('/api', skillListRoute);
app.use('/api', userRoute);
app.use('/api', authRoute);

//port
app.listen(3001, () => console.log(chalk.green('server running port 3001')));