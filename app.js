const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const session = require('express-session');

const errorController = require('./controllers/error');
const User = require('./models/user');

const flash = require('connect-flash');


const app = express();
const port = 3000;

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const mainRoutes  = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/css',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use(express.static(__dirname + '/styles'));
// app.use('/favicon.ico', express.static(__dirname + '/public/favicon.ico'));
app.use(flash());

app.use(
    session({
        secret: 'my secret',
        resave: false, 
        saveUninitialized: false, 
        // store: store in use for moongo
    })
);

// app.use( (req, res, next) => {
//     if(!req.session.user){
//         return next();
//     }

//     // User.findMe(req.session.user._id)
//     //     .then(user => {
//     //         req.user = user;
//     //         next();
//     //     })
//     //     .catch (err => console.log(err));

// })

app.use('/admin',adminRoutes);

app.use(mainRoutes);

app.use(authRoutes);

app.use(errorController.get404);

app.listen(port,()=>{
    console.log(`My app listening at port ${port}`);
});
