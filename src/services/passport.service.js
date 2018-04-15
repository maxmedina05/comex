const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../resources/user/user.schema');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			const existingUser = await User.findOne({ email });

			if (!existingUser) {
				return done('No existe ninguna cuenta atada a ese correo.', false);
			}

			const isPasswordValid = await existingUser.validatePassword(password);
			if (!isPasswordValid) {
				return done('Correo o contraseña incorrecta.', false);
			}

			done(null, existingUser);
		}
	)
);
