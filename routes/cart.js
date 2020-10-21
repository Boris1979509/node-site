const router = require('express').Router();
const Course = require('../models/course');

/* Add to cart */
router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body._id); /* Select data course */
    try {
        await req.user.addToCart(course);
        res.redirect('/cart');
    } catch (e) {
        console.log(e);
    }
});
router.get('/', async (req, res) => {
    const user = await req.user.populate('courseId');
    // res.render('pages/cart', {
    //     title: 'Корзина',
    //     isCard: true,
    //     card: card.courses,
    //     total: card.total
    // })
    res.json(user);
});
router.delete('/remove/:_id', async (req, res) => {
    const _id = req.params._id;
    const card = await Cart.remove(_id);
    await res.json(card);
});
module.exports = router;