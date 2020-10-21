const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const homeRouters = require('./routes/home');
const coursesRouters = require('./routes/courses');
const cardRouters = require('./routes/card');
const addRouters = require('./routes/add');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})); // For POST queries

/* All routes with prefix */
app.use('/', homeRouters);
app.use('/courses', coursesRouters);
app.use('/add', addRouters);
app.use('/card', cardRouters);

/* Start APP */
(async () => {
    try {
        const url = 'mongodb://localhost:27017/node-site';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`Start server on port ${PORT} ...`);
        });
    } catch (e) {
        console.log(e);
    }
})();