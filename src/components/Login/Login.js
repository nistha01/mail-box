import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setGmail } from '../Auth/AuthSlice';
import styles from './Login.module.css'; // Importing modular CSS

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    isUser: true,
    isForgotPassword: false,
    errorMessage: '', // Added error message state
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCfkrx8bQrchJe5LP4XYkkRbMqqgM7d_Q';
    const urlIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCfkrx8bQrchJe5LP4XYkkRbMqqgM7d_Q';
    const urlForgot = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDCfkrx8bQrchJe5LP4XYkkRbMqqgM7d_Q';

    if (state.isForgotPassword) {
      const payload = { requestType: 'PASSWORD_RESET', email: state.email };
      const response = await postCalltoGetToken(urlForgot, payload, 'POST');
      if (response) {
        alert('Password reset email sent!');
        setState({ ...state, isForgotPassword: false, email: '', errorMessage: '' });
      }
      return;
    }

    const payload = {
      email: state.email,
      password: state.password,
      returnSecureToken: true,
    };
    if (state.isUser) {
      const loginData = await postCalltoGetToken(urlIn, payload, 'POST');
      if (!loginData || !loginData.idToken) {
        dispatch(setLogin(false));
        setState({ ...state, errorMessage: 'Login Failed. Please check your credentials.' });
        return;
      }
      dispatch(setLogin(true));
      dispatch(setGmail(state.email));
      localStorage.setItem('authToken', loginData.idToken);
      localStorage.setItem('email', state.email);
    } else {
      if (state.password !== state.confirmPassword) {
        setState({ ...state, errorMessage: 'Passwords do not match' });
        return;
      }

      const signupData = await postCalltoGetToken(urlUp, payload, 'POST');
      if (signupData && signupData.idToken) {
        dispatch(setLogin(true));
        localStorage.setItem('authToken', signupData.idToken);
        localStorage.setItem('email', state.email);
        dispatch(setGmail(state.email));
      } else {
        setState({ ...state, errorMessage: 'Sign-up Failed. Please try again.' });
      }
    }
  };

  const postCalltoGetToken = async (url, payload, method) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      return null;
    }
  };

  const toggleForm = () => {
    setState({
      email: '',
      password: '',
      confirmPassword: '',
      isUser: !state.isUser,
      isForgotPassword: false,
      errorMessage: '', // Reset error message
    });
  };

  const toggleForgotPassword = () => {
    setState({
      email: '',
      password: '',
      confirmPassword: '',
      isUser: true,
      isForgotPassword: !state.isForgotPassword,
      errorMessage: '', // Reset error message
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{state.isForgotPassword ? 'Forgot Password' : state.isUser ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              required
            />
          </div>
          {!state.isForgotPassword && (
            <>
              <div className={styles.formGroup}>
                <label>Password:</label>
                <input
                  type="password"
                  value={state.password}
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                  required
                />
              </div>
              {!state.isUser && (
                <div className={styles.formGroup}>
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    value={state.confirmPassword}
                    onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              )}
            </>
          )}
          {state.errorMessage && <div className={styles.error}>{state.errorMessage}</div>}
          <button type="submit" className={styles.submitBtn}>
            {state.isForgotPassword ? 'Send Reset Link' : state.isUser ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {!state.isForgotPassword && (
          <>
            <button onClick={toggleForm} className={styles.toggleBtn}>
              {state.isUser ? 'New user? Sign Up' : 'Already a user? Login'}
            </button>
            <button onClick={toggleForgotPassword} className={styles.forgotBtn}>
              Forgot Password?
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
