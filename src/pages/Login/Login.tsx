import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  AppDispatch } from '../../store/store';
import { login } from '../../store/authSlice';
import { LoginModel, ServiceResponse } from '../../types/Auths/auth';
import alertify from 'alertifyjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../commons/auth/auth.css';
import './Login.css'
import { setLoadingState } from '../../store/userSlice';


const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    dispatch(setLoadingState(true));
    e.preventDefault();

    const model: LoginModel = { email, password };
    const result = (await dispatch(login(model))).payload as ServiceResponse;;
    if (result.success)
      navigate('/dashboard');
    else
      alertify.error(result?.message);
    dispatch(setLoadingState(false));
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div id="login-div" className="panel panel-default">
              <div className="panel-heading">
                <h2 className="panel-title text-center">Login</h2>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <div style={{ margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a href="/register">Registration</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;