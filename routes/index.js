var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
		if (req.isAuthenticated()) {
			res.redirect('/user');
		} else {
			res.render('index-data', { message: req.flash('message') });
		}
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/user',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/user',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/user', isAuthenticated, function(req, res){
		res.render('user-splash', { user: req.user });
	});

	/* GET sendvoice Page */
	router.get('/user/send', isAuthenticated, function(req, res){
		res.render('sendvoice', { user: req.user });
	});

	/* GET requestvoice Page */
	router.get('/user/req', isAuthenticated, function(req, res){
		res.render('requestvoice', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	return router;
}
