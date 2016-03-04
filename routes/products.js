var global_ = require('./globaldata');
var dao = require('./dao');
var jq = require('jquery-deferred');

//var request = require('request');
//var http = require('http');
var Client =  require('node-rest-client').Client;

var products = [
    {"id": 0, "firstName": "James", "lastName": "King", "reports": 4, "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "James_King.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
    {"id": 1, "firstName": "Julie", "lastName": "Taylor", "managerId": 0, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "Julie_Taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
    {"id": 2, "firstName": "Eugene", "lastName": "Lee", "managerId": 0, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "Eugene_Lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
    {"id": 3, "firstName": "John", "lastName": "Williams", "managerId": 0, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "John_Williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
    {"id": 4, "firstName": "Ray", "lastName": "Moore", "managerId": 0, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "Ray_Moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
    {"id": 5, "firstName": "Paul", "lastName": "Jones", "managerId": 3, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "Paul_Jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
    {"id": 6, "firstName": "Paula", "lastName": "Gates", "managerId": 3, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "Paula_Gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
    {"id": 7, "firstName": "Lisa", "lastName": "Wong", "managerId": 1, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "Lisa_Wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
    {"id": 8, "firstName": "Gary", "lastName": "Donovan", "managerId": 1, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "Gary_Donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
    {"id": 9, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 4, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "Kathleen_Byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
    {"id": 10, "firstName": "Amy", "lastName": "Jones", "managerId": 4, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "Amy_Jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
    {"id": 11, "firstName": "Steven", "lastName": "Wells", "managerId": 3, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "Steven_Wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
];

var product = function (skuid, productname, currentprice, imageurl) {
    this.skuid = skuid;
    this.productname = productname;
    this.currentprice = currentprice;
    this.smallimageurl = "https://pisces-ssl.bbystatic.com/image2/BestBuy_US"+imageurl;
};

var productinfo = function (obj, priceObj) {
    var secureImgUrl = 'https://pisces-ssl.bbystatic.com/image2/';
    this.skuid = "";
    this.productname = "";
    this.description = "";
    this.imageurl = "";
    this.pickup = "";
    this.ship ="";
    this.bonus ="";
    this.customerrating ="";
    this.reviewurl="/products/cust/review?query=";
    this.price = ""


    this.skuid = obj.skuId;
    try{this.productname   = obj.names.short;                                     }catch(err){}
    try{this.description   = obj.descriptions.short;                              }catch(err){}
    try{this.imageurl      = secureImgUrl + obj.media.listImage.path;             }catch(err){}
    try{this.pickup        = obj.availability.pickup.displayMessage;              }catch(err){}
    try{this.ship          = obj.availability.ship.displayMessage;                }catch(err){}
    try{this.bonus         = obj.bonusContent[0].displayName;                     }catch(err){}
    try{this.price         = obj.bonusContent[0].displayName;                     }catch(err){}
    try{this.customerrating= obj.customerRatings.averageRating.score;             }catch(err){}
    try{this.reviewurl     = this.reviewurl + obj.customerRatings.mfgAverageRating.reviewsLink.url;}catch(err){}
    try{
        if(priceObj){
            console.log('Special Price found for sku['+global_.msg.sku+'] price['+global_.msg.price+']');
            if(!priceObj.regularPrice){
                priceObj.regularPrice = priceObj.currentPrice;
            }
            if(global_.msg.sku == this.skuid && global_.msg.price){
                var num_ = Number(priceObj.currentPrice) - Number(global_.msg.price);
                num_ = Math.round(num_ * 100) / 100 ;
                this.price = "<b>Hot Sale : </b><span style='color: red;'>$"+num_+"</span><br><b>On Sale : </b><span style='text-decoration:line-through;'>$" + priceObj.currentPrice + "</span><br><b>Regular : </b><span style='text-decoration:line-through;'>$" +priceObj.regularPrice+"</span>";
            }else{
                this.price = "<b>Sale Price: </b>$" + priceObj.currentPrice + "<br><b>Regular Price: </b><span style='text-decoration:line-through;'>$" +priceObj.regularPrice + "</span>";
            }
        }else{
            this.price = "Sorry, our pricing system is down"
        }
    }catch(err){}
};

exports.findAll = function (req, res, next) {
    console.log("Inside products - findAll()");
    var query = req.query.query;
    jq.when(dao.searchByName(query)).
        done(function(data){
            products = [];
            try {
                console.log(data.documents.length);
                var l = data.documents.length;
                for (var i = 0; i < l; i++) {
                    var doc = data.documents[i];
                    products.push(new product(doc.skuid, doc.productname, doc.currentprice, doc.smallimageurl));
                }
            }catch(err){}
            console.log(products.length);
            res.send(products);
        });
};

exports.findById = function (req, res, next) {
    console.log('findById in');
    var id = req.params.id;
    if (!id) {
        res.send("Some issue with data. Please try later.");
    }
    jq.when(dao.searchBySku(id)).
        done(function(data){
            if(data){
                var sku_ = data[0].skuId;
                jq.when(dao.fetchPrice(sku_)).
                    done(function(priceData){
                        if(data){
                            res.send(new productinfo(data[0],priceData[0]));
                        }
                    });
            }else{
                res.send("Some issue with data. Please try later. Sorry!!!");
            }
        });
    console.log('findById out');
};

exports.findAll1 = function (req, res, next) {
    console.log("Inside products - findAll()");
    /*console.log("Bby flag is::"+global_.dyn.bby);
    if(global_.dyn.bby != 'Y'){
        console.log(req.url);
        console.log("Redirecting to legacy...");
        //res.writeHead(302, {'Location': 'https://progweb.heroku.com/index.html#/search'});
        //res.end();
        res.redirect('http://progweb.heroku.com/index.html#/search');
    }else{*/
        var query = req.query.query;

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
            products = [];
            try {
                console.log(data.documents.length);
                var l = data.documents.length;
                for (var i = 0; i < l; i++) {
                    var doc = data.documents[i];
                    products.push(new product(doc.skuid, doc.productname, doc.currentprice, doc.smallimageurl));
                }
            }catch(err){}
            console.log(products.length);
            res.send(products);
        });
        req.end();
        req.on('error', function (err) {
            console.log('request error', err);
        });
        /*if (name) {
            res.send(products.filter(function(product) {
                return (product.firstName + ' ' + product.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1;
            }));
        } else {
            res.send(products);
        }*/
    //}
};

exports.findById1 = function (req, res, next) {
    console.log('findById in');
    var id = req.params.id;
    if (!id) {
        res.send("Some issue with data. Please try later.");
    }
    var url = "http://www.bestbuy.com/api/1.0/product/summaries?skus="+id+"&includeInactive=false";
    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    console.log(url);
    var client = new Client();
    var req = client.get(url, args, function (data, response) {
        if(data){
            res.send(new productinfo(data[0]));
        }else{
            res.send("Some issue with data. Please try later. Sorry!!!");
        }

    });
    req.end();
    req.on('error', function (err) {
        console.log('request error', err);
    });
    console.log('findById out');
};
exports.getReview = function (req, res, next) {
    console.log('getReview in');
    var url = req.query.query;
    if (!url) {
        if(global_.dyn.showDefaultReview == 'Y'){
            url = "https://reviews.bestbuy.com/3545a/1245002/syndicatedreviews.htm?apiversion=4.7";
        }else{
            res.send("");
        }
    }
    var args = {
        headers: {"Content-Type": "text/html;charset=UTF-8", 'user-agent': 'Mozilla/5.0'}
    };
    if(url.startsWith("http:")){
        url = url.replace('http','https')
    }
    url=url+'&sourcename=Nespresso';
    console.log(url);
    var client = new Client();
    var req = client.get(url, function (data, response) {
        res.send(data);
    });
    req.end();
    req.on('error', function (err) {
        console.log('request error', err);
    });
    console.log('getReview out');
};

var getProducts = function(query) {
    if (!query) {
        query = "ipad";
    }
    var url = "http://www.bestbuy.com/api/1.0/fragment/search/www?query=" + query;
    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    console.log(url);
    var client = new Client();
    var req = client.get(url, args, function (data, response) {
        console.log(data.documents.length);
    });
    req.end();
    req.on('error', function (err) {
        console.log('request error', err);
    });
};

/*
var getProducts = function(query){
    if(!query){
        query = "ipad";
    }
    var url = "http://www.bestbuy.com/api/1.0/fragment/search/www?query="+query;
    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    //url = "http://jsonplaceholder.typicode.com/comments?postId=1";
    request({
        url: url,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            console.log("=========ERROR===============");
            console.log(error);
        } else {
            console.log("=========DATA===============");
            console.log(response.statusCode, body);
        }
    });
    console.log("=========NEXT===============");
    console.log(url);
    var client = new Client();

    var args = {
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    var client = new Client();
    var req = client.get(url, args, function (data, response) {
        //console.log(data);
        var res;
        if(Buffer.isBuffer(data)){
            res = data.toString('utf8');
        }
        console.log(data.documents.length);
        //console.log("============SER============");
        //console.log(response);
    });
    req.end();

    //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
    req.on('error', function (err) {
        console.log("*******ERROR*********");
        console.log('request error', err);
    });


    var options = {
        host: 'www.bestbuy.com',
        path: '/api/1.0/fragment/search/www?query='+query,
        headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
    };
    http.request(options, function (response) {
        var responseBody = '';
        response.on('data', function (chunk) {
            responseBody += chunk;
        });
        response.on('end', function () {
            console.log(responseBody);
            var object = JSON.parse(responseBody)
        });
    });
};
*/