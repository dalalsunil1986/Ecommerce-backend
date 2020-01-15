const mongoose = require('mongoose');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
let uri = "mongodb+srv://rohit236c:23511513@ecommerce-i7y6t.mongodb.net/test";
let key = process.env.NODE_ENV === 'dev'
    ? process.env.DATABASE_DEV
    : uri;
console.log(key, "database key");
mongoose
    .connect(key, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    retryWrites: true,
    w: "majority"
})
    .then(() => {
        console.log(`db connected at ${key}`);
    })
    .catch(err => console.log(err));