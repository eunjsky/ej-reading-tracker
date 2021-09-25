const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: true
});

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
//   // useCreateIndex: true
// });
// // I need to npm i dotenv

const db = mongoose.connection;

db.on("connected", function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
