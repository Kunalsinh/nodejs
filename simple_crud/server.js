const express = require('express');

const app = express();
app.use(express.json());

const router = require('./router/student.route')

app.use('/api', router);
app.listen(5000, () => {
    console.log("Running!")
})
