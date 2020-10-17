const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/add', {title: 'Add courses', isAdd: true});
});

module.exports = router;