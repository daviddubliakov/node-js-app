const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://david:david2002@cluster0.i8xwsri.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      _db = client.db();
      console.log('[CONNECTED TO MONGODB SERVER]');
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No databse found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
