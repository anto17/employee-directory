var request = require('request');
var global_ = require('./globaldata');
var dao = require('./dao');
var jq = require('jquery-deferred');

exports.sendmsg = function (req, res) {
    registerNotificationMessage(req);
    sendGCM();
    return res.send({"status": "message has been successfully posted"});
};
exports.getmsginfo = function (req, res) {
    return res.send(global_.msg);
};

var registerNotificationMessage = function (req) {
    var sku = req.query.sku;
    var item = req.query.item || 'ipad';
    var price = req.query.price || 14.99;
    var msg = req.query.msg;
    var title = req.query.title || 'A Price Drop Alert';

    global_.msg.title = title;

    if (sku) {
        jq.when(dao.searchBySku(sku)).
            done(function (data) {
                try {
                    var info = data[0];
                    global_.msg.sku = info.skuId;
                    global_.msg.price = price;
                    updateMsgTitle(msg, price, info.names.short);
                } catch (err) { updateMsgTitle(msg, price, "")
                }
            });
    } else {
        jq.when(dao.searchByName(item)).
            done(function (data) {
                try {
                    var info = data.documents[0];
                    global_.msg.sku = info.skuid;
                    global_.msg.price = price;
                    updateMsgTitle(msg, price, info.productname);
                } catch (err) { updateMsgTitle(msg, price, "")
                }
            });
    }
};

var updateMsgTitle = function (msg, price, pName) {
    console.log('WWWW', pName);
    if (!msg) {
        global_.msg.msg = '$' + price + ' price drop for all ' + pName + ' - 1 hour deal';
    }
    console.log('global_.msg::', global_.msg);
};

var sendGCM = function () {
    var ids = global_.reg_id.reg_ids;
    var body = {
        "data": {
            "score": "A message from anto"
        },
        "notification": {
            "body": "great match!",
            "title": "Portugal vs. Denmark",
            "icon": "myicon"
        },
        "registration_ids": global_.reg_id.reg_ids
    };

    //for(i=0;i< ids.length;i++){
    request({
        url: 'https://gcm-http.googleapis.com/gcm/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AIzaSyDSfvuoqB2zb9RfxbcXkcZB7u9aHLMqMUo'
        },
        /*json: {
         "data": {
         "message": "A message from anto"
         },
         "notification": {
         "title": "Portugal vs. Denmark",
         "text": "5 to 1"
         },
         "to" : global_.reg_id.reg_ids[i]
         }*/
        json: JSON.parse(JSON.stringify(body))
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        }
    });
    //}
};

exports.getStaticImg = function (req, res, next) {
    var url = req.query.url;
    if (url && url.length != 0) {
        if (!url.startsWith('http')) {
            url = 'http://img.bbystatic.com/BestBuy_US' + url;
        }
        console.log("STATIC URL::: " + url);
        res.setHeader("content-disposition", "attachment; filename=logo.png");
        request(url).pipe(res);
    }else{
        res.send("");
    }
};