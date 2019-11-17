const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log(`db connected at ${process.env.DATABASE}`);
    })
    .catch(err => console.log(err));