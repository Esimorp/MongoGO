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
    // console.dir(ipcRenderer);
  }

  callback(key) {
    console.log(key);
  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
        <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
        <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
      </Tabs>)
  }
}

export default connect(()=>({}))(DataContainer);
