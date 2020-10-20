const router = require('express').Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    res.render('pages/courses', {
        title: 'Курсы',
        isCourses: true,
        courses: courses
    });
});

router.get('/:_id', async (req, res) => {
    const course = await Course.getById(req.params._id);
    res.render('pages/course', {title: course.title, course});
});
/* Edit course */
router.get('/:_id/edit', async (req, res) => {
    const course = await Course.getById(req.params._id);
    if (!req.query.allow) {
        return res.redirect('/');
    }
    res.render('pages/course-edit', {
        title: `Редактировать курс "${course.title}"`,
        course
    });
});
/* Course update POST */
router.post('/edit', async (req, res) => {
    await Course.update(req.body);
    res.redirect('/courses');
});
module.exports = router;