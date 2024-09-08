// src/components/AuthForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@admin.com' && password === 'admin') {
      dispatch(login({ email, password }));
      navigate('/profile'); // Перенаправление на страницу профиля
    } else {
      alert('Invalid credentials');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 form-box">
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <div className="form-check d-flex justify-content-between align-items-center">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
          <a href="forget-3.html" className="text-decoration-none">
            Forget Password
          </a>
        </div>
      </div>
      <button type="submit" className="btn btn-outline-secondary login-btn w-100 mb-3">
        Login
      </button>
      <div className="social-login mb-3 type--A">
        <h5 className="text-center mb-3">Social Login</h5>
        <button className="btn btn-outline-secondary mb-3">
          <i className="fa-brands fa-google text-danger"></i> Sign With Google
        </button>
        <button className="btn btn-outline-secondary mb-3">
          <i className="fa-brands fa-facebook-f text-primary"></i> Sign With Facebook
        </button>
      </div>
    </form>
  )
}

export default AuthForm;