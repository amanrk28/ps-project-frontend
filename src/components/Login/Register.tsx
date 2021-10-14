import React, { lazy, Suspense, useCallback, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupUser, loginUser } from 'store/actions/authActions';
import './Register.scss';
import LOGO_MAIN, { COMPANY_NAME } from 'utils/utils';
import Loading from 'components/common/Loading/Loading';
import { ObjectType } from 'store/reducers/rootState';

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

const Register = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleRegistrationMethod = useCallback(() => {
    setIsSignIn(!isSignin);
  }, [isSignin]);

  const onSubmitSignin = (dataPayload: ObjectType) => {
    setIsLoading(true);
    dispatch(loginUser(dataPayload, () => setIsLoading(false)));
  };

  const onSubmitSignup = (dataPayload: ObjectType) => {
    setIsLoading(true);
    dispatch(signupUser(dataPayload, () => setIsLoading(false)));
  };

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
                <SigninForm isLoading={isLoading} onSubmit={onSubmitSignin} />
              ) : (
                <SignupForm isLoading={isLoading} onSubmit={onSubmitSignup} />
              )}
            </Suspense>
          </div>
          <div className="switch-registration">
            <p>
              {isSignin ? signin.footer : signup.footer}&nbsp;
              <span onClick={toggleRegistrationMethod}>
                {isSignin ? 'Signup' : 'Signin'}
              </span>
            </p>
          </div>
        </div>
        <div className="registration-footer" />
      </div>
    </div>
  );
};

export default memo(Register);
