const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const chalk = require('chalk')

const { authRoutes, jobRoutes, jobsRoutes, skillListRoutes, userRoutes } = require('./routes')

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
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api', authRoutes);
app.use('/api/job', jobRoutes);
app.use('/api', jobsRoutes);
app.use('/api', skillListRoutes);
app.use('/api', userRoutes);

//port
app.listen(3001, () => console.log(chalk.green('server running port 3001')));