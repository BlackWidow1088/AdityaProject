 
/**
 * mock server for serving sunburst data to angular client
 */
// while passing information send only those TCS which are not CREATED,UPDATED,DELETED OR NON-APPROVED
const express = require('express');
const jsonfile = require('jsonfile');
let data = jsonfile.readFileSync('./data.json');
const app = express();
const responseDelayQuick = 10;
const responseDelayModerate = 100;
const responseDelaySlow = 300;

app.use(express.json());

app.get('/api/get', (req, res) => {
    res.send(data);
});
app.post('/api/post', (req, res) => {
    console.log(req.body);
    data = {...req.body};
    res.send('ok');
});

// app.use('/', express.static('./build'));
// app.use('*', express.static('./build'));
console.log('Mock Invar listening on port 8000');
const server = app.listen('8000');

var gracefulShutdown = function () {
    console.log("Shutting down....");
    // jsonfile.writeFileSync('./users.json', users);
    server.close(function () {
        setTimeout(function () {
            console.log("Terminated");
            process.exit(0);
        }, 100);
    });
}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
