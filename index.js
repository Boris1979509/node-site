const express = require('express');
const homePage = require('./routes/home');
const coursesPage = require('./routes/courses');
const addPage = require('./routes/add');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use('/', homePage);
app.use('/courses', coursesPage);
app.use('/add', addPage);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Start server on port ${PORT} ...`);
});