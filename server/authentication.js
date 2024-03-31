import 'dotenv/config';
import passport from 'passport';
import User from './database.js';
import { Strategy as LocalStrategy } from 'passport-local';
// eslint-disable-next-line no-unused-vars
import GoogleStrategy from 'passport-google-oauth20'
// eslint-disable-next-line no-unused-vars
import FacebookStrategy from 'passport-facebook'

// --------------------------------  Strategy ----------------------------------------------------

passport.use(new LocalStrategy((usernameOrEmail, password, done) => {
    console.log(usernameOrEmail);
    User.findOne( { email: usernameOrEmail } )
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username or email.' });
            }

            // Use the authenticate method provided by passport-local-mongoose
            user.authenticate(password, (err, authenticatedUser) => {
                if (err) {
                    return done(err);
                }

                if (!authenticatedUser) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                // If authentication is successful, return the user
                return done(null, authenticatedUser);
            });
        })
        .catch(err => {
            return done(err);
        });
}));


// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "https://filmyhub.jeetbaldha.tech/auth/facebook/user",
//     profileFields: ['id', 'displayName', 'photos', 'email']
// },
//     async function (accessToken, refreshToken, profile, cb) {
//         try {
//             let nuser = await User.findOne({ facebookId: profile.id });

//             if (!nuser) {
//                 nuser = new User({
//                     facebookId: profile.id,
//                     username: profile.displayName,
//                 })
//                 await nuser.save();

//                 return cb(null, nuser);
//             }
//         } catch (error) {
//             return cb(error, null);
//         }
//     }
// ));


passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:5173/auth/google/user",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    async function (accessToken, refreshToken, profile, cb) {
        // Use the findOrCreate method provided by the plugin
        console.log("heke")
        try {
            let user = await User.findOne({ googleId: profile.id });
            const username = profile.displayName.replace(' ', '');

            if (!user) {
                user = new User({
                    googleId: profile.id,
                    username: username
                });
            }

            await user.save();

            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));



// ---------------------------------------------------------------- Request handeling ----------------------------------------------------------------
export const signup = (req, res) => {

    try {
        User.register({ username: req.body['username'], email: req.body.email }, req.body['password'], function (err, nuser) {
            if (err) {
                res.status(400).send({message: err.message});
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.status(200).send({message: 'hello ' + req.body.username + '!',userID:nuser._id,userName:req.body.username});
                });
            }
        })
    } catch (error) {
        res.status(400).send({message: error.message});
    }

}

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info.message);
            return res.status(200).json({
                message: info.message,
                authenticated: false
            });
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.status(200).json({
                message: 'User login successful',
                userId: user._id,
                username: req.body.username
            });
        });
    })(req, res, next);
};


export const logout = (req, res) => {
    req.logout(function (err) {
        // eslint-disable-next-line no-undef
        if (err) { return next(err); }
        res.redirect('/');
    })
};

export const googleAuth = (req, res) => {
    passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
        res.redirect('/');
    })
}

export const facebookAuth = (req, res) => {
    passport.authenticate('facebook', { failureRedirect: '/login' })(req, res, () => {
        res.redirect('/');
    })
}