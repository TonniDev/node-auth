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
const bcrypt = require('bcrypt-nodejs');

module.exports = function(){
    let userSchema = mongoose.Schema({
        local: {
            email: {
                type: String,
                required: true,
                index:{
                    unique: true
                }
            },
            password: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                default: Date.now
            }
        }
    });
    userSchema.methods.generateHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.local.password);
    };
    return mongoose.model('User', userSchema);
};

/** TODO: se eu usar como abaixo não funciona, porém eu vi um exemplo funcionando desta maneira. Qual a diferença?
    let userSchema = mongoose.Schema({
        local: {
            email: {
                type: String,
                required: true,
                index:{
                    unique: true
                }
            },
            password: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                default: Date.now
            }
        }
    });
    userSchema.methods.generateHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.local.password);
    };
    module.exports =  mongoose.model('User', userSchema);
 * */