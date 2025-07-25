const connection = require('./config/config.js');
const express = require('express');
const cors = require('cors');
const router = require('./routes/todo.routes.js'); 

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Middleware (Order is important!)
app.use(express.json()); 
// Enable CORS middleware
const corsOptions = {
    origin: true, // Allow requests from any origin (for development)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Mount your todo routes under the /api path
app.use('/api', router);

// Start the Express server
app.listen(port, () => {
    console.log(`Server listening at http://${hostname}:${port}/`);
});

// Connect to MongoDB
connection();