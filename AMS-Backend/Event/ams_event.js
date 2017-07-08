var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var addEvent = function(request, response) {
    var title = request.body.title;
    var desc = request.body.desc;
    var edate = request.body.edate;
    var place = request.body.place;
    var etime = request.body.time;
    var status = request.body.status;
    var secid = request.body.secid;
    //var image = request.body.image;
    //var image = new Buffer(request.body.image, 'base64').toString('hex');
    //console.log(image);
    var query = "INSERT INTO tbl_event(title,description,edate,place,etime,status,secretaryid) values('" + title + "','" + desc + "','" + edate + "','" + place + "','" + etime + "','" + status + "'," + secid + ") RETURNING eventid;";
    client.query(query, function(err, result) {
        if (err) {
            console.log(err);
            var status = {
                status: false,
            }
        } else {
            var status = {
                status: true,
                eventid: result.rows[0].eventid,
            }

            var FCM = require('../FCM/fcm_config.js');
            var topic = secid;
            var message = "Event " + title + " has been generated";
            FCM.sendMessageToGroup(topic, message);

            var News = require('../News/news');
            News.addNewsFunction(title, desc, edate, secid, 'Event');
        }
        response.json(status);
    });
};
var searchEvent = function(request, response) {
    var secid = request.params.secid;
    var query = "SELECT * FROM tbl_event WHERE secretaryid = " + secid + "";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false,
            }
        } else {
            var status = {
                status: true,
                event: result.rows
            }
        }
        response.json(status);
    });
}
var updateEvent = function(request, response) {
    var eventid = request.params.eventid;
    var title = request.params.title;
    var desc = request.params.desc;
    var edate = request.params.edate;
    var place = request.params.place;
    var etime = request.params.etime;
    var status = request.params.status;
    var secid = request.params.secid;
    var query = "UPDATE tbl_event SET title = '" + title + "',description = '" + desc + "',edate='" + edate + "',etime='" + etime + "',status='" + status + "' WHERE eventid = " + eventid + " AND secretaryid = " + secid + ";";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false,
            }
        } else {
            var status = {
                status: true,
            }
        }
        response.json(status);
    });
}
var serEventUser = function(request, response) {
    var secid = request.params.secid;
    var query = "SELECT * FROM tbl_event WHERE secretaryid = " + secid + " AND status != 'Block';";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false,
            }
        } else {
            var status = {
                status: true,
                event: result.rows
            }
        }
        response.json(status);
    });
};
var updateImage = function(request, response) {
    var image = new Buffer(request.body.image, 'base64').toString('hex');
    var eventid = request.body.eventid;
    var query = "UPDATE tbl_event SET image = '" + image + "' WHERE eventid = " + eventid + ";";
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                status: false,
                error: err
            }
        } else {
            var status = {
                status: true,
                result: result
            }
        }
        response.json(status);
    });
}
module.exports.updateEvent = updateEvent;
module.exports.addNewEvent = addEvent;
module.exports.searchEventBySec = searchEvent;
module.exports.searchEventByUser = serEventUser;
module.exports.updateImage = updateImage;