const express = require('express');
const homeRouters = require('./routes/home');
const coursesRouters = require('./routes/courses');
const cardRouters = require('./routes/card');
const addRouters = require('./routes/add');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); // For POST queries

/* All routes with prefix */
app.use('/', homeRouters);
app.use('/courses', coursesRouters);
app.use('/add', addRouters);
app.use('/card', cardRouters);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Start server on port ${PORT} ...`);
});