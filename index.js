require("dotenv").config({ path: 'config.env' });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('DB OK');
    }
)
.catch((error) => console.log('DB Failed' + error))

app.use(express.json());
app.listen( PORT, () => console.log('Server OK - PORT: ' + PORT));

app.use('/ping' , require('./src/routes'));