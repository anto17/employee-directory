var global_ = require('./globaldata');
var jq = require('jquery-deferred');
var Client =  require('node-rest-client').Client;

exports.searchByName = function (query) {
    var dfd = jq.Deferred();
    if (query){
        var url = "http://www.bestbuy.com/api/1.0/fragment/search/www?query=" + query;
    }else{
        url = "http://www.bestbuy.com/api/1.0/fragment/search/www?currentoffers_facet=On%20Sale&rows=5&query=" + global_.dyn.dealOfDay;
    }
    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    console.log(url);
    var client = new Client();
    var req = client.get(url, args, function (data, response) {
        dfd.resolve(data);
    });
    req.end();
    req.on('error', function (err) {
        dfd.resolve(null);
    });
    return dfd.promise();
};

exports.searchBySku = function (sku) {
    var dfd = jq.Deferred();
    var url = "http://www.bestbuy.com/api/1.0/product/summaries?skus=" + sku + "&includeInactive=false";
    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    console.log(url);
    var client = new Client();
    var req = client.get(url, args, function (data, response) {
        dfd.resolve(data);
    });
    req.end();
    req.on('error', function (err) {
        dfd.resolve(null);
    });
    return dfd.promise();
}

exports.fetchPrice = function (sku) {
    var dfd = jq.Deferred();
    var url = "http://www.bestbuy.com/api/1.0/carousel/prices?skus="+sku;
    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    console.log(url);
    var client = new Client();
    var req = client.get(url, args, function (data, response) {
        dfd.resolve(data);
    });
    req.end();
    req.on('error', function (err) {
        dfd.resolve(null);
    });
    return dfd.promise();
}
