/**
 * Created by Esimorp on 16/7/12.
 */
const vm = new Vue({
    el: '#app',
    data: {
        collections: []
    }
});
const {ipcRenderer} = require('electron');

ipcRenderer.on('collection_list_steaming', (event, arg) => {
    vm.collections = arg;
});

ipcRenderer.send('fetch_collection_list', '');


