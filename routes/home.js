const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/home', {title: 'Главная страница', isHome: true});
});

module.exports = router;
