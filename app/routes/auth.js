/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *14/01/17-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */

"use strict";

const passport = require("passport");

module.exports = (app)=>{

    /**LOGIN/SIGNUP WITH FACEBOOK*/
    app.get("/auth/facebook", passport.authenticate("facebook", {
        scope: "email"
    }), (req, res)=>{
        res.json({status: "success"});
    });

    app.get("/auth/facebook/callback", passport.authenticate("facebook", {
        successRedirect: "/profile",
        failureRedirect: "/"
    }), (req, res)=>{
        res.json({status: "success"});
    });

    /**CONNECT FACEBOOK ACOUNT TO LOGGEDIN USER*/
    app.get("/connect/facebook", passport.authorize("facebook", {
        scope: "email"
    }), (req, res)=>{
        res.json({status: "success"});
    });

    app.get("/connect/facebook/callback", passport.authorize({
        successRedirect: "/profile",
        failureRedirect: "/"
    }), (req, res)=>{
        res.json({status: "success"});
    });
};