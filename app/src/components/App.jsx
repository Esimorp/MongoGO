import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout/MainLayout";

const App = ({location, dispatch, children}) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

App.propTypes = {};

function select(state) {
  return {
    a: state.a,
    b: state.b
  }
}


// export default App;
export default connect(select)(App)
