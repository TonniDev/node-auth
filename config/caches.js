/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *30/01/17-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
"use strict";

const NodeCache = require('node-cache');
const userCache = new NodeCache({useClones: true});

let userCached = {};

var createUserCache = (user) => {
    console.log(':::USER CACHED:::', user);
    if(user){
        userCached = user;
        userCache.set('user-cached', userCached);
    }
}

createUserCache();

exports.userCache = userCache;