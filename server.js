// Libraries
var consolidate = require('consolidate'),
    express = require('express'),
    http = require('http'),
    logger = require('connect').logger,
    url  = require('url');

// Create server
var app = module.exports = express();

// Arguments
var argv = require('minimist')(process.argv.slice(2));

// Port
var port = argv.port;
if(!port) {
    console.log('Requires port: --port <PORT>');
    return;
}

// Protect thyself:
process.on('uncaughtException', function(error) {
    console.log(error.stack);
});

app.use(logger('short'));

app.enable('trust proxy');
app.use(express.static(__dirname, {
    maxAge: 3600
}));

// CORS
app.use(function(req, res, next) {
    var accept = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', accept);
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Referer, User-Agent, X-Requested-With, X-Prototype-Version, Origin, Content-Type, Allow, Accept, Accept-Encoding, Accept-Language');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// Deal with favicon requests
app.use(function(req, res, next) {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end();
        return;
    }
    next();
});

// Templates:
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');

// Index route
app.get('/', function(req, res, next) {
    // compute index:
    res.render('index.html', {});
});

// Startup!
var http_server = http.createServer(app).listen(port);
console.log('==> listening at %s', port);