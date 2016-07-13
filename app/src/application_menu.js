/**
 * Created by Esimorp on 16/7/13.
 */
const {remote}= require('electron');
const Menu = remote.Menu;
const {ipcRenderer} = require('electron');

var template = [
    {
        label: '链接',
        submenu: [
            {
                label: '新建连接',
                accelerator: 'CmdOrCtrl+N',
                click: function (item, focusedWindow) {
                    createNewLinkDialog();
                }
            },
            {
                label: '连接已有连接',
                accelerator: 'CmdOrCtrl+O',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '编辑链接',
                accelerator: 'CmdOrCtrl+K',
                role: 'cut'
            },
            {
                label: '链接历史',
                accelerator: 'CmdOrCtrl+M',
                role: 'copy'
            },
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (function () {
                    if (process.platform == 'darwin')
                        return 'Ctrl+Command+F';
                    else
                        return 'F11';
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: (function () {
                    if (process.platform == 'darwin')
                        return 'Alt+Command+I';
                    else
                        return 'Ctrl+Shift+I';
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.toggleDevTools();
                }
            },
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
        ]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: function () {
                    require('electron').shell.openExternal('http://electron.atom.io')
                }
            },
        ]
    },
];

if (process.platform == 'darwin') {
    var name = require('electron').remote.app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                label: 'Services',
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                label: 'Hide ' + name,
                accelerator: 'Command+H',
                role: 'hide'
            },
            {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            },
            {
                label: 'Show All',
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit();
                }
            },
        ]
    });
    // Window menu.
    template[3].submenu.push(
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    );
}

function createNewLinkDialog() {
    console.log('createNewLink');
    $('#new_link_dialog').modal({});
}

function createNewLink() {
    var url = $('#mongodb_url').val();
    var ipAddress = url.split(':')[0];
    var port = url.split('/')[0].split(':')[1];
    var databaseName = url.split('/')[1];
    ipcRenderer.send('create_new_link', {ipAddress: ipAddress, port: port, databaseName: databaseName});
}

function createSelectDatabaseDialog(arg) {
    console.dir(arg);
    vm.databases = arg.dbs.databases;
    vm.url = arg.url;
    $('#new_link_dialog').modal('hide');
    $('#select_database_dialog').modal({});
}

function selectDatabase() {
    var databaseName = $('input:radio[name="databases"]:checked ').val();
    ipcRenderer.send('create_new_link', {ipAddress: vm.url.ipAddress, port: vm.url.port, databaseName: databaseName});
}

ipcRenderer.on('collection_list_steaming', (event, arg) => {
    vm.collections = arg;
    $('#new_link_dialog').modal('hide');
    $('#select_database_dialog').modal('hide');
});

ipcRenderer.on('database_list_steaming', (event, arg)=> {
    createSelectDatabaseDialog(arg);
});

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

