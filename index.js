const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const homeRouters = require('./routes/home');
const coursesRouters = require('./routes/courses');
const cartRouters = require('./routes/cart');
const addRouters = require('./routes/add');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');

/* next позволяет продолжить
 цепочку middleware (промежуточное программое обеспечение)
 если её не вызвать цепь остановиться
 */
app.use(async (req, res, next) => {
    try {
        req.user = await User.findById('5f9077665ef5591dc45c1e1b'); // Запись обьект пользователя в обьект request
        next();
    } catch (e) {
        console.log(e);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})); // For POST queries

/* All routes with prefix */
app.use('/', homeRouters);
app.use('/courses', coursesRouters);
app.use('/add', addRouters);
app.use('/cart', cartRouters);

/* Start APP */
(async () => {
    try {
        const url = 'mongodb://localhost:27017/node-site';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const user = await User.findOne();
        if (!user) {
            const newUser = new User({
                name: 'Boris',
                email: 'bobabonanadz@mail.ru',
                cart: {items: []}
            });
            await newUser.save();
        }
        app.listen(PORT, () => {
            console.log(`Start server on port ${PORT} ...`);
        });
    } catch (e) {
        console.log(e);
    }
})();