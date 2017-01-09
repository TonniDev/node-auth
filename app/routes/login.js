/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *06/01/17-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

const passport = require('passport');

module.exports = function(app){
    app.route('/login')
        .get(function(req, res){
            //res.send({});
            res.render('login.ejs', { message: 'MENSAGEM' });
        })
        .post(passport.authenticate('local-login' /*{
            successRedirect:'/profile',
            failureRedirect: '/login'
        }*/
        ),function(req, res){
            console.log(res);
            res.send('ok');
        });
};


