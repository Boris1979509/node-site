const router = require('express').Router();
const Course = require('../models/course');
router.get('/', (req, res) => {
    res.render('pages/add', {title: 'Добавить курс', isAdd: true});
});

router.post('/', async (req, res) => {
    const course = new Course(req.body.title, req.body.price, req.body.image);
    await course.save();
    res.redirect('/courses');
});

module.exports = router;