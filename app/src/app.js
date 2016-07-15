/**
 * Created by Esimorp on 16/7/12.
 */

const vm = new Vue({
    el: '#app',
    data: {
        collections: [],
        databases: [],
        url: {},
        fields: [],
        trList: [],
        collectionName: ''
    },
    methods: {
        fetch_collection_data: function (collectionName) {
            if (this.collectionName != collectionName) {
                this.trList = [];
            }
            ipcRenderer.send('fetch_collection_data', {collectionName: collectionName});
        },
        onTdDoubleClick: function (arg1, arg2) {
            var element = $(arg2.currentTarget);
            var value = element.html();
            console.log(value);
            element.text('');
            console.dir(value);
            $("<input value=\'" + value + "\'>").appendTo(element);
            if (typeof arg1 == 'object') {
                console.log('fuck obj');
            }
        }
    }
});


ipcRenderer.on('collection_list_steaming', (event, arg) => {
    vm.collections = arg;
});

ipcRenderer.on('collection_item_streaming', (event, arg)=> {
    mergeHeaders(arg);
    vm.fields = arg;
});

function mergeHeaders(fields) {
    let trList = vm.trList;
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        for (var key in field) {
            let containsKey = false;
            for (let tr in trList) {
                if (trList[tr] == key) {
                    containsKey = true;
                }
            }
            if (!containsKey) {
                vm.trList.push(key);
            }
        }
    }
    console.dir(vm.trList);
}


function getElementAbsolutePositionX(obj) {
    var currentLeft = 0;

    if (obj.offsetParent) {
        while (obj.offsetParent) {
            currentLeft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    } else if (obj.x) currentLeft += obj.x;
    return currentLeft;
}

function getElementAbsolutePositionY(obj) {
    var currentTop = 0;

    if (obj.offsetParent) {
        while (obj.offsetParent) {
            currentTop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    } else if (obj.y) currentTop += obj.y;
    return currentTop;
}

function getElementAbsolutePosition(element) {
    return {
        x: getElementAbsolutePositionX(element),
        y: getElementAbsolutePositionY(element)
    };
}
