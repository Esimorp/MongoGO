/**
 * Created by Esimorp on 16/8/27.
 */
import React from "react";
import TreeData from "./TreeData";
import RowData from "./RowData";
import JsonData from "./JsonData";
import {connect} from "react-redux";
// const ipcRenderer = window.require('electron').ipcRenderer;

class DataContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    // console.dir(ipcRenderer);
  }

  render() {
    console.dir(this.props);
    let viewType = this.props.params.view;
    let data = this.props.data;
    let dataView;
    switch (viewType) {
      case 'tree':
        return <TreeData data={data}/>;
        break;
      case 'row':
        return <RowData data={data}/>;
        break;
      case 'json':
        return <JsonData data={data}/>;
      default:
        return <h1>Not Found</h1>;
    }

    return (
    {dataView}
    )
  }
}

export default connect(()=>({}))(DataContainer);
