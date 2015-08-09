/* I can't figure out how to use multiple route files at the moment.
	so this file does nothing right now(august 9th 2015) */

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

	/* GET Registration Page */
	router.get('/user/send', isAuthenticated, function(req, res){
		res.render('sendvoice', { user: req.user });
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/user',
		failureRedirect: '/signup',
		failureFlash : true
	}));


	/* GET Home Page */
	router.get('/user', isAuthenticated, function(req, res){
		console.log('working...');
		res.render('user-splash', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
