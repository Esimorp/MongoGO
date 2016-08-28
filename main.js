const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    win.loadURL('http://localhost:8989');

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});


// var serve = require('koa-static');
// var koa = require('koa');
// var staticServer = koa();
// var mongoService = require('./service/MongoService');

const {ipcMain} = require('electron');
// const {ipcRenderer} = require('electron');
var MongoClient = require('mongodb').MongoClient;
// // Connection ur
// var url = 'mongodb://localhost:27017';
// Connect using MongoClient
var Db = require('mongodb').Db,
    Mongos = require('mongodb').Mongos,
    Server = require('mongodb').Server;
var server = new Server('localhost', 27017);
var db = new Db('kcyp', new Mongos([server]));
db.open(function (err, db) {
    // Get an additional db
});


var connectedDb;

ipcMain.on('create_new_link', (event, arg) => {
    console.dir(arg);
    var server = new Server(arg.ipAddress, arg.port);
    if (arg.databaseName) {
        var db = new Db(arg.databaseName, new Mongos([server]));
        db.open(function (err, db) {
            connectedDb = db;
            // Get an additional db
            db.listCollections().toArray(function (err, items) {
                event.sender.send('collection_list_steaming', items);
            });
        });
    } else {
        console.log('mongodb://' + arg.ipAddress + ':' + arg.port);
        MongoClient.connect('mongodb://' + arg.ipAddress + ':' + arg.port, function (err, db) {
            connectedDb = db;
            var adminDb = db.admin();
            adminDb.listDatabases(function (err, dbs) {
                event.sender.send('database_list_steaming', {dbs: dbs, url: arg});
            });
        });
    }
});

ipcMain.on('fetch_collections', (event, arg)=> {
    console.dir(event);
    console.dir(arg);
    event.sender.send('collections_streaming', 'hello react~');
});

ipcMain.on('fetch_databases', (event, arg)=> {
    db.listCollections().toArray(function (err, items) {
        console.dir(err);
        console.dir(items);
        event.sender.send('databases_streaming', items);
        db.close();
    });
});

ipcMain.on('fetch_collection_data', (event, arg)=> {
    var col = connectedDb.collection(arg.collectionName);
    col.find({}).toArray(function (err, items) {
        event.sender.send('collection_item_streaming', items);
    });
});


// staticServer.use(serve('./app'));
// staticServer.use(serve('./lib'));
//
// staticServer.listen(4000);
