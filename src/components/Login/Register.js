import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from 'store/actions/authActions';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { LOGO_URL } from 'utils/utils';
import './Register.scss';

const signin = {
  header: 'Sign in to continue!',
  footer: "Don't have an Account?",
};

const signup = {
  header: 'Please Sign up to continue!',
  footer: 'Already have an Account?',
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignin: true,
    };
  }

  switchRegistration = () => {
    const { isSignin } = this.state;
    this.setState({ isSignin: !isSignin });
  };

  onSubmitSignin = dataPayload => {
    const { actions } = this.props;
    actions.loginUser(dataPayload);
  };

  onSubmitSignup = dataPayload => {
    const { actions } = this.props;
    actions.signupUser(dataPayload);
  };

  render() {
    const { isSignin } = this.state;
    return (
      <div className="registration-page-wrapper center">
        <div className="registration-wrapper">
          <div className="logo-wrapper center">
            <img src={LOGO_URL} alt="MYMSME" />
          </div>
          <div className="form-wrapper center">
            <div className="header-text">
              {isSignin ? signin.header : signup.header}
            </div>
            <div className="form-container">
              {isSignin ? (
                <SigninForm onSubmit={this.onSubmitSignin} />
              ) : (
                <SignupForm onSubmit={this.onSubmitSignup} />
              )}
            </div>
            <div className="switch-registration">
              <p>
                {isSignin ? signin.footer : signup.footer}&nbsp;
                <span onClick={this.switchRegistration}>
                  {isSignin ? 'Signup' : 'Signin'}
                </span>
              </p>
            </div>
          </div>
          <div className="registration-footer" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
