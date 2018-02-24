/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {connect, } from 'react-redux';
import * as ToDoActions from '../../actions/ToDoActions';
import ToDoList from '../ToDoList';
import {bindActionCreators, } from 'redux';


class ToDoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="col-md-12">
        <h1>To Do List</h1>
        <div className="col-md-6">
          <ToDoList todos={this.props.todos} />
        </div>
        <div className='col-md-6'>
          <form method='POST' action='/todo/add'>
            <input type='text' placeholder='name' name='name'/>
            <input type='text' placeholder='age' name='age'/>
            <button type='submit'>SAVE</button>
          </form>
        </div>
      </div>
    );
  }
}

ToDoPage.propTypes = {
  todos: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ToDoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
