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

const mongoose = require('mongoose');

module.exports = function(uri){
    mongoose.connect(uri);

    mongoose.set('debug', true);

    mongoose.connection.on('open', function(res){
        console.log('Mongoose connection opened.');
        console.log(res);
    });

    mongoose.connection.on('connected', function(){
        console.log('Connected at ' + uri);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Disconnected from ' + uri);
    });

    mongoose.connection.on('errorconnected', function(err){
        console.log('Mongoose connection error ' + err);
    });

    process.on('SIGINT', function(){
        console.log('Disconnected by the end of application.');
        process.exit(0);
    });
};