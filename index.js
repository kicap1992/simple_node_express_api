// create express
const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const formData = require('express-form-data');
const cors = require('cors');

const port = parseInt(process.env.PORT) || 3000; // port


// middleware
app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors())
app.use(cors())

// import routes
const api_routes = require('./routes/api');

// use routes
app.use('/api', api_routes);

// connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db")
})

// // if routes not found
// app.use((req, res, next) => {
//   res.status(404).send('404 not found');
// })

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


