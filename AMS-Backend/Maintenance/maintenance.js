var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var genMain = function(request, response) {
    var secid = request.params.secid;
    var amount = request.params.amount;
    var groupid = request.params.groupid;
    var duration = request.params.duration;
    var query = "SELECT maintenanceid FROM tbl_maintenance WHERE secretaryid = " + secid + " and groupid = " + groupid + " and duration = '" + duration + "'";
    client.query(query, function(err, result) {
        if (err || result.rowCount > 0) {
            var status = {
                'status': false,
                'error': 'Maintenance already Genenrated'
            };
            response.json(status);
        } else {
            var query = "INSERT INTO tbl_maintenance(secretaryid,groupid,amount,duration,status) values(" + secid + "," + groupid + "," + amount + ",'" + duration + "',true) RETURNING maintenanceid;";
            client.query(query, function(err, result) {
                if (err || result.rowCount <= 0) {
                    var status = {
                        'status': false,
                        'error': 'maintenance has not been generated properly'
                    };
                    response.json(status);
                } else {
                    var maintenanceid = result.rows[0].maintenanceid;
                    var query = "SELECT tsug.userid FROM tbl_user_secretary_group tsug,tbl_user tu WHERE secretaryid = " + secid + " AND tu.userid = tsug.userid and isactive = true;";
                    client.query(query, function(err, result) {
                        if (res || result.rowCount <= 0) {
                            var status = {
                                'status': false,
                                'error': 'user not fetch succesfully'
                            };
                        } else {
                            var i = 0;
                            var res = result.rows;
                            while (i < res.length) {
                                //console.log(res[i].userid);
                                var query = "INSERT INTO tbl_maintenance_user(maintenanceid,userid,status,paidby)values(" + maintenanceid + "," + res[i].userid + ",false,'Not Paid');"
                                client.query(query, function(err) {
                                    if (err) {
                                        console.log("error at" + i);
                                    }
                                });
                                i++;
                            }
                            var status = {
                                'status': true,
                            };
                            response.json(status);
                        }
                    });
                }
            });
        }
    });
};
var sechisMain = function(request, response) {
    var secid = request.params.secid;
    var query = "SELECT * ,(SELECT count(*) as TotalPaid FROM tbl_maintenance_user WHERE maintenanceid = tm.maintenanceid AND status = true),(SELECT count(*) as TotalUnpaid FROM tbl_maintenance_user WHERE maintenanceid = tm.maintenanceid AND status = false) FROM tbl_maintenance tm WHERE secretaryid=" + secid + ";";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error': 'No Maintenance Found'
            }
            response.json(status);
        } else {
            var status = {
                'status': true,
                'maintenance': result.rows
            }
            response.json(status);
        }
    });
};
var secHisUser = function(request, response) {
    var secid = request.params.secid;
    var maintenanceid = request.params.mid;
    var query = "SELECT tm.maintenanceid,tu.userid,tu.username,tu.flat_no,tu.contact1,tmu.status,tu.isactive,tm.amount,tm.duration,tmu.paidby FROM tbl_maintenance tm , tbl_maintenance_user tmu, tbl_user tu WHERE tm.maintenanceid = tmu.maintenanceid AND tu.userid = tmu.userid AND tm.secretaryid = " + secid + " AND tmu.maintenanceid = " + maintenanceid + " ;";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error': 'No Record Founded'
            }
            response.json(status);
        } else {
            var status = {
                'status': true,
                'maintenance-user': result.rows
            }
            response.json(status);
        }
    });
};
var takMaintenance = function(request, response) {
    var mid = request.params.mid;
    var userid = request.params.userid;
    var paidby = request.params.paidby;
    var query = "UPDATE tbl_maintenance_user SET status = true,paidby='" + paidby + "' WHERE maintenanceid = " + mid + " AND userid = " + userid + ";";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error': "No Record Found"
            }
        } else {
            var status = {
                'status': true
            }
        }
        response.json(status);
    });
};
var userMaintenance = function(request, response) {
    var userid = request.params.userid;
    var query = "SELECT tu.userid,tmu.maintenanceid,username,contact1,flat_no,tmu.status,paidby,tm.duration,tm.amount FROM tbl_maintenance_user tmu,tbl_maintenance tm,tbl_user tu WHERE tm.maintenanceid=tmu.maintenanceid AND tu.userid=" + userid + " AND tu.userid = tmu.userid;"
    client.query(query, function(err, result) {
        if (err) {
            var status = {
                'status': false,
                'error': err
            }
        } else {
            var status = {
                'status': true,
                'maintenance-user': result.rows,
            }
        }
        response.json(status);
    });
};
var userUnpiadMaitenance = function(request, response) {
    var userid = request.params.userid;
    var query = "SELECT tu.userid,tmu.maintenanceid,username,contact1,flat_no,tmu.status,paidby,tm.duration,tm.amount FROM tbl_maintenance_user tmu,tbl_maintenance tm,tbl_user tu WHERE tm.maintenanceid=tmu.maintenanceid AND tu.userid=" + userid + " AND tu.userid = tmu.userid AND tmu.status = false;";
    client.query(query, function(err, result) {
        if (err || result.rowCount <= 0) {
            var status = {
                'status': false,
                'error': 'All are paid'
            }
        } else {
            var status = {
                'status': true,
                'maintenance-user': result.rows
            }
        }
        response.json(status);
    });
};
module.exports.generateMaintenance = genMain;
module.exports.secretaryMaintenanceHistoryMain = sechisMain;
module.exports.secretaryMaintenanceSearchUser = secHisUser;
module.exports.takeMaintenance = takMaintenance;
module.exports.userMaintenance = userMaintenance;
module.exports.userUnpaidMaintenance = userUnpiadMaitenance;