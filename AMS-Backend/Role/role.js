var dbConnect = require('../DBFiles/dbConfig.js');
var client = dbConnect.myconnection;

var ins = function(request,response){
    var value = request.params.value;
    var query = "INSERT INTO tbl_role(role) values('"+value+"')";
    //response.send(query);
    client.query(query,function(err,result){
        if(err)
            response.send(err);
        else{
            if(result.rowCount > 0){
                var res = {
                    'status':true
                };
                response.json(res);
            }
        }
    });
};
 
var ser = function(request,response){
    var query = "SELECT * FROM tbl_role";
    client.query(query,function(err,result){
        if(err)
        response.send(err);
        else{
            if(result.rowCount > 0 ){
                var res = {
                    'status':true,
                    'role':result.rows
                }
            }else{
                var res = {
                    'status':false,
                    'result' : 'no record'
                };
            }
            response.json(res);
        }
    });
}

var serid = function(request,response){
    
    var val = request.params.value;
    var query = "SELECT * FROM tbl_role WHERE id="+val+"";
    client.query(query,function(err,result){
        if(err)
        response.send(err);
        else{
            if(result.rowCount > 0 ){
                var res = {
                    'status':true,
                    'role':result.rows
                }
            }else{
                var res = {
                    'status':false,
                    'result' : 'no id match'
                };
            }
            response.json(res);
        }
    });
}

var upd = function(request,response){
    var id = request.params.id;
    var value = request.params.value;
    var query = "UPDATE tbl_role SET role='"+value+"' WHERE id = "+id+"";
    client.query(query,function(err,result){
        if(err)
            response.json(err);
        else{
            if(result.rowCount > 0){
                var res = {
                    'status':true,
                    'result':'success'
                }
            }else{
                var res={
                    'status':false,
                    'result':'no id found'
                }
            }
            response.json(res);
        }
      
    });
};

var del = function(request,response){
    var id = request.params.value;
    var query = "DELETE FROM tbl_role WHERE id = "+id+"";
    //response.send(query);
    client.query(query,function(err,result){
        if(err)
            response.json(err);
        else{
            if(result.rowCount > 0){
                var res = {
                    'status':true,
                    'result':'success'
                }
            }else{
                var res={
                    'status':false,
                    'result':'no id found'
                }
            }
            response.json(res);
        }
    });
}

module.exports.insert =ins;
module.exports.search =ser;
module.exports.update =upd;
module.exports.delete =del;
module.exports.searchId = serid;