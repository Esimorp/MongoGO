import React, {Component} from "react";
import {connect} from "react-redux";
import Todo from "./Todos/Todo";

class Data extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Data mount');
    console.dir(this);
  };

  handleToggleComplete(id) {
    console.log('fuck')
    this.props.dispatch({
      type: 'todos/toggleComplete',
      payload: id,
    });

  }

  render() {
    const list = this.props.a.list;
    return (
      <div>
        {list.map(item => <Todo
          key={item.id}
          data={item}
          onToggleComplete={this.handleToggleComplete.bind(this,item.id)}
        />)}
        <hr/>
        {list.map(item => <Todo
          key={item.id}
          data={item}
          onToggleComplete={()=>{}}
        />)}
      </div>
    );
  }
}

function select(state) {
  return {
    a: state.todos,
    b: state.b
  }
}


// export default App;
export default connect(select)(Data)
