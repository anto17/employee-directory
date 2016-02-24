var global_ = require('./globaldata');

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
exports.dyn = function(req, res) {
    var any = req.query.bby ||  req.query.dealOfDay;
    if(any){
        var param = req.query.bby;
        if(param){
            if(param == 'Y'){
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
                global_.dyn.dealOfDay = param;
                return res.send("dealOfDay param updated");
            }
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