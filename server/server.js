const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
const router = require('./routes/router');

app.use(router);

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})