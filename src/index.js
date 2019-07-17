/**
 * SE HACE EL LLAMADO A LOS DIFERENTES PAQUES QUE A SU VEZ SON ASIGNADOS A CONSTANTES PARA LUEGO SER UTLIZADOS
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');


const { database } = require('./keys');

//initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({

    secret: 'pablo',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)

}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());



/**ESTAS SON VARIABLES GLOBALES*/
app.use((req, res, next) => {

    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;

    next();
});

/** AQUI SE CONFIGURARAN LAS RUTAS PRINCIPALES */
app.use(require('./routes'));
app.use(require('./routes/auntentificacion'));
app.use('/curso', require('./routes/curso'));
app.use('/rubrica', require('./routes/rubricas'));
app.use('/carpeta', require('./routes/carpeta'));
app.use('/usuario', require('./routes/usuario'));
app.use('/listaCotejo', require('./routes/lista_cotejo'));
app.use('/evaluacion', require('./routes/evaluacion'));

//public
app.use(express.static(path.join(__dirname, 'public')));


/**AQUI LA APLICACCION ESCUCHA EN PUERTO EN DONDE SE CONECTARA AL SERVIDOR */

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});