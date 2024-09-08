import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { useSelector } from 'react-redux';

import './ProfilePage.css';

function ProfilePage() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <p>You are not logged in. Please log in.</p>;
  }

  const logouted = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  }

  return (
    <div>
      <div className="navbar-top">
        <div className="title">
            <h1>Profile</h1>
        </div>

        <ul>
            <li>
                <a href="#message">
                    <span className="icon-count">0</span>
                    <i className="fa fa-envelope fa-2x"></i>
                </a>
            </li>
            <li>
                <a href="#notification">
                    <span className="icon-count">1</span>
                    <i className="fa fa-bell fa-2x"></i>
                </a>
            </li>
            <li>
                <a onClick={logouted} href='#logout'>
                    <i className="fa fa-sign-out-alt fa-2x"></i>
                </a>
            </li>
        </ul>
    </div>

    <div className="sidenav">
        <div className="profile">
            {/* <img src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png" alt="" width="100" height="100"/> */}
            <span className="logo-letter">A</span>
            <div className="name">
              {user.email}
            </div>
            <div className="job">
                Web Developer
            </div>
        </div>

        <div className="sidenav-url">
            <div className="url">
                <a href="#profile" className="active">Profile</a>
                <hr align="center"/>
            </div>
            <div className="url">
                <a href="#settings">Settings</a>
                <hr align="center"/>
            </div>
        </div>
    </div>

    <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
            <div className="card-body">
                <i className="fa fa-pen fa-xs edit"></i>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>Krop, Ukraine</td>
                        </tr>
                        <tr>
                            <td>Hobbies</td>
                            <td>:</td>
                            <td>Football, Reading Book</td>
                        </tr>
                        <tr>
                            <td>Job</td>
                            <td>:</td>
                            <td>Developer</td>
                        </tr>
                        <tr>
                            <td>Skill</td>
                            <td>:</td>
                            <td>React, Redux, HTML5, CSS3, SASS, Bootstrap</td>
                        </tr>
                        <tr>
                            <td>Tools</td>
                            <td>:</td>
                            <td>Webpack, Babel, Git, npm/yarn, Docker, Ansible</td>
                        </tr>
                        <tr>
                            <td>Cloud</td>
                            <td>:</td>
                            <td>AWS</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h2>SOCIAL MEDIA</h2>
        <div className="card">
            <div className="card-body">
                <i className="fa fa-pen fa-xs edit"></i>
                <div className="social-media">
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                    </span>
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                    </span>
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                    </span>
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                    </span>
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                    </span>
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                    </span>
                    <span className="fa-stack fa-sm">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ProfilePage;