/**
 * Created by Esimorp on 16/8/28.
 */
import React from "react";
import {Select} from "antd";
import JsonView from "./JsonView";
import RowView from "./RowView";
import TreeView from "./TreeView";
const Option = Select.Option;

class DataViewWrapper extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {viewMode: 'tree'};
    }

    componentWillMount() {
        console.log(this.props);
    }

    handleChange(value) {
        this.setState({...this.state, viewMode: value});
    }

    render() {
        let viewMode = this.state.viewMode;
        let dataView;
        switch (viewMode) {
            case 'tree':
                dataView = <TreeView/>;
                break;
            case 'row':
                dataView = <RowView/>;
                break;
            case 'json':
                dataView = <JsonView/>;
                break;

        }
        return (
            <div>
                <Select defaultValue="tree" style={{width: 120}} onChange={this.handleChange.bind(this)}>
                    <Option value="tree">Tree</Option>
                    <Option value="row">Row</Option>
                    <Option value="json">Json</Option>
                </Select>
                {dataView}
            </div>
        )
    }
}

export default DataViewWrapper;
