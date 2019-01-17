const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/database');
// db.SequelizeDB.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err))
mongoose
  .connect(
    db.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();
app.use(express.static('dist'));

app.use('/api/accidents', require('./routes/accidents'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));