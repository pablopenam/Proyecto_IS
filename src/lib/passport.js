const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");
const flash = require("connect-flash");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "Rut_Usuario",
      passwordField: "Password_Usuario",
      passReqToCallback: true
    },
    async (req, Rut_Usuario, Password_Usuario, done) => {
      console.log(req.body)
     const rows = await pool.query('SELECT * FROM usuarios WHERE Rut_Usuario = ?', [Rut_Usuario]);
      if(rows.length > 0){
        const user = rows[0];
        console.log(user)
        console.log(user.Password_Usuario)
        console.log(Password_Usuario)
        const validPassword = await helpers.matchPassword(Password_Usuario, user.Password_Usuario);
        console.log(validPassword)
        if (validPassword){
          done(null, user,req.flash('success', 'bienvenido'));
          console.log('1')
        }
        else{
          done(null, false, req.flash('message', 'Contraseña incorrecta'));
          console.log('2')
        }
      }
      else{
        console.log('3')
        return done(null, false,req.flash('message', 'Usuario no existe'));
      
      }


    }));

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "Rut_Usuario",
      passwordField: "Password_Usuario",
      passReqToCallback: true
    },
    async (req, Rut_Usuario, Password_Usuario, done) => {
      const {
        NombreP_Usuario,
        NombreS_Usuario,
        ApellidoP_Usuario,
        ApellidoM_Usuario,
        Email_Usuario
      } = req.body;
      const nuevoUsuario = {
        Rut_Usuario,
        NombreP_Usuario,
        NombreS_Usuario,
        ApellidoP_Usuario,
        ApellidoM_Usuario,
        Email_Usuario,
        Password_Usuario,
        Tipo_Usuario: "Normal"
      };
      nuevoUsuario.Password_Usuario = await helpers.encryptPassword(
        Password_Usuario
      );
      const result = await pool.query("INSERT INTO usuarios SET ?", [
        nuevoUsuario
      ]);

      return done(null, nuevoUsuario);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.Rut_Usuario);
});

passport.deserializeUser(async (Rut_Usuario, done) => {
  const rows = await pool.query(
    "SELECT * FROM usuarios WHERE Rut_Usuario = ?",
    [Rut_Usuario]
  );
  done(null, rows[0]);
});
