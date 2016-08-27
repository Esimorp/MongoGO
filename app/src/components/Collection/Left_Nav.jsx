import React, {Component} from "react";
import {Tree} from "antd";
const TreeNode = Tree.TreeNode;

class Left_Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {treeData: []};
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


    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <Tree>
                {treeNodes}
            </Tree>
        );
    }
}


export default Left_Nav;
