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
const fs = require('fs');

module.exports = (app)=>{
    app.route('/login')
        .get((req, res)=>{
            let user = '';
            if(req.user){
                user = req.user
            }
            res.render('login.ejs', { message: user });
        })
        .post(passport.authenticate('local-login', {
            successRedirect:'/profile',
            failureRedirect: '/login'
        }),(req, res)=>{

            let cache = [];
            let resJson = JSON.stringify(res, (key, value) => {
                if (typeof value === 'object' && value !== null) {
                    console.log(value);
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            });
            cache = null;
            fs.writeFile('.log/login_response.json', resJson, 'utf8', (err)=>{
                if(err) throw err;
            });

            let response = {id: req.user._id, status: 'success'};
            res.send(response);
        });
};


