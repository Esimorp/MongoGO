import React, {Component, PropTypes} from "react";
import {Row, Col, Spin} from "antd";
import Collections from "../../components/Collection/Collections";
import styles from "./MainLayout.less";
import Query from "../../components/Query/Query";
import {Link} from "react-router";

class MainLayout extends Component {
    ipcRenderer = window.require('electron').ipcRenderer;

    constructor() {
        super();
        this.state = {loading: true};
        this.ipcRenderer.send('app_created');

        this.ipcRenderer.on('databases_connected', (args)=> {
            console.dir(args);
            this.setState({loading: false});
        });
    }

    render() {
        const {children} = this.props;
        return (
            <div className={styles.normal}>
                <Spin spinning={this.state.loading}>
                    <Row style={{height: '100vh'}}>
                        <Col span={4}>
                            <Collections></Collections>
                            <Link to="/explore/alskdjalsd/asdasd" onlyActiveOnIndex={true}>Data</Link>
                            <Link to="/explore/asdad/asd" onlyActiveOnIndex={true}>DataDDD</Link>
                        </Col>
                        <Col span={20} className={styles.normal}>
                            <Query></Query>
                            {children}
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

MainLayout.propTypes = {};

export default MainLayout;
