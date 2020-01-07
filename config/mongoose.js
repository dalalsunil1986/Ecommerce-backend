const mongoose = require('mongoose');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rohit236c:23511513@ecommerce-i7y6t.mongodb.net/test";

mongoose
    .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    retryWrites: true,
    w: "majority"
})
    .then(() => {
        console.log(`db connected atlas`);
    })
    .catch(err => console.log(err));