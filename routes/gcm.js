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

var isContains = function(ary, id){
    if (ary.indexOf(id) > -1) {
        return true;
    }else {
        return false;
    }
}