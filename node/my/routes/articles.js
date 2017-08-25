let express = require('express');
let router = express.Router();

router.get('/add', function (req, res) {
    res.render('index', {title: '发表文章'});
});

module.exports = router;