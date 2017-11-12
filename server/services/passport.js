const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('./../config')

const { User } = require('./../models/User')

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (err) return done(err)
		if (!user) return done(null, false, 'Invalid Credentials')
		user.comparePassword(password, (err, isMatch) => {
			if (err) return done(err)
			if (isMatch) return done(null, user)
		})
		return done(null, false, 'Invalid Credentials')
	})
})

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
	secretOrKey: process.env.JWT_SECRET
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload._id, (err, user) => {
		if (err) return done(err, false)
		if (!user) return done(null, false, 'Invalid Credentials')
		done(null, user)
	})
})

passport.use(localLogin)
passport.use(jwtLogin)
