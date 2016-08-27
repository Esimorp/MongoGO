import React, {PropTypes} from "react";
import {Router, Route} from "react-router";
import App from "../components/App";
import NotFound from "../components/NotFound";
import DataContainer from "../components/Data/DataContainer";

const Routes = ({history}) =>
  <Router history={history}>
    <Route path="/" component={App}/>
    <Route path="/:collection/:view" component={DataContainer}/>
    <Route path="/completed" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
