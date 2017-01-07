/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *03/01/17-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const load = require('express-load');

module.exports = function(){
    let app = express();

    app.set('port', process.env.PORT || 3000);


    app.use(express.static('./public'));

    app.set('views', './public');
    app.set('views cache', true);

    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'simpleauth',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(require('method-override')());

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};