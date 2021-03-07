const User = require('../models/user');
const { validationResult } = require('express-validator/check');


exports.getLogin = ( reg, res, next ) => {
    let message = reg.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.getSignup = ( reg, res, next ) => {
    let message = reg.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/signup',{
        path: '/signup',
        pageTitle: 'Sign Up',
        isAuthenticated: false,
        errorMessage: message,
        oldInput: {
          email: '',
          password: '',
          confirmPassword: ''
        }
    });
}

exports.postLogin = ( reg, res, next ) => {

    console.info('Hi from post Login method now');

    const email = reg.body.username;
    const password = reg.body.password;
  
    const errors = validationResult(reg);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        isAuthenticated: false,
      });
    }

    User.findByEmail(email, function(user){
        if(!!user){
            reg.session.isLoggedIn = true;
            reg.session.user = user;
            reg.session.save(err=>{
                console.log('Login successfully');
                return res.redirect('/');
            });
        }else {
            return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login again',
                errorMessage: "Incorrect details",
                isAuthenticated: false,
              });
        }
    })
    
}

exports.postSignup = ( req, res, next ) => {
    const email = req.body.email;
    const password = req.body.password;
    
     errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword
        }
      });
    }
    

    doMatch = (password===req.body.confirmPassword);   
    if(doMatch && email!=''){
        req.session.isLoggedIn = false;
        let newUser = new User();
        newUser.name = email;
        newUser.password = password;
        newUser.save();
        
        return req.session.save(err => {
            console.log(err);
             res.redirect('/login');
        });
    }
    req.flash('error', 'Invalid email or password.');
    res.redirect('/signup');      
}

exports.postLogout = ( reg, res, next ) => {
    reg.session.destroy(err=>{
        console.log('destroying session');
        // console.log(err);
        res.redirect('/');
    })
}