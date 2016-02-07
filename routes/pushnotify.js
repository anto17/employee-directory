//Load the request module
var request = require('request');
var global_ = require('./globaldata');


exports.sendmsg = function(req, res) {
    var ids = global_.reg_id.reg_ids;

    for(i=0;i< ids.length;i++){
        request({
            url: 'https://gcm-http.googleapis.com/gcm/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyDSfvuoqB2zb9RfxbcXkcZB7u9aHLMqMUo'
            },
            json: {
                "data": {
                    "message": "A message from anto"
                },
                "to" : global_.reg_id.reg_ids[i]
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                console.log(response.statusCode, body);
            }
        });
    }
    return res.send({"status": "message has been successfully posted"});
};