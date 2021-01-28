const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await User.findById(id);
  done(null, usuario);
});

// passport.use('local-signup', new LocalStrategy({
//   usuarionameField: 'correo',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async (req, correo, password, done) => {
//   const usuario = await User.findOne({'correo': correo})
//   console.log(usuario)
//   if(usuario) {
//     return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
//   } else {
//     const newUser = new User();
//     newUser.correo = correo;
//     newUser.password = newUser.encryptPassword(password);
//   console.log(newUser)
//     await newUser.save();
//     done(null, newUser);
//   }
// }));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, correo, password, done) => {
  const usuario = await User.findOne({correo: correo});
  if(!usuario) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if(!usuario.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, usuario);
}));
