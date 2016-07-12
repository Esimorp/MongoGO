var app = require('app'),
    BrowserWindow = require('browser-window'), mainWindow;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    mainWindow.loadURL('http://localhost:4000/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});

var serve = require('koa-static');
var koa = require('koa');
var app = koa();
var mongoService = require('./service/MongoService');

app.use(serve('./app'));
app.use(serve('./lib'));

app.listen(4000);
