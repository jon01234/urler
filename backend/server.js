// to access the .env variables
require('dotenv').config();

const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json({ extended:false }));
app.use(cors());

app.use('/', require('./routes/index.js'));
app.use('/api/url', require('./routes/url.js'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

