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

const passport = require('passport');

module.exports = function(app){
    app.route('/signup')
        .get(function(req, res){
            let user = '';
            if(req.user){
                user = req.user
            }
            res.render('signup', {message: user});
        })
        .post(passport.authenticate('local-signup' /*{
            successRedirect: '/profile',
            failureRedirect: '/signup'
        }*/
        ), function(req, res){
            console.log(res);
            res.send('SIGNED IN');
        });
}