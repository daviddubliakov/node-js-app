const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://david:david2002@cluster0.i8xwsri.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
      console.log('[CONNECTED TO MONGODB SERVER]');
      callback(client);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;
