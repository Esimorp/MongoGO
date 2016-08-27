import React, {Component, PropTypes} from "react";
import {Row, Col} from "antd";
import Left_Nav from "../../components/Left_Nav";
import styles from "./MainLayout.less";
import Query from "../../components/Query";
import Data from "../../components/Data";

const MainLayout = ({children}) => {
  return (
    <div className={styles.normal}>
      <Row style={{height:'100vh'}}>
        <Col span={4}><Left_Nav></Left_Nav></Col>
        <Col span={20} className={styles.normal}>
          <Query></Query>
          <Data></Data></Col>
      </Row>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
