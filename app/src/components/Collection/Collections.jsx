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

    componentWillMount() {
        this.ipcRenderer.on('collections_streaming', function (event, arg) {
            console.log(arg);
        });

    }

    componentDidMount() {
        console.log('mount');

        this.setState({
            treeData: [
                {name: 'pNode 01', key: '0-0'},
                {name: 'pNode 02', key: '0-1'},
                {name: 'pNode 03', key: '0-2', isLeaf: true},
            ],
        });
    };

    componentWillReceiveProps(newProps) {
        if (newProps.databases.connected === true) {
            console.log('connected');
            this.ipcRenderer.send('fetch_databases');
        }
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <div>
                <Tree>
                    {treeNodes}
                </Tree>
            </div>
        );
    }
}


export default connect((store)=> {
    return {databases: store.database}
})(Collections);
