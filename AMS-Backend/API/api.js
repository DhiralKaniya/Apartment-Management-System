var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var ser = function(request,response,value){
    var query = "SELECT * FROM tbl_api WHERE apikey = '"+value+"'";
    console.log(query);
    client.query(query,function(err,result){
        if(err)
            response.send(false);
        else{
            if(result.rowCount > 0)
                response.send(true);
            else   
                response.send(false);
        }
    });
};
module.exports.checkAPI = ser;
 