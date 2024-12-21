import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const firebaseApiKey = 'YOUR_FIREBASE_API_KEY'; // Replace with your Firebase API Key

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isSignup && password !== confirmPassword) {
      showErrorToaster('Passwords do not match!');
      return;
    }

    const url = isSignup
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isSignup ? 'Signup successful! You can now log in.' : 'Login successful!');
        console.log(data); // Contains user info and tokens
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      showErrorToaster(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent!');
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      showErrorToaster(error.message);
    }
  };

  const showErrorToaster = (error) => {
    setMessage(error);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000); // Display the error for 3 seconds
  };

  return (
    <div className="auth-container">
      {showError && <div className="error-toaster">{message}</div>}
      <h2>{isForgotPassword ? 'Forgot Password' : isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={isForgotPassword ? handleForgotPassword : handleAuth} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
        {!isForgotPassword && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
        )}
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            required
          />
        )}
        {!isForgotPassword && (
          <button type="submit" className="auth-button">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        )}
        {isForgotPassword && (
          <button type="submit" className="auth-button">
            Send Reset Email
          </button>
        )}
      </form>
      {!isForgotPassword && (
        <p className="auth-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign up'}
        </p>
      )}
      <p className="auth-link" onClick={() => setIsForgotPassword(!isForgotPassword)}>
        {isForgotPassword ? 'Back to Login' : 'Forgot Password?'}
      </p>
    </div>
  );
};

export default Login;
