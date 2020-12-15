/*
proxy server for serving mock data remotely and else directed to webpack server listening to
localhost:4200
 */
var http = require('http');
var httpProxy = require('http-proxy');

var APP_URL = 'http://localhost:3000';
// var APP_URL = 'http://localhost:5051';

var URL = ['/api'];
var DATA_URL = 'http://localhost:8000';




var proxy = httpProxy.createProxyServer({ changeOrigin: true, timeout: 60000 });

try {

    var server = http.createServer(function (req, res) {
        var target = APP_URL;

        for (var i = 0; i < URL.length; i++) {
            if (req.url.startsWith(URL[i])) {
                target = DATA_URL;
                break;
            }
        }
        try {
            proxy.web(req, res, { target: target }, err => {
                console.log('caught in deep web ', err)

            });
        } catch (err) {
            console.log('err in web ', err);
        }
    }, function (err) {
        console.log('problem connecting')
    });

    console.log('listening on port 80');
    server.listen(80);

} catch (err) {
    console.log('caught ', err)
}
