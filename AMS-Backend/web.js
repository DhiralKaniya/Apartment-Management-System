var express = require('express');
var app = express();
var apiCheck = require('./API/api.js');
//Testing purpose
app.get('/', function(request, response) {
   response.send("Please try with different api");
});

//Role functionality
//insert single value and delete by id
app.get('/role/:type/:value',function(request,response){
    var myrole = require('./Role/role.js');
    var type = request.params.type;
    if(type == 'insert'){
        myrole.insert(request,response);
    }else if(type=='delete'){
        myrole.delete(request,response);
    }else if(type=='search'){
        myrole.searchId(request,response);
    }
    else{
        response.send('invalid');
    }
});

//search all role
app.get('/role/:type',function(request,response){
    var myrole = require('./Role/role.js');
    var type = request.params.type;
    if(type=='search'){
        myrole.search(request,response);
    }
    else{
        respose.send('invalid');
    }
});
//update role
app.get('/role/:type/:id/:value',function(request,response){
    var myrole = require('./Role/role.js');
    var type = request.params.type;
    if(type == 'update'){
        myrole.update(request,response);
    }else{
        response.send('invalid');
    }
});

//APIKey Generator check api
app.get('/apicheck/:apikey',function(request,response){
    var apikey = request.params.apikey;
    console.log(apikey);
    var result = apiCheck.checkAPI(apikey);
    response.send(result);
});
 

app.set('port', (process.env.PORT || 5050));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
