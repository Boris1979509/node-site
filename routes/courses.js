const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/courses', {title: 'Courses', isCourses: true});
});

module.exports = router;