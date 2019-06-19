const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotloggedin, isLoggedIn } = require('../lib/auth')


router.get('/signup', isNotloggedin, (req, res) => {

    res.render('auth/signup');

});
router.post('/signup', isNotloggedin, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));




router.get('/signin', isNotloggedin, (req, res) => {
    res.render('auth/signin');
});



router.post('/signin', isNotloggedin, (req, res, next) => {

    passport.authenticate('local.signin', {
        successRedirect: '/carpeta/principal',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)


});


router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;