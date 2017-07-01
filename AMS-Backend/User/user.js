var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;
var randonmString = require('randomstring');
//register user
var reg = function(request, response) {
    var username = request.params.username;
    var pin = request.params.pin;
    var firstname = request.params.firstname;
    var lastname = request.params.lastname;
    var contact1 = request.params.contact1;
    var contact2 = request.params.contact2;
    var gender = request.params.gender;
    var email = request.params.email;
    var members = request.params.member;
    var flatno = request.params.flatno;
    var email = request.params.email;
    var token = randonmString.generate();
    var groupid = request.params.groupid;
    var secid = request.params.secid;

    var userexistQuery = "SELECT * FROM tbl_user where username = '" + username + "' OR pin = " + pin + " OR email = '" + email + "'";
    client.query(userexistQuery, function(err, result) {
        if (result.rowCount > 0 || err) {
            var status = {
                'status': false,
                'error': 'user already exist'
            };
            response.json(status);
        }
    });
    var query1 = "INSERT INTO tbl_user(username,pin,firstname,lastname,contact1,contact2,gender,no_of_mem,flat_no,isactive,validtoken,email) values('" + username + "'," + pin + ",'" + firstname + "','" + lastname + "','" + contact1 + "','" + contact2 + "','" + gender + "'," + members + ",'" + flatno + "'," + true + ",'" + token + "','" + email + "') RETURNING userid";
    client.query(query1, function(err, result, fields) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'insertion in user',
                'error': err
            }
            response.json(status);
        } else {
            var user = result.rows[0];
            var query2 = "INSERT INTO tbl_user_role values(" + user.userid + "," + 12 + ")";
            client.query(query2, function(err, result) {
                if (err) {
                    var status = {
                        'status': false,
                        'error place': 'insertion in user-role',
                        'error': err
                    }
                    response.json(status);
                } else {
                    var query3 = "INSERT INTO tbl_user_secretary_group values(" + user.userid + "," + secid + "," + groupid + ")";
                    client.query(query3, function(err, result) {
                        if (err) {
                            var status = {
                                'status': false,
                                'error place': 'insertion in user-secretory-group',
                                'error': err
                            }
                        } else {
                            var status = {
                                'status': true,
                                'userid': user.userid
                            }
                        }
                        response.json(status);
                    });
                }
            });
        }
    });
};
//update user
var upd = function(request, response) {
    var username = request.params.username;
    var pin = request.params.pin;
    var firstname = request.params.firstname;
    var lastname = request.params.lastname;
    var contact1 = request.params.contact1;
    var contact2 = request.params.contact2;
    var gender = request.params.gender;
    var email = request.params.email;
    var members = request.params.member;
    var flatno = request.params.flatno;
    var email = request.params.email;
    var tkn = randonmString.generate();
    var groupid = request.params.groupid;
    var userid = request.params.userid;

    var query1 = "UPDATE tbl_user SET username='" + username + "' , pin='" + pin + "',firstname='" + firstname + "',lastname='" + lastname + "',contact1='" + contact1 + "',contact2='" + contact2 + "',gender='" + gender + "',no_of_mem=" + members + ",flat_no='" + flatno + "',isactive=" + true + ",validtoken='" + tkn + "',email='" + email + "'  WHERE userid=" + userid + "";
    client.query(query1, function(err, result, fields) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'update in user',
                'error': err
            }
            response.json(status);
        }
    });
    client.query("Update tbl_user_secretary_group SET groupid = " + groupid + " WHERE userid = " + userid + "", function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'update in user',
                'error': err
            }
            response.json(status);
        }
    });
    client.query("SELECT * FROM tbl_user where userid=" + userid + "", function(err, result) {
        var user = result.rows[0];
        var status = {
            'status': true,
            'user': result.rows[0]
        }
        response.json(status);
    });
};



//authenticate user
var auth = function(request, response) {
    var username = request.params.username;
    var pin = request.params.pin;
    var query = "SELECT * FROM tbl_user WHERE username = '" + username + "' and pin='" + pin + "'";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error place': 'select in authentication/username password invalid',
                'error': err
            }
            response.json(status);
        } else {
            var user = result.rows[0];
            var query1 = "SELECT * FROM tbl_user_secretary_group WHERE userid = " + user.userid + ";"
            client.query(query1, function(err, result) {
                if (err || result.rowCount <= 0) {
                    var status = {
                        'status': false,
                        'error place': 'no user secretary founded',
                        'error': err
                    }
                    response.json(status);
                } else {
                    var sec_group = result.rows[0];
                    var role_qry = "SELECT * FROM tbl_user_role where userid=" + user.userid + ";";
                    client.query(role_qry, function(err, result) {
                        if (err || result.rowCount <= 0) {
                            var status = {
                                'status': false,
                                'error place': 'no user secretary founded',
                                'error': err
                            }
                            response.json(status);
                        } else {
                            /* token update concept will be here*/
                            var role = result.rows[0];
                            var status = {
                                'status': true,
                                'user': user,
                                'secretaryid': sec_group.secretaryid,
                                'groupid': sec_group.groupid,
                                'roleid': role.roleid,
                            }
                            response.json(status);
                        }
                    });
                }
            });
        }
    })
};

//block user
var block = function(request, response) {
        var userid = request.params.userid;
        var query = "UPDATE tbl_user SET isactive = false WHERE userid = '" + userid + "'";
        client.query(query, function(err, result) {
            if (err || result.rowCount <= 0) {
                var status = {
                    'status': 'false',
                    'error place': 'block user error',
                    'err': err
                }
            } else {
                var status = {
                    'status': 'true'
                }
            }
            response.json(status);
        })
    }
    //active user
var active = function(request, response) {
    var userid = request.params.userid;
    var query = "UPDATE tbl_user SET isactive = true WHERE userid = '" + userid + "'";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': 'false',
                'error place': 'block user error',
                'err': err
            }
        } else {
            var status = {
                'status': 'true'
            }
        }
        response.json(status);
    })
}

var secUser = function(request, response) {
    var secretary = request.params.secid;
    var query = "select * from tbl_user_secretary_group tsu,tbl_user tu WHERE tu.userid = tsu.userid and secretaryid=" + secretary + "";
    console.log(query);
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error': 'error in sec User'
            }
            response.json(status);
        } else {
            var status = {
                'status': true,
                'user': result.rows
            }
            response.json(status);
        }
    });
};

var frgPas = function(request, response) {
    var username = request.params.username;
    var email = request.params.email;
    var query = "";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error': err
            };
            response.json(status);
        }
    });
};
module.exports.forgotPassword = frgPas;
module.exports.blockuser = block;
module.exports.checkuser = auth;
module.exports.registration = reg;
module.exports.activeuser = active;
module.exports.updateuser = upd;
module.exports.secretaryuser = secUser;