let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');

function UserList(userModel) {
    this.userModel = userModel;
}

UserList.prototype = {
    showUsers: function (req, res) {
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM root r'
        };

        self.userModel.find(querySpec, function (err, user) {
            if (err) {
                throw err;
            }

            res.render('index', {
                title: 'Users',
                users: user
            });
        });
    },

    getUser: function (req, res) {
        req.assert('username', 'Name is required').notEmpty();
        req.assert('password', 'Password is required').notEmpty().isLength({min: 8});

        var errors = req.validationErrors();
        console.log(errors);
        if (!errors) {
            let self = this;
            let querySpec = {
                query: 'SELECT * FROM c WHERE c.uname = "' + req.body.username + '" AND c.pass = "' + req.body.password + '"'
            };
            self.userModel.find(querySpec, function (err, user) {
                if (err) {
                    throw err;
                } else {
                    if (user.length === 0) {
                        res.render('index', {
                            msg: 'Wrong username or password'
                        });
                    } else {
                        res.render('profile', {
                            loggedIn: user
                        });
                    }
                }
            });
        } else {
            res.render('index', {
                errors: errors
            });
        }


    },

    addUser: function (req, res) {

        req.assert('uname', 'Username is required!').notEmpty();
        req.assert('uname', 'Username must be longer then 5 characters!').isLength({min: 5});
        req.assert('fname', 'First name is required!').notEmpty();
        req.assert('lname', 'Second name is required').notEmpty();
        req.assert('mail', 'Mail is required!').notEmpty();
        req.assert('mail', 'Mail seems to be invalid!').isEmail();
        req.assert('pass', 'Password is required!').notEmpty();
        req.assert('pass', 'Password must be longer then 8 character!').isLength({min: 8});

        var errors = req.validationErrors();
        if (!errors) {
            let self = this;
            let userToReg = req.body;
            let querySpec = {
                query: 'SELECT * FROM c WHERE c.uname = "' + userToReg.uname + '" OR c.mail = "' + userToReg.mail + '"'
            };
            console.log(querySpec);
            self.userModel.find(querySpec, function (err, user) {
                console.log(user);
                if (err) {
                    throw err;
                } else {
                    if (user.length === 0) {
                        self.userModel.addUser(userToReg, function (err) {
                            if (err) {
                                console.log(err);
                                throw err;
                            }

                            res.render('index', {
                                msg: "Registration completed."
                            });
                        });
                    } else {
                        res.render('signup', {
                            msg: "User already registered."
                        });
                    }
                }
            });
        } else {
            res.render('signup', {
                errors: errors
            });
        }


    },

    getFBUser: function(req, res) {
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c WHERE c.uname = "' + req.user._json.name +'" AND c.pass = "' + req.user._json.id +'"'
        };

        self.userModel.find(querySpec, function(err, user){
            if(err){
                throw err;
            }
            if(user.length === 0){
                let fullName = req.user._json.name;
                let splitName = fullName.split(" ");
                /*console.log('-------------');
                console.log(splitName);*/
                let userToReg = {
                    uname: req.user._json.name,
                    fname: splitName[0],
                    lname: splitName[1],
                    mail: req.user._json.email,
                    pass: req.user._json.id
                };
                self.userModel.addUser(userToReg, function(err){
                    if(err){
                        throw err;
                    }
                    res.render('profile', {
                        loggedIn: [userToReg]
                    });
                });
            } else{
                res.render('profile', {
                    loggedIn: user
                });
            }
        });
    },



    //Új

    getGlUser: function(req, res){
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c WHERE c.uname = "' + req.user._json.displayName +'" AND c.pass = "' + req.user._json.id +'"'
        };

        self.userModel.find(querySpec, function(err, user){
            if(err){
                throw err;
            }
            if(user.length === 0){
                let userToReg = {
                    uname: req.user._json.displayName,
                    fname: req.user._json.name.familyName,
                    lname: req.user._json.name.givenName,
                    mail: req.user._json.emails[0].value,
                    pass: req.user._json.id
                };
                self.userModel.addUser(userToReg, function(err){
                    if(err){
                        throw err;
                    }
                    res.render('profile', {
                        loggedIn: [userToReg]
                    });
                });
            } else{
                res.render('profile', {
                    loggedIn: user
                });
            }
        });
    },

    getOfUser: function(req, res) {
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c WHERE c.uname = "' + req.user._json.name +'" AND c.pass = "' + req.user._json.tid +'"'
        };

        self.userModel.find(querySpec, function(err, user){
            if(err){
                throw err;
            }
            if(user.length === 0){
                let fullName = req.user._json.name;
                let splitName = fullName.split(" ");
                /*console.log('-------------');
                console.log(splitName);*/
                let userToReg = {
                    uname: req.user._json.name,
                    fname: splitName[0],
                    lname: splitName[1],
                    mail: req.user._json.preferred_username,
                    pass: req.user._json.tid
                };
                self.userModel.addUser(userToReg, function(err){
                    if(err){
                        throw err;
                    }
                    res.render('profile', {
                        loggedIn: [userToReg]
                    });
                });
            } else{
                res.render('profile', {
                    loggedIn: user
                });
            }
        });
    }

    //Új vége

};

module.exports = UserList;