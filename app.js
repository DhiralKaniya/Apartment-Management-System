var mysql = require('mysql');
var express = require('express');
var app = express();
console.log('hello world');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'testing'
});
connection.connect();
var port = process.env.PORT || 5050;

app.get('/',function(reqesut,response){
    var qry = "SELECT * FROM users";
    var query = connection.query(qry,function(err,result){
        if(err)
            console.log(err);
        var json = JSON.stringify({
            'result':result
        });
        response.end(json);
    });
});


app.listen(port);