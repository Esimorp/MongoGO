/**
 * Created by Esimorp on 16/8/28.
 */
import React from "react";

class DataViewWrapper extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <h1>Wrapper</h1>
        )
    }
}

export default DataViewWrapper;
