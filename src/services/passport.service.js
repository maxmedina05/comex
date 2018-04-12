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
				return done(null, false, { message: 'No user found!' });
			}

			const isPasswordValid = await existingUser.validatePassword(password);
			if (!isPasswordValid) {
				return done(null, false, { message: 'Incorrect email or password.' });
			}

			done(null, existingUser);
		}
	)
);
