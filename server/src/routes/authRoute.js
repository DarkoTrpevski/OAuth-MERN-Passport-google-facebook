const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account" }));
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/profile');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }), (req, res) => {
        console.log('Auth Facebook Callback!');
        console.log('Auth Facebook Callback!, request is : ', req);
        res.redirect('/profile')
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })
}