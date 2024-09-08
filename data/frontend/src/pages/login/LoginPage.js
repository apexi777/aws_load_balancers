// src/pages/LoginPage.js
import React from 'react';
import AuthForm from '../../components/AuthForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="form-2-wrapper">
            <div className="logo text-center">
            <span className="logo-letter">A</span>
            </div>
            <h2 className="text-center mb-4">Sign Into Your Account</h2>
            <AuthForm />
            <p className="text-center register-test mt-3">
              Don't have an account? <a href="register-3.html" className="text-decoration-none">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
