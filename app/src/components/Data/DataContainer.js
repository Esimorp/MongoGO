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
        this.state = {tabs: ['1', '2', '3']}
    }

    callback(key) {

    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                {this.state.tabs.map((i, m)=> {
                        return <TabPane tab="选项卡一" key={i}>选项卡一内容</TabPane>
                    }
                )}
            </Tabs>)
    }
}

export default connect(()=>({}))(DataContainer);
