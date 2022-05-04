const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/', require('./router'));


app.listen(process.env.PORT | 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT | 3000));
});