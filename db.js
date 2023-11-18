// module.exports = {
//   connectToDb: (cb) => {
//     const client = new MongoClient(MONGODB_URI);

//     client
//       .connect()
//       .then(() => {
//         dbConnection = client.db();
//         return cb();
//       })
//       .catch((err) => {
//         console.error("Error connecting to MongoDB:", err);
//         return cb(err);
//       });
//   },
//   getDb: () => dbConnection,
// };
