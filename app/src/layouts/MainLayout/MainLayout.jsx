import React, {Component, PropTypes} from "react";
import {Row, Col} from "antd";
import Left_Nav from "../../components/Left_Nav";
import styles from "./MainLayout.less";

const MainLayout = ({children}) => {
  return (
    <div className={styles.normal}>
      <Row>
        <Col span={4}><Left_Nav></Left_Nav></Col>
        <Col span={20}>.ant-col-18</Col>
      </Row>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
