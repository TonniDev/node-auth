/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *08/01/17-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';
const mongoose = require('mongoose');
//const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//require('../app/models/User');
//const User = require('../app/models/User.js');

module.exports = function(passport){

    let User = mongoose.model('User');

    /**
    * ==================================================================
    * Passport Session Setup ===========================================
    * ==================================================================
    * require for persistent login sessions
    * passport needs the ability to serialize and unserialize users out of session
    */

    //Serialize user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    //Deserialize user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(error, user){
            done(error, user);
        });
    });

    /**LOCAL LOGIN*/
    passport.use('local-login', new LocalStrategy({
        //by default, local strategy uses username and password
        //we will override with email and password
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true //allows to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done){
        if(email){
            email = email.toLowerCase(); //use lowercase emails to avoid case-sensitive email matching
        }

        User.findOne({'local.email':email}, function(error, user){
            //in case of any error return it
            if(error){
                return done(error);
            }
            //if no user is found return false
            if(!user){
                //res.send(401, 'Must be logged in');
                return done(null, 'no user')
            }
            //if password wrong return false
            if(!user.validPassword(password)){
                return done(null, false);
            }
            //if all is well return the user
            else {
                return done(null, user);
            }
        });
    }));

    /**LOCAL SIGNUP*/
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        if(email){
            email = email.toLowerCase();
        }

        //If the user is not already logged in:
        if(!req.user){
            User.findOne({'local.email': email}, function(error, user){
                //Return error in case of any errors
                if(error){
                    return done(error);
                }

                //Check if theres already a user with that email
                if(user){
                    console.log(user);
                    return done(null, false);
                }
                //If no user then creates the user
                else{
                    //creates the user
                    let newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(error){
                        if(error){
                            return done(error);
                        }
                        return done(null, newUser);
                    });
                }
            });
        }
        //If the user is logged in but has no local account...
        else if(!req.user.local.email){
            //...they are trying to connect a local account
            //BUT let's check if there isn't anyone already using this email
            User.findOne({'local.email': email}, function(error, user){
                if(error){
                    return done(error);
                }
                if(user){
                    return done(null, false);
                }
                else{
                    let user = req.user;

                    user.local.email = email;
                    user.local.password = user.generateHash(password);

                    user.save(function(error){
                        if(error){
                            return done(error);
                        }
                        return done(null, user);
                    });
                }
            });
        }
        else{
            //user ir logged in and already has a local account. Ignore signup.
            //the user should loggout before trying to create a new account.
            return done(null, req.user);
        }
    }))

};