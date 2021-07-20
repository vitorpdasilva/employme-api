const uri = "mongodb+srv://employme:vitor123@cluster0.b6tyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const jobRoutes = require('./routes/jobs');
const app = express();

mongoose.connect(uri, {
  useNewUrlParser: true,
})
.then(() => console.log('db connect'))
.catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', jobRoutes);

app.listen(3001, () => console.log('server running port 3001'));