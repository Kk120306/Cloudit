const passport = require("passport");

function getLogInForm(req, res) {
    if (req.isUnauthenticated()) {
        res.render("log-in-form", {
            errors : []
        });
    } else {
        res.redirect("/");
    }
}

function handleLogin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); 
        }
        if (!user) {
            const errors = [{ msg: typeof info.message === 'string' ? info.message : info.message[0] }];
            return res.render('log-in-form', {
                errors: errors
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); 
            }
            res.redirect('/');
        });
    })(req, res, next);
}


module.exports = {
    getLogInForm,
    handleLogin
};
