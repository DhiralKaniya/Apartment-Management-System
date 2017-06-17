var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;
var randonmString = require('randomstring');
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


var block = function(request, response) {
    var username = request.params.username;
    var query = "UPDATE tbl_user SET isactive = false WHERE username = '" + username + "'";
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
var active = function(request, response) {
    var username = request.params.username;
    var query = "UPDATE tbl_user SET isactive = true WHERE username = '" + username + "'";
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
module.exports.blockuser = block;
module.exports.checkuser = auth;
module.exports.registration = reg;
module.exports.activeuser = active;