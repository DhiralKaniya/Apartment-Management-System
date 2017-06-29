var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var gins = function(request, response) {
    var group = request.params.group;
    var query = "INSERT INTO tbl_group(groupname) values('" + group + "') RETURNING groupid";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'insertion in group',
                'error': err
            }
        } else {
            var group = result.rows[0];
            var status = {
                'status': true,
                'group id': group.groupid
            }
        }
        response.json(status);
    });
};

var gser = function(request, response) {
    var query = "SELECT * FROM tbl_group";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'search all in group',
                'error': err
            }
        } else {
            var group = result.rows[0];
            var status = {
                'status': true,
                'group': result.rows
            }
        }
        response.json(status);
    });
};
var gname = function(request, response) {
    var groupid = request.params.groupid
    var query = "SELECT * FROM tbl_group  WHERE groupid = " + groupid + "";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'search by in groupid',
                'error': err
            }
        } else {
            var status = {
                'status': true,
                'group': result.rows
            }
        }
        response.json(status);
    });
};
module.exports.groupInsert = gins;
module.exports.groupSearch = gser;
module.exports.groupSearchById = gname;