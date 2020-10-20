const router = require('express').Router();
const Card = require('../models/card');
const Course = require('../models/course');

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body._id);
    await Card.add(course);
    res.redirect('/card');
});
router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('pages/card', {
        title: 'Корзина',
        isCard: true,
        card: card.courses,
        total: card.total
    })
});
router.delete('/remove/:_id', async (req, res) => {
    const _id = req.params._id;
    const card = await Card.remove(_id);
    await res.json(card);
});
module.exports = router;