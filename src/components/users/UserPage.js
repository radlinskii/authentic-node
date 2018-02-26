import React from 'react';
import PropTypes from 'prop-types';
import {connect, } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import {bindActionCreators, } from 'redux';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="col-md-12">
        <div className='col-md-6'>
          <h3>hi</h3>
        </div>
        <div className="col-md-6">
          {this.props.user.name}
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
