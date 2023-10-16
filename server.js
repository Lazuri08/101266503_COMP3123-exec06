const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const noteRoutes = require('./routes/NoteRoutes'); // Corrected import path
const DB_URL = "mongodb://localhost:27017/admin";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit(1);
});

app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
