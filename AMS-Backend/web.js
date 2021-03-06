var express = require('express');
var app = express();
var apiCheck = require('./API/api.js');
var bodyparser = require('body-parser');
app.use(bodyparser({ limit: '50mb' }));

app.get('/', function(request, response) {
    response.send("Please try with different api");
});


//APIKey Generator check api
app.get('/apicheck/:apikey', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        response.send(res);
    });
});


//Users API
//registration
app.get('/user/registration/:apikey/:username/:pin/:firstname/:lastname/:contact1/:contact2/:gender/:member/:flatno/:email/:secid/:groupid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.registration(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//update
app.get('/user/update/:apikey/:userid/:username/:pin/:firstname/:lastname/:contact1/:contact2/:gender/:member/:flatno/:email/:groupid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.updateuser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//secretary find user
app.get('/user/secfind/:apikey/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.secretaryuser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//check user
app.get('/user/checkuser/:apikey/:username/:pin', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.checkuser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//block user
app.get('/user/block/:apikey/:userid/:secid/:username', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.blockuser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//block user
app.get('/user/active/:apikey/:userid/:secid/:username', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.activeuser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//user secretary check
app.get('/user/sec/check/:apikey/:userid/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.userSecCheck(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//user update token
app.get('/user/updtkn/:apikey/:userid/:token', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.updateToken(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//user forgot password
//user get userid
app.get('/user/srchid/:apikey/:username', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.usercheckbyname(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//update pin
app.get('/user/updpin/:apikey/:userid/:pin', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var users = require('./User/user');
            users.userupdpin(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//group api
//insert
app.get('/group/insert/:apikey/:group', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var group = require('./Group/group.js');
            group.groupInsert(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//search all
app.get('/group/search/:apikey/', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var group = require('./Group/group.js');
            group.groupSearch(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//search by Group id
app.get('/group/search/:apikey/:groupid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var group = require('./Group/group.js');
            group.groupSearchById(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});

//Secretary api
//insert
app.get('/Secretary/insert/:apikey/:pin/:secname/:aptname', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Secretary = require('./Secretary/secretary.js');
            Secretary.secretaryInsert(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//search all
app.get('/Secretary/search/:apikey/', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Secretary = require('./Secretary/secretary.js');
            Secretary.secretarySearch(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//secretary check 
app.get('/Secretary/check/:apikey/:secid/:secpin', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Secretary = require('./Secretary/secretary.js');
            Secretary.secretaryCheck(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//secretary details
app.get('/Secretary/search/:apikey/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Secretary = require('./Secretary/secretary.js');
            Secretary.secretarySearchById(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});

//Role functionality
//insert single value and delete by id
app.get('/role/:type/:value', function(request, response) {
    var myrole = require('./Role/role.js');
    var type = request.params.type;
    if (type == 'insert') {
        myrole.insert(request, response);
    } else if (type == 'delete') {
        myrole.delete(request, response);
    } else if (type == 'search') {
        myrole.searchId(request, response);
    } else {
        response.send('invalid');
    }
});

//search all role
app.get('/role/:type', function(request, response) {
    var myrole = require('./Role/role.js');
    var type = request.params.type;
    if (type == 'search') {
        myrole.search(request, response);
    } else {
        respose.send('invalid');
    }
});
//update role
app.get('/role/:type/:id/:value', function(request, response) {
    var myrole = require('./Role/role.js');
    var type = request.params.type;
    if (type == 'update') {
        myrole.update(request, response);
    } else {
        response.send('invalid');
    }
});
//Maintenance
//Generate Maintenance
app.get('/Maintenace/generate/:apikey/:secid/:groupid/:amount/:duration', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Maintenance = require('./Maintenance/maintenance.js');
            Maintenance.generateMaintenance(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//secretary Maintenance
app.get('/Maintenace/secretary/history/:apikey/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Maintenance = require('./Maintenance/maintenance.js');
            Maintenance.secretaryMaintenanceHistoryMain(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//user list according to the maintenance id
app.get('/Maintenace/secretary/userList/:apikey/:secid/:mid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Maintenance = require('./Maintenance/maintenance.js');
            Maintenance.secretaryMaintenanceSearchUser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//take maintenance 
app.get('/Maintenace/secretary/takeMaintenance/:apikey/:mid/:userid/:paidby', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Maintenance = require('./Maintenance/maintenance.js');
            Maintenance.takeMaintenance(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//user Display maintenance 
app.get('/Maintenace/user/listMaintenance/:apikey/:userid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Maintenance = require('./Maintenance/maintenance.js');
            Maintenance.userMaintenance(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//user Unpaid Maintenance 
app.get('/Maintenace/user/unpaid/:apikey/:userid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Maintenance = require('./Maintenance/maintenance.js');
            Maintenance.userUnpaidMaintenance(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//fcm test
app.get('/fcm/test', function(request, response) {
    var fcm = require('./FCM/fcm_config.js');
    fcm.sendNotificationToIndividual('eYKZC5hTM5c:APA91bFz5KrCsyoyIr5lvYWJeOQUrQCscSjE3UnNU5qlTVX0WYF69lZyTw0kl8NXPneRZ2c3YXuePV_skkHGZ-OX6sc0SdM0_zybRQ3JaJ20QkJiHTkpdTefRG3rSGtPaDd7GznZDLXO', 'hello');
});


//Event API
//Insert New Event
app.post('/Event/Secretary/Insert', function(request, response) {
    var value = request.body.apikey;
    console.log(value);
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Event = require("./Event/ams_event");
            Event.addNewEvent(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//Search Event By Secretary
app.get('/Event/Secretary/Search/:apikey/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Event = require("./Event/ams_event");
            Event.searchEventBySec(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//search By client
app.get('/Event/User/Search/:apikey/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Event = require("./Event/ams_event");
            Event.searchEventByUser(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});
//Update Event
app.get('/Event/Secretary/update/:apikey/:eventid/:title/:desc/:edate/:etime/:place/:status/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var Event = require("./Event/ams_event");
            Event.updateEvent(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});

//News Module
//Insert News
app.get('/News/Secretary/insert/:apikey/:title/:desc/:ndate/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var News = require("./News/news");
            News.addNews(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});

//Update News
app.get('/News/Secretary/update/:apikey/:newsid/:title/:desc/:ndate/:status/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var News = require("./News/news");
            News.updateNews(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});

//Search News
app.get('/News/Search/:apikey/:secid', function(request, response) {
    var value = request.params.apikey;
    apiCheck.checkAPI(value, function(res) {
        if (res) {
            var News = require("./News/news");
            News.searchNews(request, response);
        } else {
            var status = {
                'status': res,
                'error': 'api key invalid'
            };
            response.json(status);
        }
    });
});


app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});