const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());

const connectDB = require('./config/database');
connectDB(); // ✅

const userRoutes = require('./routes/user_routes');
const productRoutes = require('./routes/items_routes')

app.use('/product', productRoutes);
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})