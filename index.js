const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const dotenv = require('dotenv')
const { jobRoutes, jobsRoutes, skillListRoute, userRoute, authRoute } = require('./routes');
const bodyParser = require('body-parser');

dotenv.config()

console.log({ DB_CONNECT: process.env.DB_CONNECT })

// mongoose & express config
const app = express();
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
})
.then(() => console.log(chalk.green('db connect')))
.catch((err) => console.error(chalk.red({ err: JSON.stringify(err) })));

mongoose.set('debug', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
app.use('/api', jobsRoutes);
app.use('/api', jobRoutes);
app.use('/api', skillListRoute);
app.use('/api', userRoute);
app.use('/api', authRoute);

//port
app.listen(3001, () => console.log(chalk.green('server running port 3001')));