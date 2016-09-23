var global_ = require('./globaldata');
var oDesc = ["","Shipped","In Transit","Delivered"];
var oDescMsg = ["","Your order was shipped from our warehouse.","Package was reached at your city","Package was successfully delivered at your address. Thanks for shopping at Best Buy Lite. We appreciate your business and look forward to seeing you again soon. "];
exports.register = function(req, res) {
    if(!req.body.registerid) {
        return res.send({"status": "error", "message": "missing register id"});
    } else {
        console.log('Before update::'+JSON.stringify(global_.reg_id));
        if(isContains(global_.reg_id.reg_ids, req.body.registerid)){
            console.log('Already registered');
        }else{
            global_.reg_id.reg_ids.push(req.body.registerid);
            console.log('After update::'+JSON.stringify(global_.reg_id));
        }
        return res.send({"status": "success", "message": "successfully registered"});
    }
};
exports.order = function(req, res) {
    if(!req.body.order) {
        return res.send({"status": "error", "message": "missing order info"});
    } else {
        global_.order.push(req.body.order);
        return res.send({"status": "success", "message": "successfully registered"});
    }
};
exports.dyn = function(req, res) {
    var any = req.query.bby ||  req.query.dealOfDay ||  req.query.interval || req.query.showDefaultReview || req.query.order || req.query.orderId || req.query.regid;
    if(any){
        var param = req.query.bby;
        if(param){
            if(param == 'Y' || param == 'y'){
                global_.dyn.bby = 'Y';
                return res.send("Successfully activated");
            }else{
                global_.dyn.bby = 'N';
                return res.send("Successfully de-activated");
            }
        }
        param = req.query.dealOfDay;
        if(param){
            if(param.length != 0){
                global_.dyn.dealOfDay.push(param);
                return res.send("dealOfDay param updated");
            }
        }
        param = req.query.interval;
        if(param){
            if(param=='GET'){
                return res.send(global_.dyn.notifyInterval);
            }else if(param.length != 0){
                global_.dyn.notifyInterval = param;
                return res.send("notifyInterval updated");
            }
        }
        param = req.query.showDefaultReview;
        if(param){
            if(param == 'Y' || param == 'y'){
                global_.dyn.showDefaultReview = 'Y';
            }else{
                global_.dyn.showDefaultReview = 'N';
            }
            return res.send("showDefaultReview param updated by "+global_.dyn.showDefaultReview);
        }
        var param = req.query.regid;
        if(param){
           return res.send(global_.reg_id);
        }
        param = req.query.order || req.query.orderId;
        console.log(param);
        if(param){
            if(param=='GET'){
                return res.send(global_.order);
            }
            for (var i = 0; i < global_.order.length; i++) {
                console.log(req.query.order ? true : false);
                var has = false;
                if(req.query.order){
                    has = (global_.order[i].regId == param && global_.order[i].notify == 'SENT');
                }else{
                    has = global_.order[i].orderId == param;
                }
                if(global_.order[i].status != 1 &&  has){
                    var order  = global_.order[i];
                    order.statusDesc    =oDesc[global_.order[i].status-1];
                    order.statusDescMsg =oDescMsg[global_.order[i].status-1];
                    global_.order[i].notify = 'SEEN';
                    return res.send(order);
                }
            }
            return res.send("");
        }
    }else{
        return res.send(global_.dyn);
    }
};
var isContains = function(ary, id){
    if (ary.indexOf(id) > -1) {
        return true;
    }else {
        return false;
    }
}
exports.ispu = function(req, res) {
    console.log('Request Came....');
    return res.send(global_.ispu);
};
exports.ispuSet = function(req, res) {
    if(!req.body) {
        return res.send({"status": "error", "message": "missing ispu data"});
    } else {
        global_.ispu = req.body
        return res.send("Updated...");
    }
};