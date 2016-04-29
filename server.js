
var express = require('express'),
    employees = require('./routes/employees'),
    products = require('./routes/products'),
    gcm = require('./routes/gcm'),
    pushnotify= require('./routes/pushnotify'),
    bodyParser = require("body-parser"),
    app = express();



// -----
const fs = require('fs');
const Guid = require('guid');
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');

var csrf_guid = Guid.raw();
const api_version = "v2.6";
const app_id = "1280314095315539";
const app_secret = '8328897a3e69c2d5f914a8419c56d2a2';
const me_endpoint_base_url = 'https://graph.accountkit.com/v2.6/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v2.6/access_token';

function loadLogin() {
    return fs.readFileSync('www/templates/login.html').toString();
}

app.get('/', function(request, response){
    var view = {
        appId: app_id,
        csrf: csrf_guid,
        version: api_version,
    };

    var html = Mustache.to_html(loadLogin(), view);
    response.send(html);
});

function loadLoginSuccess() {
    return fs.readFileSync('www/index.html').toString();
}

//-----
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('www'));


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);
app.get('/employees/:id/reports', employees.findReports);

//Rest API for GCM
app.post('/register', gcm.register);
app.post('/register/order', gcm.order);
app.get('/sendmsg', pushnotify.sendmsg);
app.get('/pushmsg', pushnotify.pushmsg);
app.get('/getmsginfo', pushnotify.getmsginfo);
app.get('/static/img', pushnotify.getStaticImg);

//BBY
app.get('/dyn', gcm.dyn);
app.get('/products', products.findAll);
app.get('/products/:id', products.findById);
app.get('/products/cust/review', products.getReview);

app.post('/ispu-agg-webapp/api/ispu/byLocation', gcm.ispu);
app.post('/ispu-agg-webapp/api/ispu/byLocation/set', gcm.ispuSet);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.post('/sendcode', function(request, response){
    // CSRF check
    if (request.body.csrf_nonce === csrf_guid) {
        var app_access_token = ['AA', app_id, app_secret].join('|');
        var params = {
            grant_type: 'authorization_code',
            code: request.body.code,
            access_token: app_access_token
            //appsecret_proof: app_secret
        };

        // exchange tokens
        var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
            console.log(respBody);
            var view = {
                user_access_token: respBody.access_token,
                expires_at: respBody.expires_at,
                user_id: respBody.id,
            };
            // get account details at /me endpoint
            var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
            Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
                // send login_success.html
                console.log(respBody);
                if (respBody.phone) {
                    view.method = "SMS"
                    view.identity = respBody.phone.number;
                } else if (respBody.email) {
                    view.method = "Email"
                    view.identity = respBody.email.address;
                }
                var html = Mustache.to_html(loadLoginSuccess(), view);
                response.send(html);
            });
        });
    }
    else {
        // login failed
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end("Something went wrong. :( ");
    }
});

