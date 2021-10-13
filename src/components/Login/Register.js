import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from 'store/actions/authActions';
import './Register.scss';
import LOGO_MAIN, { COMPANY_NAME } from 'utils/utils';
import Loading from 'components/common/Loading/Loading';

const signin = {
  header: 'Sign in to continue!',
  footer: "Don't have an Account?",
};

const signup = {
  header: 'Please Sign up to continue!',
  footer: 'Already have an Account?',
};

const SigninForm = lazy(() => import('./SigninForm'));
const SignupForm = lazy(() => import('./SignupForm'));

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignin: true,
      isLoading: false,
    };
  }

  toggleRegistrationMethod = () => {
    const { isSignin } = this.state;
    this.setState({ isSignin: !isSignin });
  };

  onSubmitSignin = dataPayload => {
    const { actions } = this.props;
    this.setState({ isLoading: true });
    actions.loginUser(dataPayload, () => this.setState({ isLoading: false }));
  };

  onSubmitSignup = dataPayload => {
    const { actions } = this.props;
    this.setState({ isLoading: true });
    actions.signupUser(dataPayload, () => this.setState({ isLoading: false }));
  };

  render() {
    const { isSignin, isLoading } = this.state;
    return (
      <div className="registration-page-wrapper center">
        <div className="registration-wrapper">
          <div className="logo-wrapper center">
            <Link to="/">
              <img src={LOGO_MAIN} alt={COMPANY_NAME} />
            </Link>
          </div>
          <div className="form-wrapper center">
            <div className="header-text">
              {isSignin ? signin.header : signup.header}
            </div>
            <div className="form-container">
              <Suspense fallback={<Loading />}>
                {isSignin ? (
                  <SigninForm
                    isLoading={isLoading}
                    onSubmit={this.onSubmitSignin}
                  />
                ) : (
                  <SignupForm
                    isLoading={isLoading}
                    onSubmit={this.onSubmitSignup}
                  />
                )}
              </Suspense>
            </div>
            <div className="switch-registration">
              <p>
                {isSignin ? signin.footer : signup.footer}&nbsp;
                <span onClick={this.toggleRegistrationMethod}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
