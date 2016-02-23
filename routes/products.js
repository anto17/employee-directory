var global_ = require('./globaldata');
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

var product = function (skuid, productname, currentprice, smallimageurl) {
    this.skuid = skuid;
    this.productname = productname;
    this.currentprice = currentprice;
    this.smallimageurl = 'http://img.bbystatic.com/BestBuy_US'+smallimageurl;
};

var productinfo = function (obj) {
    this.skuid = "";
    this.productname = "";
    this.description = "";
    this.imageurl = "";
    this.pickup = "";
    this.ship ="";
    this.bonus ="";
    this.customerrating ="";

    this.skuid = obj.skuId;
    try{this.productname   = obj.names.short;                        }catch(err){}
    try{this.description   = obj.descriptions.short;                 }catch(err){}
    try{this.imageurl      = obj.media.listImage.url;                }catch(err){}
    try{this.pickup        = obj.availability.pickup.displayMessage; }catch(err){}
    try{this.ship          = obj.availability.ship.displayMessage;   }catch(err){}
    try{this.bonus         = obj.bonusContent[0].displayName;        }catch(err){}
    try{this.customerrating= obj.customerRatings.averageRating.score;}catch(err){}
};

exports.findAll = function (req, res, next) {
    console.log("Inside products - findAll()");
    /*console.log("Bby flag is::"+global_.bby.bby);
    if(global_.bby.bby != 'Y'){
        console.log(req.url);
        console.log("Redirecting to legacy...");
        //res.writeHead(302, {'Location': 'https://progweb.heroku.com/index.html#/search'});
        //res.end();
        res.redirect('http://progweb.heroku.com/index.html#/search');
    }else{*/
        var query = req.query.query;

        if (!query)
            query = "ipad";

        var url = "http://www.bestbuy.com/api/1.0/fragment/search/www?query=" + query;
        var args = {
            headers: {"Content-Type": "application/json", 'user-agent': 'Mozilla/5.0'}
        };
        console.log(url);
        var client = new Client();
        var req = client.get(url, args, function (data, response) {
            console.log(data.documents.length);

            var l = data.documents.length;
            products = [];
            for (var i=0;i<l;i++ ){
                var doc = data.documents[i];
                products.push(new product(doc.skuid,doc.productname, doc.currentprice, doc.smallimageurl));
            }
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

exports.findById = function (req, res, next) {
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

var mockResponse = {
    "num_found": 10448,
    "documents": [
        {
            "brickandmortarstreetdate": "Thu Nov 5 06:00:00 UTC 2015",
            "skuid": "4262700",
            "skumetatype": "0",
            "documenttype": "hardgood",
            "skutype": "hardGoodSku",
            "upccode": "888462522366",
            "brickAndMortarStatus": "active",
            "brickandmortarinstockdate": "2015-11-11T06:00:00Z",
            "departmentid": "6",
            "classid": "403",
            "subclassid": "626",
            "department": "6_COMPUTERS",
            "class": "403_TABLET",
            "subclass": "626_APPLE WIFI",
            "modelnumber": "ML0R2LL/A",
            "ordercode": "Buy",
            "brickandmortaroutofstockdate": "2017-10-17T05:00:00Z",
            "brand": "Apple",
            "width": "8.68",
            "smallimageurl": "/images/products/4262/4262700_s.gif",
            "category_facet": "4|pcmcat748300580149@iPad Pro,3|pcmcat209000050007@iPad,2|pcmcat209000050006@Tablets,1|abcat0500000@Computers & Tablets,0|cat00000@Best Buy,0|root@Omni Channel Root",
            "productname": "iPad Pro with Wi-Fi - 128GB",
            "skushortlabel": "Apple - iPad Pro with Wi-Fi - 128GB - Gold",
            "iboffered": "no",
            "shortdescription": "<ul class=\"product-short-description\"><li>12.9-inch (diagonal) Retina Display</li><li>A9X third-generation chip with 64-bit architecture</li><li>M9 motion coprocessor</li><li>FaceTime HD camera</li><li>iSight camera</li><li>Touch ID</li><li>Apple Pay</li></ul>",
            "energycomp": "false",
            "currentprice": "949.99",
            "title": "iPad Pro with Wi-Fi - 128GB",
            "documentid": "4262700",
            "productid": "1219747522322",
            "connecttype": "3",
            "mediumimageurl": "/images/products/4262/4262700fp.gif",
            "mediumimagealttag": "Apple ML0R2LL/A Front Medium",
            "mediumimageheight": "97",
            "mediumimagewidth": "70",
            "smallimagealttag": "Apple ML0R2LL/A Front Thumbnail",
            "smallimageheight": "75",
            "smallimagewidth": "54",
            "largeimageurl": "/images/products/4262/4262700_sc.jpg",
            "largeimagealttag": "Apple ML0R2LL/A Front Detail",
            "largeimageheight": "145",
            "largeimagewidth": "105",
            "height": "12",
            "depth": "0.27",
            "weight": "3.6",
            "onsale": "false",
            "listprice": "949.99",
            "color": "Gold",
            "albumtitle": "iPad Pro with Wi-Fi - 128GB",
            "streetdate": "Wed Nov 11 06:00:00 UTC 2015",
            "categoryid": "pcmcat748300580149",
            "category": "iPad Pro",
            "instoreavailid": "115",
            "shiptohomeavailid": "788",
            "backorderminavaildays": "14",
            "backordermaxavaildays": "28",
            "relsdatedisplayflag": "1",
            "currentpricesaletype": "N",
            "deliverytype": "0",
            "currentpriceeventtype": "R",
            "[elevated]": "false",
            "customerrating": "4.8",
            "numberofreviews": "939",
            "skuitemtype": "0",
            "musicgenre": "iPad Pro",
            "condition": "New,Open-Box",
            "freeshippingflag": "false",
            "minimumadvertisedprice": "false",
            "newarrival": "false",
            "accesstype": "0"
        },
        {
            "brickandmortarstreetdate": "Fri Nov 1 05:00:00 UTC 2013",
            "skuid": "2579045",
            "skumetatype": "0",
            "documenttype": "hardgood",
            "skutype": "hardGoodSku",
            "upccode": "888462098830",
            "brickAndMortarStatus": "active",
            "brickandmortarinstockdate": "2013-11-01T05:00:00Z",
            "departmentid": "6",
            "classid": "403",
            "subclassid": "626",
            "department": "6_COMPUTERS",
            "class": "403_TABLET",
            "subclass": "626_APPLE WIFI",
            "modelnumber": "MD788LL/A",
            "ordercode": "Buy",
            "brickandmortaroutofstockdate": "2016-04-02T05:00:00Z",
            "brand": "Apple",
            "width": "6.6",
            "smallimageurl": "/images/products/2579/2579045_s.gif",
            "category_facet": "3|pcmcat209000050007@iPad,2|pcmcat209000050006@Tablets,1|abcat0500000@Computers & Tablets,0|cat00000@Best Buy,0|root@Omni Channel Root,3|pcmcat209000050008@All Tablets,4|pcmcat361600050004@iPad Air",
            "productname": "iPad® Air with Wi-Fi - 16GB",
            "skushortlabel": "Apple - iPad® Air with Wi-Fi - 16GB - Silver",
            "iboffered": "no",
            "shortdescription": "<ul class=\"product-short-description\"><li>9.7\" Retina Display with 2048 x 1536 resolution</li><li>Apple iOS 7</li><li>16GB storage capacity</li><li>A7 chip with M7 motion coprocessor</li><li>Wi-Fi</li><li>5.0MP iSight camera with 1080p HD video recording</li></ul>",
            "currentprice": "399.99",
            "title": "iPad® Air with Wi-Fi - 16GB",
            "documentid": "2579045",
            "productid": "1219074892314",
            "connecttype": "3",
            "mediumimageurl": "/images/products/2579/2579045fp.gif",
            "mediumimagealttag": "Apple MD788LL/A Front Medium",
            "mediumimageheight": "99",
            "mediumimagewidth": "70",
            "smallimagealttag": "Apple MD788LL/A Front Thumbnail",
            "smallimageheight": "76",
            "smallimagewidth": "54",
            "largeimageurl": "/images/products/2579/2579045_sc.jpg",
            "largeimagealttag": "Apple MD788LL/A Front Detail",
            "largeimageheight": "149",
            "largeimagewidth": "105",
            "height": "9.4",
            "weight": "1.8",
            "onsale": "false",
            "listprice": "399.99",
            "color": "Silver",
            "albumtitle": "iPad® Air with Wi-Fi - 16GB",
            "streetdate": "Fri Nov 1 05:00:00 UTC 2013",
            "categoryid": "pcmcat209000050007",
            "category": "iPad",
            "instoreavailid": "808",
            "shiptohomeavailid": "110",
            "backorderminavaildays": "14",
            "backordermaxavaildays": "28",
            "relsdatedisplayflag": "1",
            "currentpricesaletype": "N",
            "deliverytype": "0",
            "currentpriceeventtype": "R",
            "[elevated]": "false",
            "customerrating": "4.8",
            "numberofreviews": "7217",
            "skuitemtype": "0",
            "musicgenre": "iPad",
            "condition": "New,Open-Box",
            "freeshippingflag": "false",
            "minimumadvertisedprice": "false",
            "newarrival": "false",
            "accesstype": "0"
        },
        {
            "brickandmortarstreetdate": "Wed Sep 16 05:00:00 UTC 2015",
            "skuid": "4266103",
            "skumetatype": "0",
            "documenttype": "hardgood",
            "skutype": "hardGoodSku",
            "upccode": "888462367530",
            "brickAndMortarStatus": "active",
            "brickandmortarinstockdate": "2015-09-18T05:00:00Z",
            "departmentid": "6",
            "classid": "403",
            "subclassid": "626",
            "department": "6_COMPUTERS",
            "class": "403_TABLET",
            "subclass": "626_APPLE WIFI",
            "modelnumber": "MK6L2LL/A",
            "ordercode": "Buy",
            "brickandmortaroutofstockdate": "2017-09-18T05:00:00Z",
            "brand": "Apple",
            "width": "5.3",
            "smallimageurl": "/images/products/4266/4266103_s.gif",
            "category_facet": "3|pcmcat209000050007@iPad,2|pcmcat209000050006@Tablets,1|abcat0500000@Computers & Tablets,0|cat00000@Best Buy,0|root@Omni Channel Root,4|pcmcat748300580260@iPad mini 4",
            "productname": "iPad mini 4 Wi-Fi 16GB",
            "skushortlabel": "Apple - iPad mini 4 Wi-Fi 16GB - Gold",
            "iboffered": "no",
            "shortdescription": "<li>7.9\" Retina display</li><li>Apple iOS 9</li><li>16GB storage capacity</li><li>A8 chip </li><li>Wi-Fi</li><li>8MP iSight camera</li>",
            "energycomp": "false",
            "currentprice": "399.99",
            "title": "iPad mini 4 Wi-Fi 16GB",
            "documentid": "4266103",
            "productid": "1219731746404",
            "connecttype": "3",
            "mediumimageurl": "/images/products/4266/4266103fp.gif",
            "mediumimagealttag": "Apple MK6L2LL/A Front Medium",
            "mediumimageheight": "106",
            "mediumimagewidth": "70",
            "smallimagealttag": "Apple MK6L2LL/A Front Thumbnail",
            "smallimageheight": "81",
            "smallimagewidth": "54",
            "largeimageurl": "/images/products/4266/4266103_sc.jpg",
            "largeimagealttag": "Apple MK6L2LL/A Front Detail",
            "largeimageheight": "158",
            "largeimagewidth": "105",
            "height": "8",
            "depth": "0.24",
            "weight": "1.2",
            "onsale": "false",
            "listprice": "399.99",
            "color": "Gold",
            "albumtitle": "iPad mini 4 Wi-Fi 16GB",
            "streetdate": "Wed Sep 16 05:00:00 UTC 2015",
            "categoryid": "pcmcat209000050007",
            "category": "iPad",
            "instoreavailid": "115",
            "shiptohomeavailid": "110",
            "backorderminavaildays": "14",
            "backordermaxavaildays": "28",
            "relsdatedisplayflag": "1",
            "currentpricesaletype": "N",
            "deliverytype": "0",
            "currentpriceeventtype": "R",
            "[elevated]": "false",
            "customerrating": "4.8",
            "numberofreviews": "695",
            "skuitemtype": "0",
            "musicgenre": "iPad",
            "condition": "New,Open-Box",
            "freeshippingflag": "false",
            "minimumadvertisedprice": "false",
            "newarrival": "false",
            "accesstype": "0"
        }
    ],
    "facets": [
        {
            "systemName": "Dynamic Category",
            "displayName": "Category",
            "facetField": "category_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "a9k",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "iPad & Tablet Accessories",
                    "cat_path": "pcmcat309900050001"
                },
                {
                    "value": "iPad Accessories",
                    "cat_path": "pcmcat217900050000"
                },
                {
                    "value": "iPhone Cases & Clips",
                    "cat_path": "pcmcat214700050000"
                },
                {
                    "value": "Cases, Covers & Keyboard Folios",
                    "cat_path": "pcmcat242000050002"
                },
                {
                    "value": "Cell Phone Accessories",
                    "cat_path": "abcat0811002"
                },
                {
                    "value": "Adapters, Cables & Chargers",
                    "cat_path": "abcat0811007"
                },
                {
                    "value": "Tablets",
                    "cat_path": "pcmcat209000050006"
                },
                {
                    "value": "Laptop Accessories",
                    "cat_path": "abcat0515025"
                },
                {
                    "value": "Headphones",
                    "cat_path": "abcat0204000"
                },
                {
                    "value": "Audio",
                    "cat_path": "abcat0200000"
                },
                {
                    "value": "iPhone Accessories",
                    "cat_path": "pcmcat191200050015"
                },
                {
                    "value": "Cables & Connectors",
                    "cat_path": "abcat0515012"
                },
                {
                    "value": "Over-Ear & On-Ear Headphones",
                    "cat_path": "pcmcat143000050011"
                },
                {
                    "value": "Cell Phone Batteries & Power",
                    "cat_path": "abcat0811004"
                },
                {
                    "value": "Speakers",
                    "cat_path": "abcat0205000"
                },
                {
                    "value": "Inkjet Printers",
                    "cat_path": "abcat0511002"
                },
                {
                    "value": "All Printers",
                    "cat_path": "pcmcat266500050030"
                },
                {
                    "value": "Apple Watch Accessories",
                    "cat_path": "pcmcat377500050002"
                },
                {
                    "value": "Cases & Armbands",
                    "cat_path": "abcat0208008"
                },
                {
                    "value": "Cables & Chargers",
                    "cat_path": "abcat0208009"
                },
                {
                    "value": "Laser Printers",
                    "cat_path": "abcat0511003"
                },
                {
                    "value": "Computers & Tablets",
                    "cat_path": "abcat0500000"
                },
                {
                    "value": "Health, Fitness & Beauty",
                    "cat_path": "pcmcat242800050021"
                },
                {
                    "value": "iPad & Tablet Package Deals",
                    "cat_path": "pcmcat326100050015"
                },
                {
                    "value": "Receivers & Amplifiers",
                    "cat_path": "pcmcat309300050002"
                },
                {
                    "value": "iPad Cases, Covers & Keyboard Folios",
                    "cat_path": "pcmcat218000050000"
                },
                {
                    "value": "Headsets & Microphones",
                    "cat_path": "pcmcat304600050012"
                },
                {
                    "value": "Education, Reference & Language",
                    "cat_path": "pcmcat209600050012"
                },
                {
                    "value": "iPod & MP3 Player Accessories",
                    "cat_path": "abcat0208007"
                },
                {
                    "value": "Camera Bags & Cases",
                    "cat_path": "abcat0410001"
                },
                {
                    "value": "Security Cameras & Surveillance",
                    "cat_path": "pcmcat308100050020"
                },
                {
                    "value": "Computer Keyboards",
                    "cat_path": "abcat0513004"
                },
                {
                    "value": "Recording Equipment",
                    "cat_path": "pcmcat152100050020"
                },
                {
                    "value": "iPad",
                    "cat_path": "pcmcat209000050007"
                },
                {
                    "value": "Toys",
                    "cat_path": "pcmcat748301546815"
                },
                {
                    "value": "Home Theater Systems",
                    "cat_path": "abcat0203000"
                },
                {
                    "value": "Name Brands",
                    "cat_path": "pcmcat128500050004"
                },
                {
                    "value": "Music, Photo & Video Editing",
                    "cat_path": "pcmcat253300050007"
                },
                {
                    "value": "Connected Home",
                    "cat_path": "pcmcat254000050002"
                },
                {
                    "value": "Cell Phone Headsets",
                    "cat_path": "pcmcat171900050028"
                },
                {
                    "value": "E-Reader Accessories",
                    "cat_path": "pcmcat193100050015"
                },
                {
                    "value": "Luggage, Bags & Travel",
                    "cat_path": "pcmcat253700050018"
                },
                {
                    "value": "Docks, Radios & Boomboxes",
                    "cat_path": "pcmcat344200050005"
                },
                {
                    "value": "Mice & Keyboards",
                    "cat_path": "abcat0513000"
                },
                {
                    "value": "Computer Accessories & Peripherals",
                    "cat_path": "abcat0515000"
                },
                {
                    "value": "Wireless & Multiroom Audio",
                    "cat_path": "pcmcat186600050004"
                },
                {
                    "value": "Remote Controls",
                    "cat_path": "abcat0107039"
                },
                {
                    "value": "Musical Instrument Accessories",
                    "cat_path": "abcat0208024"
                },
                {
                    "value": "Keyboards",
                    "cat_path": "pcmcat151600050037"
                },
                {
                    "value": "Car & Travel Accessories",
                    "cat_path": "pcmcat326300050013"
                },
                {
                    "value": "Musical Instruments",
                    "cat_path": "abcat0207000"
                },
                {
                    "value": "Scanners, Faxes & Copiers",
                    "cat_path": "abcat0511007"
                },
                {
                    "value": "Apple",
                    "cat_path": "pcmcat128500050005"
                },
                {
                    "value": "Deck Installation Parts",
                    "cat_path": "pcmcat165900050031"
                },
                {
                    "value": "A/V Cables & Connectors",
                    "cat_path": "abcat0107015"
                },
                {
                    "value": "Digital Camera Accessories",
                    "cat_path": "abcat0410000"
                },
                {
                    "value": "Monitor & Screen Accessories",
                    "cat_path": "pcmcat221100050003"
                },
                {
                    "value": "Smartphone & iPod Car Connectors",
                    "cat_path": "abcat0307011"
                },
                {
                    "value": "Office Electronics",
                    "cat_path": "abcat0805000"
                },
                {
                    "value": "Microphones & Accessories",
                    "cat_path": "pcmcat251600050003"
                },
                {
                    "value": "Radios",
                    "cat_path": "pcmcat310200050005"
                },
                {
                    "value": "Networking & Wireless",
                    "cat_path": "abcat0503000"
                },
                {
                    "value": "Hard Drives & Storage",
                    "cat_path": "abcat0504001"
                },
                {
                    "value": "Software",
                    "cat_path": "abcat0508000"
                },
                {
                    "value": "Printers, Ink & Toner",
                    "cat_path": "abcat0511001"
                },
                {
                    "value": "DJ & Lighting Equipment",
                    "cat_path": "pcmcat152100050027"
                },
                {
                    "value": "Photography Accessories",
                    "cat_path": "pcmcat373300050003"
                },
                {
                    "value": "Antivirus, Security & Utilities",
                    "cat_path": "abcat0508042"
                },
                {
                    "value": "Telephones & Communication",
                    "cat_path": "abcat0802000"
                },
                {
                    "value": "Car Installation Parts & Accessories",
                    "cat_path": "pcmcat165900050023"
                },
                {
                    "value": "Smart Lighting",
                    "cat_path": "pcmcat345400050002"
                },
                {
                    "value": "Tripods & Monopods",
                    "cat_path": "abcat0410045"
                },
                {
                    "value": "Business & Office",
                    "cat_path": "abcat0508003"
                },
                {
                    "value": "Surge Protectors & Power",
                    "cat_path": "abcat0515042"
                },
                {
                    "value": "Personal Care & Beauty",
                    "cat_path": "abcat0915000"
                },
                {
                    "value": "Live Sound Speakers",
                    "cat_path": "pcmcat152200050008"
                },
                {
                    "value": "Home Audio",
                    "cat_path": "pcmcat241600050001"
                },
                {
                    "value": "Home Alarms & Sensors",
                    "cat_path": "pcmcat308400050001"
                },
                {
                    "value": "TV & Home Theater",
                    "cat_path": "abcat0100000"
                },
                {
                    "value": "TV Mounts",
                    "cat_path": "abcat0106004"
                },
                {
                    "value": "Karaoke",
                    "cat_path": "abcat0207005"
                },
                {
                    "value": "Car Video",
                    "cat_path": "abcat0303000"
                },
                {
                    "value": "Car Security & Remote Starters",
                    "cat_path": "abcat0304000"
                },
                {
                    "value": "Memory Cards",
                    "cat_path": "abcat0404000"
                },
                {
                    "value": "Binoculars, Telescopes & Optics",
                    "cat_path": "abcat0409000"
                },
                {
                    "value": "NAS/Personal Cloud Storage",
                    "cat_path": "abcat0504004"
                },
                {
                    "value": "Amps & Effects",
                    "cat_path": "pcmcat151600050019"
                },
                {
                    "value": "Microphones",
                    "cat_path": "pcmcat152100050038"
                },
                {
                    "value": "Digital Audio Cables",
                    "cat_path": "pcmcat175600050012"
                },
                {
                    "value": "Splitters, Couplers & Adapters",
                    "cat_path": "pcmcat175600050017"
                },
                {
                    "value": "Lens Accessories",
                    "cat_path": "pcmcat195200050005"
                },
                {
                    "value": "Recording Furniture & Stands",
                    "cat_path": "pcmcat205700050037"
                },
                {
                    "value": "Routers",
                    "cat_path": "pcmcat211400050001"
                },
                {
                    "value": "Travel Accessories",
                    "cat_path": "pcmcat271700050005"
                },
                {
                    "value": "Household Batteries",
                    "cat_path": "pcmcat303600050001"
                },
                {
                    "value": "Samsung Galaxy Accessories",
                    "cat_path": "pcmcat305200050007"
                }
            ]
        },
        {
            "systemName": "Current Offers (dynamic)",
            "displayName": "Current Offers",
            "facetField": "currentoffers_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "aag",
            "joinCondition": "AND",
            "values": [
                {
                    "value": "On Sale",
                    "count": 4005
                },
                {
                    "value": "Free Shipping Eligible",
                    "count": 9265
                },
                {
                    "value": "Clearance",
                    "count": 288
                }
            ]
        },
        {
            "systemName": "Brand (dynamic)",
            "displayName": "Brand",
            "facetField": "brand_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "bcj",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Insten",
                    "count": 1777
                },
                {
                    "value": "Fintie",
                    "count": 827
                },
                {
                    "value": "eForCity",
                    "count": 591
                },
                {
                    "value": "Apple",
                    "count": 367
                },
                {
                    "value": "DrHotDeal",
                    "count": 367
                },
                {
                    "value": "Fosmon",
                    "count": 351
                },
                {
                    "value": "Griffin Technology",
                    "count": 300
                },
                {
                    "value": "GreatShield",
                    "count": 238
                },
                {
                    "value": "EEEKit",
                    "count": 190
                },
                {
                    "value": "Targus",
                    "count": 172
                },
                {
                    "value": "i-Blason",
                    "count": 168
                },
                {
                    "value": "USA Gear",
                    "count": 165
                },
                {
                    "value": "Monoprice",
                    "count": 139
                },
                {
                    "value": "JAVOedge",
                    "count": 124
                },
                {
                    "value": "Belkin",
                    "count": 122
                },
                {
                    "value": "Precision Touch",
                    "count": 118
                },
                {
                    "value": "Samsung",
                    "count": 111
                },
                {
                    "value": "Logitech",
                    "count": 90
                },
                {
                    "value": "Case Logic",
                    "count": 86
                },
                {
                    "value": "Speck",
                    "count": 86
                },
                {
                    "value": "ZAGG",
                    "count": 79
                },
                {
                    "value": "Incipio",
                    "count": 78
                },
                {
                    "value": "RND Power Solutions",
                    "count": 75
                },
                {
                    "value": "Insignia™",
                    "count": 74
                },
                {
                    "value": "Kensington",
                    "count": 74
                },
                {
                    "value": "Verbatim",
                    "count": 70
                },
                {
                    "value": "Canon",
                    "count": 59
                },
                {
                    "value": "AGPtek",
                    "count": 57
                },
                {
                    "value": "GOgroove",
                    "count": 57
                },
                {
                    "value": "MGear",
                    "count": 57
                },
                {
                    "value": "OtterBox",
                    "count": 57
                },
                {
                    "value": "HP",
                    "count": 56
                },
                {
                    "value": "Platinum",
                    "count": 53
                },
                {
                    "value": "Gumdrop Cases",
                    "count": 51
                },
                {
                    "value": "roocase",
                    "count": 49
                },
                {
                    "value": "Solo",
                    "count": 48
                },
                {
                    "value": "Epson",
                    "count": 44
                },
                {
                    "value": "Gear Head",
                    "count": 44
                },
                {
                    "value": "Gearonic",
                    "count": 44
                },
                {
                    "value": "Hard Candy Cases",
                    "count": 40
                },
                {
                    "value": "Mobile Edge",
                    "count": 40
                },
                {
                    "value": "iHome",
                    "count": 40
                },
                {
                    "value": "Microsoft",
                    "count": 38
                },
                {
                    "value": "Modal",
                    "count": 37
                },
                {
                    "value": "Gumdrop",
                    "count": 36
                },
                {
                    "value": "Dynex™",
                    "count": 35
                },
                {
                    "value": "JisonCase",
                    "count": 35
                },
                {
                    "value": "Macally",
                    "count": 34
                },
                {
                    "value": "AudioQuest",
                    "count": 29
                },
                {
                    "value": "Onkyo",
                    "count": 29
                },
                {
                    "value": "Image",
                    "count": 28
                },
                {
                    "value": "Kanex",
                    "count": 27
                },
                {
                    "value": "Rosetta Stone",
                    "count": 26
                },
                {
                    "value": "iDance",
                    "count": 26
                },
                {
                    "value": "IK Multimedia",
                    "count": 25
                },
                {
                    "value": "Incase",
                    "count": 25
                },
                {
                    "value": "Agptek",
                    "count": 24
                },
                {
                    "value": "Dell",
                    "count": 24
                },
                {
                    "value": "Green Onions Supply",
                    "count": 24
                },
                {
                    "value": "Scosche",
                    "count": 24
                },
                {
                    "value": "Klipsch",
                    "count": 23
                },
                {
                    "value": "Yamaha",
                    "count": 23
                },
                {
                    "value": "SUP",
                    "count": 22
                },
                {
                    "value": "Asus",
                    "count": 21
                },
                {
                    "value": "BasAcc",
                    "count": 21
                },
                {
                    "value": "Beats by Dr. Dre",
                    "count": 21
                },
                {
                    "value": "TYLT",
                    "count": 21
                },
                {
                    "value": "Amazon",
                    "count": 20
                },
                {
                    "value": "Minisuit",
                    "count": 20
                },
                {
                    "value": "Samsonite",
                    "count": 20
                },
                {
                    "value": "Tamrac",
                    "count": 20
                },
                {
                    "value": "The Joy Factory",
                    "count": 20
                },
                {
                    "value": "kate spade new york",
                    "count": 20
                },
                {
                    "value": "Accessory Power",
                    "count": 19
                },
                {
                    "value": "Trident",
                    "count": 19
                },
                {
                    "value": "4XEM",
                    "count": 18
                },
                {
                    "value": "Bracketron",
                    "count": 18
                },
                {
                    "value": "iSound",
                    "count": 18
                },
                {
                    "value": "Bose®",
                    "count": 17
                },
                {
                    "value": "Brother",
                    "count": 17
                },
                {
                    "value": "Cobble Pro",
                    "count": 17
                },
                {
                    "value": "Seismic Audio",
                    "count": 17
                },
                {
                    "value": "Wacom",
                    "count": 17
                },
                {
                    "value": "Codi",
                    "count": 16
                },
                {
                    "value": "Hipstreet",
                    "count": 16
                },
                {
                    "value": "LifeProof",
                    "count": 16
                },
                {
                    "value": "Panasonic",
                    "count": 16
                },
                {
                    "value": "Hasbro",
                    "count": 15
                },
                {
                    "value": "Jill-e",
                    "count": 15
                },
                {
                    "value": "Sony",
                    "count": 15
                },
                {
                    "value": "V7",
                    "count": 15
                },
                {
                    "value": "ZeroChroma",
                    "count": 15
                },
                {
                    "value": "Adesso",
                    "count": 14
                },
                {
                    "value": "Audio-Technica",
                    "count": 14
                },
                {
                    "value": "Digital Treasures",
                    "count": 14
                },
                {
                    "value": "Lenmar",
                    "count": 14
                },
                {
                    "value": "Sandy Lisa",
                    "count": 14
                },
                {
                    "value": "Swann",
                    "count": 14
                },
                {
                    "value": "iLive",
                    "count": 14
                },
                {
                    "value": "iLuv",
                    "count": 14
                }
            ]
        },
        {
            "systemName": "Price (dynamic)",
            "displayName": "Price",
            "facetField": "currentprice_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 15,
            "uniqueFacetId": "bfb",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Less than $50",
                    "count": 8380
                },
                {
                    "value": "$50 - $99.99",
                    "count": 1029
                },
                {
                    "value": "$100 - $149.99",
                    "count": 242
                },
                {
                    "value": "$150 - $199.99",
                    "count": 195
                },
                {
                    "value": "$200 - $249.99",
                    "count": 147
                },
                {
                    "value": "$250 - $499.99",
                    "count": 308
                },
                {
                    "value": "$500 - $749.99",
                    "count": 71
                },
                {
                    "value": "$750 - $999.99",
                    "count": 36
                },
                {
                    "value": "$1000 - $1249.99",
                    "count": 20
                },
                {
                    "value": "$1250 - $1499.99",
                    "count": 10
                },
                {
                    "value": "$1500 - $1999.99",
                    "count": 4
                },
                {
                    "value": "$2000 - $2499.99",
                    "count": 3
                },
                {
                    "value": "$3000 and Up",
                    "count": 3
                }
            ]
        },
        {
            "systemName": "Sold By",
            "displayName": "Sold By",
            "facetField": "soldby_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "ct",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Marketplace Seller",
                    "count": 8189
                },
                {
                    "value": "Best Buy",
                    "count": 2259
                }
            ]
        },
        {
            "systemName": "Features Dynamic Search",
            "displayName": "Features",
            "facetField": "featuresdynamic_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "ag8",
            "joinCondition": "AND",
            "values": [
                {
                    "value": "Play-Through Design",
                    "count": 854
                },
                {
                    "value": "Integrated Stand",
                    "count": 472
                },
                {
                    "value": "Bluetooth Enabled",
                    "count": 356
                },
                {
                    "value": "Wireless",
                    "count": 277
                },
                {
                    "value": "Non-Slip Grip",
                    "count": 274
                },
                {
                    "value": "Wi-Fi Built-in",
                    "count": 271
                },
                {
                    "value": "Touch Screen",
                    "count": 235
                },
                {
                    "value": "Scratch Resistant",
                    "count": 216
                },
                {
                    "value": "Built-In Microphone",
                    "count": 202
                },
                {
                    "value": "Shock Absorbent",
                    "count": 193
                },
                {
                    "value": "Rear-Facing Camera",
                    "count": 192
                },
                {
                    "value": "Headphone Jack",
                    "count": 169
                },
                {
                    "value": "Mobile Device Printing",
                    "count": 168
                },
                {
                    "value": "Impact Resistant",
                    "count": 160
                },
                {
                    "value": "Screen Protection",
                    "count": 158
                },
                {
                    "value": "Video Recording",
                    "count": 145
                },
                {
                    "value": "Double-Sided Printing",
                    "count": 139
                },
                {
                    "value": "Display Screen",
                    "count": 129
                },
                {
                    "value": "Front-Facing Camera",
                    "count": 123
                },
                {
                    "value": "Sound Isolating",
                    "count": 116
                },
                {
                    "value": "Rechargeable",
                    "count": 108
                },
                {
                    "value": "Internal Memory",
                    "count": 104
                },
                {
                    "value": "USB Port(s)",
                    "count": 95
                },
                {
                    "value": "GPS Enabled",
                    "count": 86
                },
                {
                    "value": "Water Resistant",
                    "count": 84
                },
                {
                    "value": "Phone Control",
                    "count": 82
                },
                {
                    "value": "Auto Document Feeder",
                    "count": 73
                },
                {
                    "value": "Carrying Case Included",
                    "count": 73
                },
                {
                    "value": "In-Line Control",
                    "count": 73
                },
                {
                    "value": "Auto Reduction/Enlargement",
                    "count": 71
                },
                {
                    "value": "Auxiliary Input",
                    "count": 68
                },
                {
                    "value": "Overload Protection",
                    "count": 61
                },
                {
                    "value": "Touch-Screen Compatible",
                    "count": 57
                },
                {
                    "value": "Wireless Display",
                    "count": 55
                },
                {
                    "value": "In-Line Volume Control",
                    "count": 53
                },
                {
                    "value": "Replaceable Stylus Tip",
                    "count": 51
                },
                {
                    "value": "Memory Card Slot",
                    "count": 41
                },
                {
                    "value": "Anti-Glare",
                    "count": 37
                },
                {
                    "value": "Wireless Syncing",
                    "count": 37
                },
                {
                    "value": "Plug and Play",
                    "count": 36
                },
                {
                    "value": "Adjustable Tilt",
                    "count": 32
                },
                {
                    "value": "Bluetooth Built-In",
                    "count": 32
                },
                {
                    "value": "Foldable Design",
                    "count": 32
                },
                {
                    "value": "Remote Monitoring",
                    "count": 32
                },
                {
                    "value": "Remote Control Included",
                    "count": 31
                },
                {
                    "value": "Anti-Fingerprint",
                    "count": 28
                },
                {
                    "value": "Padded Laptop Compartment",
                    "count": 27
                },
                {
                    "value": "Double-Sided Scanning",
                    "count": 26
                },
                {
                    "value": "MP3 Player Connectable",
                    "count": 26
                },
                {
                    "value": "Pocket Clip",
                    "count": 25
                },
                {
                    "value": "TWAIN Compliant",
                    "count": 25
                },
                {
                    "value": "Night Vision",
                    "count": 24
                },
                {
                    "value": "Residue-Free Removal",
                    "count": 24
                },
                {
                    "value": "Smart Capable",
                    "count": 23
                },
                {
                    "value": "Smartphone Compatible",
                    "count": 23
                },
                {
                    "value": "Wireless Capability",
                    "count": 23
                },
                {
                    "value": "Color Display",
                    "count": 22
                },
                {
                    "value": "HDMI Output(s)",
                    "count": 22
                },
                {
                    "value": "Adjustable Headband",
                    "count": 19
                },
                {
                    "value": "Clock Display",
                    "count": 19
                },
                {
                    "value": "Dust Resistant",
                    "count": 19
                },
                {
                    "value": "Comfort Grip",
                    "count": 17
                },
                {
                    "value": "High Definition",
                    "count": 16
                },
                {
                    "value": "Noise Canceling",
                    "count": 16
                },
                {
                    "value": "Rechargeable Battery",
                    "count": 16
                },
                {
                    "value": "Ergonomic Design",
                    "count": 15
                },
                {
                    "value": "Lockable",
                    "count": 15
                },
                {
                    "value": "On/Off Switch",
                    "count": 15
                },
                {
                    "value": "ENERGY STAR Certified",
                    "count": 14
                },
                {
                    "value": "Cell Phone Pocket",
                    "count": 13
                },
                {
                    "value": "Integrated Writing Pen",
                    "count": 13
                },
                {
                    "value": "In-Line Remote",
                    "count": 12
                },
                {
                    "value": "Multimedia Keys",
                    "count": 12
                },
                {
                    "value": "PictBridge Enabled",
                    "count": 12
                },
                {
                    "value": "USB Device Charging",
                    "count": 12
                },
                {
                    "value": "Equalizer",
                    "count": 11
                },
                {
                    "value": "Pan-Tilt-Zoom",
                    "count": 11
                },
                {
                    "value": "Touchpad",
                    "count": 11
                },
                {
                    "value": "Velocity-Sensitive Keys",
                    "count": 11
                },
                {
                    "value": "Volume Control",
                    "count": 11
                },
                {
                    "value": "3D-Ready",
                    "count": 10
                },
                {
                    "value": "Breathable Back",
                    "count": 10
                },
                {
                    "value": "Indicator Light(s)",
                    "count": 10
                },
                {
                    "value": "Self-Adhesive",
                    "count": 10
                },
                {
                    "value": "Transparency Scanning",
                    "count": 10
                },
                {
                    "value": "Water Bottle Holder",
                    "count": 10
                },
                {
                    "value": "4K Ultra HD Compatible",
                    "count": 9
                },
                {
                    "value": "Auxiliary Input(s)",
                    "count": 9
                },
                {
                    "value": "CD Player",
                    "count": 9
                },
                {
                    "value": "Integrated Speaker(s)",
                    "count": 9
                },
                {
                    "value": "Padded Back Panel",
                    "count": 9
                },
                {
                    "value": "Plug-In",
                    "count": 9
                },
                {
                    "value": "Portable Design",
                    "count": 9
                },
                {
                    "value": "4K UHD Video Pass Through",
                    "count": 8
                },
                {
                    "value": "CD-R/RW Compatible",
                    "count": 8
                },
                {
                    "value": "Compact Design",
                    "count": 8
                },
                {
                    "value": "Digital Effects",
                    "count": 8
                },
                {
                    "value": "Integrated Charger",
                    "count": 8
                },
                {
                    "value": "NFC Enabled",
                    "count": 8
                },
                {
                    "value": "Privacy Filter",
                    "count": 8
                }
            ]
        },
        {
            "systemName": "Processor Brand (dynamic)",
            "displayName": "Processor Brand",
            "facetField": "processorbrand_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "abn",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Apple",
                    "count": 90
                },
                {
                    "value": "AllWinner",
                    "count": 1
                },
                {
                    "value": "Intel",
                    "count": 1
                },
                {
                    "value": "Samsung",
                    "count": 1
                }
            ]
        },
        {
            "systemName": "Internal Memory (dynamic)",
            "displayName": "Internal Memory",
            "facetField": "internalmemorysv_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "c4b",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Yes",
                    "count": 104
                },
                {
                    "value": "No",
                    "count": 67
                },
                {
                    "value": "128 megabytes",
                    "count": 1
                },
                {
                    "value": "128 gigabytes",
                    "count": 13
                },
                {
                    "value": "64 gigabytes",
                    "count": 14
                },
                {
                    "value": "32 gigabytes",
                    "count": 18
                },
                {
                    "value": "16 gigabytes",
                    "count": 27
                },
                {
                    "value": "0 gigabytes",
                    "count": 1
                }
            ]
        },
        {
            "systemName": "Model Family (dynamic)",
            "displayName": "Model Family",
            "facetField": "modelfamily_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "ab9",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Apple iPad mini 4",
                    "count": 18
                },
                {
                    "value": "Apple iPad Air 2",
                    "count": 17
                },
                {
                    "value": "Apple iPad mini 2",
                    "count": 14
                },
                {
                    "value": "Apple iPad Air",
                    "count": 11
                },
                {
                    "value": "Apple iPad mini 3",
                    "count": 8
                },
                {
                    "value": "Apple iPad",
                    "count": 6
                },
                {
                    "value": "Apple iPad mini",
                    "count": 3
                },
                {
                    "value": "iPad",
                    "count": 2
                },
                {
                    "value": "Apple iPad 2",
                    "count": 1
                },
                {
                    "value": "Apple iPhone",
                    "count": 1
                },
                {
                    "value": "Apple iPhoneApple iPod",
                    "count": 1
                },
                {
                    "value": "Apple iPod",
                    "count": 1
                },
                {
                    "value": "Samsung Galaxy Note 10.1 2014 Edition",
                    "count": 1
                }
            ]
        },
        {
            "systemName": "Operating System (dynamic)",
            "displayName": "Operating System",
            "facetField": "operatingsystem_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "abg",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Apple iOS",
                    "count": 252
                },
                {
                    "value": "Android",
                    "count": 2
                },
                {
                    "value": "Not Applicable",
                    "count": 2
                },
                {
                    "value": "iOS 6",
                    "count": 1
                },
                {
                    "value": "iOS 7",
                    "count": 1
                }
            ]
        },
        {
            "systemName": "Color (dynamic)",
            "displayName": "Color",
            "facetField": "colorcat_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "aad",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Black",
                    "count": 1813
                },
                {
                    "value": "Multi",
                    "count": 1583
                },
                {
                    "value": "White",
                    "count": 520
                },
                {
                    "value": "Blue",
                    "count": 487
                },
                {
                    "value": "Pink",
                    "count": 348
                },
                {
                    "value": "Clear",
                    "count": 331
                },
                {
                    "value": "Purple",
                    "count": 299
                },
                {
                    "value": "Red",
                    "count": 286
                },
                {
                    "value": "Gray",
                    "count": 259
                },
                {
                    "value": "Green",
                    "count": 247
                },
                {
                    "value": "Brown",
                    "count": 127
                },
                {
                    "value": "Silver",
                    "count": 120
                },
                {
                    "value": "Orange",
                    "count": 92
                },
                {
                    "value": "Gold",
                    "count": 72
                },
                {
                    "value": "Yellow",
                    "count": 49
                },
                {
                    "value": "Hot Pink",
                    "count": 7
                },
                {
                    "value": "Other",
                    "count": 1
                },
                {
                    "value": "Teal",
                    "count": 1
                }
            ]
        },
        {
            "systemName": "Customer Reviews (dynamic)",
            "displayName": "Customer Rating",
            "facetField": "customerreviews_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 6,
            "uniqueFacetId": "aah",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Top-Rated",
                    "count": 673
                },
                {
                    "value": "5",
                    "count": 532
                },
                {
                    "value": "4 & Up",
                    "count": 2356
                },
                {
                    "value": "3 & Up",
                    "count": 2756
                },
                {
                    "value": "2 & Up",
                    "count": 2860
                },
                {
                    "value": "1 & Up",
                    "count": 2992
                }
            ]
        },
        {
            "systemName": "Collection (dynamic)",
            "displayName": "Collection",
            "facetField": "collection_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "aac",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "Magnolia Home Theater",
                    "count": 75
                },
                {
                    "value": "Only at Best Buy",
                    "count": 46
                },
                {
                    "value": "Business Series",
                    "count": 25
                }
            ]
        },
        {
            "systemName": "Condition (dynamic)",
            "displayName": "Condition",
            "facetField": "condition_facet",
            "facetDisplay": "Yes",
            "displayContext": "Yes",
            "maxValue": 8,
            "uniqueFacetId": "a9r",
            "joinCondition": "OR",
            "values": [
                {
                    "value": "New",
                    "count": 10204
                },
                {
                    "value": "Pre-Owned",
                    "count": 3
                },
                {
                    "value": "Refurbished",
                    "count": 241
                },
                {
                    "value": "Open-Box",
                    "count": 330
                }
            ]
        }
    ],
    "banners": [
        {
            "bannerName": "BR Apple Brand Store iPad 148511",
            "bannerType": "KEYWORD_TOP",
            "templateType": "HTML_ONLY",
            "documentId": "1219807025169",
            "categoryId": "cat00000",
            "keywords": [
                "ipad",
                "ipad pro",
                "ipads"
            ],
            "templates": [],
            "facets": {},
            "effectiveDate": 1455429600000,
            "expirationDate": 1486706400000,
            "site": "WWW",
            "priority": 1
        }
    ],
    "sortOptions": [
        {
            "displayName": "Best Match",
            "value": "Best-Match"
        },
        {
            "displayName": "Best Selling",
            "value": "Best-Selling"
        },
        {
            "displayName": "Price Low to High",
            "value": "Price-Low-To-High"
        },
        {
            "displayName": "Price High to Low",
            "value": "Price-High-To-Low"
        },
        {
            "displayName": "Customer Rating",
            "value": "Customer-Rating"
        },
        {
            "displayName": "New Arrivals",
            "value": "New-Arrivals"
        },
        {
            "displayName": "Brand A-Z",
            "value": "Brand-A-Z"
        },
        {
            "displayName": "Brand Z-A",
            "value": "Brand-Z-A"
        }
    ],
    "suggestQueryInfo": {
        "correctlySpelled": true
    },
    "request_info": {
        "query": "ipad",
        "sort": {
            "displayName": "Best Match",
            "value": "Best-Match"
        },
        "applied_facets": []
    },
    "isSynonymApplied": false,
    "isBoostsAndBlocksApplied": false,
    "isQueryBoosterApplied": true,
    "isAutoFilterApplied": false,
    "solrQTime": 46,
    "solrActQTime": 25,
    "isSpellCheck": false,
    "requestHandler": "bbselect",
    "buildnumber": "16.08.2",
    "instanceName": "i-bace8f22",
    "track": {
        "release": "16.08.2",
        "relevancyVersion": "1.0",
        "variant": "A"
    }
};