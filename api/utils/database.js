const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect("mongodb+srv://ritika1234:08414802718@users.h6wod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then((client) => {
        console.log("connected");
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
    });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

