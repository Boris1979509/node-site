const router = require('express').Router();
const Course = require('../models/course');
router.get('/', (req, res) => {
    res.render('pages/add', {title: 'Добавить курс', isAdd: true});
});

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        userId:  req.user._id // Можно написать просто req.user
    });
    try {
        await course.save();
        res.redirect('/courses'); // save in db
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;