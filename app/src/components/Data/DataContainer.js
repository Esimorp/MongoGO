/**
 * Created by Esimorp on 16/8/27.
 */
import React from "react";
import TreeData from "./TreeData";
import RowData from "./RowData";
import JsonData from "./JsonData";
import {connect} from "react-redux";
class DataContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let viewType = this.props.view;
    let data = this.props.data;
    let dataView;
    switch (viewType) {
      case 'tree':
        dataView = <TreeData data={data}/>;
        break;
      case 'row':
        dataView = <RowData data={data}/>;
        break;
      case 'json':
        dataView = <JsonData data={data}/>;
    }

    return (
    {dataView}
    )
  }
}

export default connect(()=>({}))(DataContainer);
