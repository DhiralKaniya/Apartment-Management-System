var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var addNews = function(request, response) {
    var title = request.params.title;
    var desc = request.params.desc;
    var ndate = request.params.ndate;
    var secid = request.params.secid;
    var query = "INSERT INTO tbl_news(title,description,ndate,secretaryid,status) values('" + title + "','" + desc + "','" + ndate + "'," + secid + ",true);";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false
            };
        } else {
            var status = {
                status: true,
            }
        }
        response.json(status);
    });
}
var searchNews = function(request, response) {
    var secid = request.params.secid;
    var query = "SELECT * FROM tbl_news WHERE secretaryid = " + secid + " Order by ndate desc;";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false
            };
        } else {
            var status = {
                status: true,
                news: result.rows
            };
        }
        response.json(status);
    });
}
var updNews = function(request, response) {
    var newsid = request.params.newsid;
    var title = request.params.title;
    var desc = request.params.desc;
    var ndate = request.params.ndate;
    var status = request.params.status;
    var secid = request.params.secid;
    var query = "UPDATE tbl_news SET title='" + title + "',description='" + desc + "',ndate='" + ndate + "',status='" + status + "' WHERE newsid =" + newsid + " AND secretaryid = " + secid + "";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false
            };
        } else {
            var status = {
                status: true,
            }
        }
        response.json(status);
    });
}
var addFunNews = function(title, desc, ndate, secid, ntype) {
    var query = "INSERT INTO tbl_news(title,description,ndate,secretaryid,status,ntype) values('" + title + "','" + desc + "','" + ndate + "'," + secid + ",true,'" + ntype + "');";
    client.query(query, function(err, result) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports.addNews = addNews;
module.exports.searchNews = searchNews;
module.exports.updateNews = updNews;
module.exports.addNewsFunction = addFunNews;