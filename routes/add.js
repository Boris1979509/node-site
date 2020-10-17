const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('pages/add', {title: 'Add courses', isAdd: true});
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;