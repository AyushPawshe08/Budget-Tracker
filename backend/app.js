const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const db = require('./config/mongoose-connection')
const app = express();
const port = process.env.PORT || 5000;
const flash =require("connect-flash")
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const verifyJWT = require('./middlewares/verifyJWT')

// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// MongoDB connection
require('./config/db');
app.use('/api/expenses', verifyJWT,expenseRoutes);
app.use('/api/income' , verifyJWT,incomeRoutes);

app.use(flash())
// Routes

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});