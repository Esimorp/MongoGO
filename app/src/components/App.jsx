import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Todos from "./Todos/Todos";
import MainLayout from "../layouts/MainLayout/MainLayout";

const App = ({location}) => {
  
  return (
    <MainLayout>
      <Todos location={location}/>
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
