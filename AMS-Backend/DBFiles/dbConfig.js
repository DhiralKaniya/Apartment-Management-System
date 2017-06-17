var pg = require('pg');
var client = new pg.Client({
    host: 'ec2-50-19-83-146.compute-1.amazonaws.com',
    port: '5432',
    user: 'wyndjibobnfmuq',
    password: 'c63936e5850983273bc695056d4990ab992f6003590ebce2bfea3d3ad51bc3ec',
    database: 'd3djv81sitc71c',
    ssl: true
});
client.connect();
module.exports.myconnection = client;