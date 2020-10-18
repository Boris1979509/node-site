const router = require('express').Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    res.render('pages/courses', {
        title: 'Courses',
        isCourses: true,
        courses: courses
    });
});

router.get('/:_id', async (req, res) => {
    const course = await Course.getById(req.params._id);
    res.render('pages/course', {title: course.title, course});
});

module.exports = router;