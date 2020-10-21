const router = require('express').Router();
const Course = require('../models/course');

const mapCartItems = (cart) => {
    return cart.items.map(c => ({
        ...c.courseId._doc, count: c.count
    }));
};

const totalPrice = (courses) => {
    return courses.reduce((total, course) => {
        return total += course.price * course.count;
    }, 0);
};

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
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = mapCartItems(user.cart);
    res.render('pages/cart', {
        title: 'Корзина',
        isCart: true,
        cart: courses,
        total: totalPrice(courses)
    });

});
router.delete('/remove/:_id', async (req, res) => {
    await req.user.removeFromCart(req.params._id);
    const user = await req.user.populate('cart.items.courseId').execPopulate();

    const courses = mapCartItems(user.cart);
    const cart = {
        courses,
        total: totalPrice(courses)
    };
    res.json(cart);
});
module.exports = router;