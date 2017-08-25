let express = require('express');
let router = express.Router();
let models = require('../models');
let util = require('../util');

router.get('/reg', function(req, res, next) {
    res.render('user/reg');
});
// 注册
router.post('/reg', function (req, res) {
    let user = req.body;
    if (user.password != user.repassword) {
        req.flash('err', '注册失败，请再试一次！');
        res.redirect('back');
    } else {
        req.body.password = util.md5(req.body.password);

        models.User.create(req.body, function (err, doc) {
            if (err) {
                req.flash('err', '注册失败，请再试一次！');
            } else {
                req.flash('suc', '用户注册成功');
                res.redirect('/user/login');
            }
        });
    }
});

router.get('/login', function (req, res) {
    res.render('user/login');
});
// 登录
router.post('/login', function (req, res) {
    req.body.password = util.md5(req.body.password);
    models.User.findOne({username: req.body.username, password: req.body.password}, function (err, doc) {
        if (err) {
            req.flash('err', '用户登录失败，请重新登录！');
            res.redirect('back');
        } else {
            if (doc) {
                req.session.user = doc;
                req.flash('suc', '用户登录成功');
                res.redirect('/');
            } else {
                req.flash('err', '用户登录失败，请重新登录！');
                res.redirect('back');
            }
        }
    });
});



router.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('suc', '用户已退出');
    res.redirect('/');
});

module.exports = router;
