const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PW}@localhost:27017/mikolajs_blog`, (err) => {
    console.log(err);
    console.log('Connected to db');
});