const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const compression = require('compression');

const errorHandler = require('./utils/errorHandler.js');
const healthCheck = require('./utils/healthRoute.js')
const authRoutes = require('./routes/authRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');
const initializeDatabase = require('./config/tables.js');


dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());

//Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', healthCheck);

//Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await initializeDatabase();
    console.log(`Server running on port ${PORT}`);
});