var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var sins = function(request, response) {
    var pin = request.params.pin;
    var scretaryname = request.params.secname;
    var apartmentname = request.params.aptname;
    var query = "INSERT INTO tbl_secretary(pin,apartmentname,secretaryname) values(" + pin + ",'" + apartmentname + "','" + scretaryname + "') RETURNING secretaryid";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'insertion in secretary',
                'error': err
            }
        } else {
            var secretary = result.rows[0];
            var status = {
                'status': true,
                'secretary id': secretary.secretaryid,
            }
        }
        response.json(status);
    });
};

var sser = function(request, response) {
    var query = "SELECT * FROM tbl_secretary";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error place': 'search all in scretary',
                'error': err
            }
        } else {
            var group = result.rows[0];
            var status = {
                'status': true,
                'secretary': result.rows
            }
        }
        response.json(status);
    });
};
module.exports.secretaryInsert = sins;
module.exports.secretarySearch = sser;