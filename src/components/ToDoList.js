import React from 'react';
import PropTypes from 'prop-types';

const ToDoList = ({todos, }) => {
  return (
    <ul className="list-group">
      {todos.map(todo =>
        <li className="list-group-item" key={todo.id}>
          {todo.name}
          {' | '}
          {todo.age}
        </li>
      )}
    </ul>
  );
};

ToDoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default ToDoList;
