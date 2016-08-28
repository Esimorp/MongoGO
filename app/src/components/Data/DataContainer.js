/**
 * Created by Esimorp on 16/8/27.
 */
import React from "react";
import {connect} from "react-redux";
import {Tabs} from "antd";
// const ipcRenderer = window.require('electron').ipcRenderer;
const TabPane = Tabs.TabPane;
class DataContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {collections: {}, activeKey: ''}
    }

    componentDidMount() {
        let collections = {};
        collections[this.props.params.collection] = {view: 'json'};
        this.setState({...this.state, collections: collections, activeKey: this.props.params.collection});
    }

    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps');
        console.log(this.props.params.collection);
        if (!this.state.collections[newProps.params.collection]) {
            let collections = {...this.state.collections};
            collections[newProps.params.collection] = {view: 'json'};
            this.setState({...this.state, activeKey: newProps.params.collection, collections: collections});
        } else {
            this.setState({...this.state, activeKey: newProps.params.collection});
        }

    }

    callback(key) {
        this.setState({...this.state, activeKey: key});
    }

    onEdit(targetKey, action) {
        console.log(action);
        this[action](targetKey);
    }

    remove(targetKey) {
        console.log(targetKey);
        let collections = this.state.collections;
        delete collections[targetKey];
        this.setState({...this.state, collections: collections});
        // let activeKey = this.state.activeKey;
        // let lastIndex;
        // this.state.panes.forEach((pane, i) => {
        //     if (pane.key === targetKey) {
        //         lastIndex = i - 1;
        //     }
        // });
        // const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        // if (lastIndex >= 0 && activeKey === targetKey) {
        //     activeKey = panes[lastIndex].key;
        // }
        // this.setState({panes, activeKey});
    }

    render() {
        let collections = [];

        for (let collectionName in this.state.collections) {
            if (this.state.collections.hasOwnProperty(collectionName))
                collections.push(<TabPane tab={collectionName}
                                          key={collectionName}>content</TabPane>)
        }
        return (
            <Tabs activeKey={this.state.activeKey} onEdit={this.onEdit.bind(this)} type="editable-card"
                  onChange={this.callback}>
                {collections}
            </Tabs>)
    }
}

export default connect(()=>({}))(DataContainer);
