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
        this.state = {collections: {}}
    }

    componentDidMount() {
        let collections = {};
        collections[this.props.params.collection] = {view: 'json'};
        this.setState({...this.state, collections: collections});
    }

    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps');
        console.log(this.props.params.collection);
        if (!this.state.collections[newProps.params.collection]) {
            let collections = {...this.state.collections};
            collections[newProps.params.collection] = {view: 'json'};
            this.setState({...this.state, collections: collections});
        }
    }

    callback(key) {

    }

    render() {
        let collections = [];

        for (let collectionName in this.state.collections) {
            collections.push(<TabPane tab={collectionName} key={collectionName}>content</TabPane>)
        }
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                {collections}
            </Tabs>)
    }
}

export default connect(()=>({}))(DataContainer);
