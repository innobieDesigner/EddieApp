let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');

function UserList(userModel){
    this.userModel = userModel;
}

UserList.prototype = {
    showUsers: function(req, res){
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM root r'
        };

        self.userModel.find(querySpec, function(err, user){
            if(err){
                throw err;
            }

            res.render('index', {
                title: 'Users',
                users: user
            });
        });
    },

    getUser: function(req, res){
        req.assert('username', 'Name is required').notEmpty();
        req.assert('password', 'Password is required').notEmpty().isLength({ min:8 });

        var errors = req.validationErrors();
        console.log(errors);
        if(!errors){
            let self = this;
            let querySpec = {
                query: 'SELECT * FROM c WHERE c.uname = "' + req.body.username +'" AND c.pass = "' + req.body.password +'"'
            };
    
            //console.log(querySpec);
    
            self.userModel.find(querySpec, function(err, user){
                if(err){
                    throw err;
                }else{
                    if(user.length === 0){
                        res.render('index', {
                            msg: 'User not found'
                        });
                    }else{
                        res.render('profile', {
                            loggedIn: user
                        });
                    }
                }
            });
        } else{
            res.render('index', {
                errors: errors
            });
        }

        
    },

    addUser: function(req, res) {

        req.assert('uname', 'Username is required!').notEmpty();
        req.assert('uname', 'Username must be longer then 5 characters!').isLength({ min:5 });
        req.assert('fname', 'First name is required!').notEmpty();
        req.assert('lname', 'Second name is required').notEmpty();
        req.assert('mail', 'Mail is required!').notEmpty();
        req.assert('mail', 'Mail seems to be invalid!').isEmail();
        req.assert('pass', 'Password is required!').notEmpty();
        req.assert('pass', 'Password must be longer then 8 character!').isLength({ min:8 });

        var errors = req.validationErrors();
        if(!errors){
            let self = this;
            let user = req.body;
    
            self.userModel.addUser(user, function(err){
                if(err){
                    throw err;
                }
    
                res.render('index', {
                    msg: "Registration completed."
                });
            });
        }else{
            res.render('signup', {
                errors: errors
            });
        }

        
    },


};

module.exports = UserList;