

function connectMongodb() {
  // const MongoClient = require('mongodb').MongoClient;
  // const uri = "mongodb+srv://lishun:lishuncai@cluster0-mbwbk.mongodb.net/test?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });

  const mongoose = require('mongoose');
  const mongoDB = process.env.MONGODB_URI +'?retryWrites=true&w=majority';
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
}
module.exports  = connectMongodb
