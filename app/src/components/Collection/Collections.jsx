import React, {Component} from "react";
import {Tree, Spin} from "antd";
import {connect} from "react-redux";
const TreeNode = Tree.TreeNode;

class Collections extends Component {
    ipcRenderer = window.require('electron').ipcRenderer;

    constructor(props) {
        super(props);
        this.state = {treeData: []};
    }

    componentDidMount() {
        console.log('mount');
        let self = this;
        this.ipcRenderer.on('databases_streaming', function (event, arg) {
            console.dir(arg);
            let databases = [];
            for (let database of arg.databases) {
                databases.push({name: database.name, key: database.name});
            }
            self.setState({
                treeData: databases,
            });
        });

        // this.ipcRenderer.on('collections_streaming', function (event, arg) {
        //     console.log(arg);
        // });


    };

    componentWillReceiveProps(newProps) {
        if (newProps.databases.connected === true) {
            console.log('connected');
            this.ipcRenderer.send('fetch_databases');
        }
    }

    loadCollections(node) {
        let databaseName = node.props.eventKey;
        console.log(databaseName);
        let self = this;
        return new Promise((resolve) => {
            let ipcRenderer = window.require('electron').ipcRenderer;
            ipcRenderer.on('collections_streaming', function (event, arg) {
                console.dir(self);
                let databases = self.state.treeData;
                for (let i = 0; i < databases.length; i++) {
                    if (databases[i].key == databaseName) {
                        let children = [];
                        for (let ii = 0; ii < arg.length; ii++) {
                            children.push({name: arg[ii].name, key: arg[ii].name})
                        }
                        databases[i].children = children;
                        console.dir(databases);
                        let state = {...self.state, treeData: databases};
                        self.setState(state);
                        resolve();
                        break;
                    }
                }
            });
            ipcRenderer.send('fetch_collections', databaseName);
        });
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key}/>;
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <div>
                <Tree loadData={this.loadCollections.bind(this)} onSelect={()=> {
                }}>
                    {treeNodes}
                </Tree>
            </div>
        );
    }
}


export default connect((store)=> {
    return {databases: store.database}
})(Collections);
