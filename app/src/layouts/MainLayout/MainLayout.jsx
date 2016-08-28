import React, {Component, PropTypes} from "react";
import {Row, Col} from "antd";
import Collections from "../../components/Collection/Collections";
import styles from "./MainLayout.less";
import Query from "../../components/Query/Query";
import {Link} from "react-router";

const MainLayout = ({children}) => {
    return (
        <div className={styles.normal}>
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
        </div>
    );
};

MainLayout.propTypes = {};

export default MainLayout;
