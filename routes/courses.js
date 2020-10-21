const router = require('express').Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.render('pages/courses', {
        title: 'Курсы',
        isCourses: true,
        courses: courses
    });
});

router.get('/:_id', async (req, res) => {
    const course = await Course.findById(req.params._id);
    res.render('pages/course', {title: course.title, course});
});
/* Edit course */
router.get('/:_id/edit', async (req, res) => {
    const course = await Course.findById(req.params._id);
    if (!req.query.allow) {
        return res.redirect('/');
    }
    res.render('pages/course-edit', {
        title: `Редактировать курс "${course.title}"`,
        course
    });
});
/* Update course */
router.post('/edit', async (req, res) => {
    await Course.findByIdAndUpdate(req.body._id, {
        $set: {
            title: req.body.title,
            price: req.body.price,
            image: req.body.image
        }
    });
    res.redirect('/courses');
});
/* Remove course */
router.post('/remove', async (req, res) => {
    try {
        await Course.deleteOne({_id: req.body._id});
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});
module.exports = router;