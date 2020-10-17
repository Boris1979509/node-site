const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('pages/home', {title: 'Home page', isHome: true});
});
app.get('/courses', (req, res) => {
    res.render('pages/courses', {title: 'Courses page', isCourses: true});
});
app.get('/add', (req, res) => {
    res.render('pages/add', {title: 'Add page', isAdd: true});
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Start server on port ${PORT} ...`);
});