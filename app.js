

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*',cors());

const router = express.Router();

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
const categoriesRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');


const api = process.env.API_URL || '/api';

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`,productRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`,orderRoutes);

// MongoDB connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection is ready');
  })
  .catch((err) => {
    console.error(err);
  });



// Start server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
