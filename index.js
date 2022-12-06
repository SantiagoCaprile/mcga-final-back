require("dotenv").config({ path: 'config.env' });
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3100;
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('DB OK');
    }
)
.catch((error) => console.log('DB Failed' + error))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(express.json());
app.listen( PORT, () => console.log('Server OK - PORT: ' + PORT));

app.use('/ping' , require('./src/routes'));
app.use('/users' , require('./src/routes/users'));
app.use('/matches' , require('./src/routes/matches'));