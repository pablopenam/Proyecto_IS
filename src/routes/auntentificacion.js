const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req,res) =>{

        res.render('auth/signup');

});
router.get('/signin', (req,res) =>{
    res.render('auth/signin');
});
router.get('/principal', (req,res) =>{
    res.render('cursos/menu_principal');
});

router.post('/signin',(req,res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
      })(req, res, next);
    });

router.post('/signup', passport.authenticate('local.signup',{
            successRedirect:'/profile',
            failureRedirect: '/signup',
            failureFlash: true
}));
        
router.post('/signin', (req,res) =>{

    passport.authenticate('local.signin',{

    });

})


router.get('/profile', (req,res) =>{
    res.send('Esto es profile');
});




   

module.exports = router;