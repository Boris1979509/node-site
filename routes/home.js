const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/home', {title: 'Home', isHome: true});
});

module.exports = router;
