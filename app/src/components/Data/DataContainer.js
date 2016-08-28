/**
 * Created by Esimorp on 16/8/27.
 */
import React from "react";
import {connect} from "react-redux";
import {Tabs} from "antd";
import DataViewWrapper from "./DataViewWrapper";
// const ipcRenderer = window.require('electron').ipcRenderer;
const TabPane = Tabs.TabPane;

class DataContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {collections: {}, activeKey: ''}
    }

    componentDidMount() {
        this.addTabOrChangeActiveKey(this.props.params.collection);
    }

    componentWillReceiveProps(newProps) {
        this.addTabOrChangeActiveKey(newProps.params.collection)
    }

    addTabOrChangeActiveKey(targetKey) {
        if (!this.state.collections[targetKey]) {
            let collections = {...this.state.collections};
            collections[targetKey] = {view: 'json'};
            this.setState({...this.state, activeKey: targetKey, collections: collections});
        } else {
            this.setState({...this.state, activeKey: targetKey});
        }
    }

    callback(key) {
        this.setState({...this.state, activeKey: key});
    }

    onEdit(targetKey, action) {
        this[action](targetKey);
    }

    remove(targetKey) {
        console.log(targetKey);
        let collections = this.state.collections;
        delete collections[targetKey];
        this.setState({...this.state, collections: collections});
    }

    render() {
        let collections = [];

        for (let collectionName in this.state.collections) {
            if (this.state.collections.hasOwnProperty(collectionName))
                collections.push(<TabPane tab={collectionName}
                                          key={collectionName}><DataViewWrapper collectionName={collectionName}
                                                                                viewMode={this.state.collections[collectionName].view}/></TabPane>)
        }
        return (
            <Tabs hideAdd activeKey={this.state.activeKey} onEdit={this.onEdit.bind(this)} type="editable-card"
                  onChange={this.callback.bind(this)}>
                {collections}
            </Tabs>)
    }
}

export default connect(()=>({}))(DataContainer);
