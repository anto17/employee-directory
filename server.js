var express = require('express'),
    employees = require('./routes/employees'),
    products = require('./routes/products'),
    gcm = require('./routes/gcm'),
    pushnotify= require('./routes/pushnotify'),
    bodyParser = require("body-parser"),
    app = express();


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
app.get('/sendmsg', pushnotify.sendmsg);


//BBY
app.get('/dyn', gcm.dyn);
app.get('/products', products.findAll);
app.get('/products/:id', products.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});