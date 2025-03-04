const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

require('./config/database').connect();

const userRoutes = require('./routes/user_routes');
const productRoutes = require('./routes/items_routes')

app.use('/product', productRoutes);
app.use('/api/auth', userRoutes);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})