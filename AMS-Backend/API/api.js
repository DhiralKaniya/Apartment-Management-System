var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var ser = function(value, cb) {
    var query = "SELECT * FROM tbl_api WHERE apikey = '" + value + "'";
    client.query(query, function(err, result) {
        var res = true;
        if (err) {
            var res = false;
        } else {
            if (result.rowCount > 0) {
                res = true;
            } else {
                res = false;
            }
        }
        cb(res);
    });
};

module.exports.checkAPI = ser;