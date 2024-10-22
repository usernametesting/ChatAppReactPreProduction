import React, { useState } from 'react';
import '../commons/auth/auth.css';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register } from '../../store/authSlice';
import { RegisterModel, ServiceResponse } from './../../types/Auths/auth';
import Spinner from '../../components/Spinner/Spinner';
import { setLoadingState } from '../../store/userSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.users);


  const handleSubmit = async (e: React.FormEvent) => {
    dispatch(setLoadingState(true));
    e.preventDefault();
    try {
      if (password !== confirmPass) {
        dispatch(setLoadingState(false));
        alertify.warning("Password does not match");
      }
      else {
        const model: RegisterModel = { email, password };
        const result = (await dispatch(register(model))).payload as ServiceResponse;
        if (result.success) {
          alertify.success(result.message);
          navigate('/login');
        } else
          alertify.error(result.message);
        dispatch(setLoadingState(false));
      }
    } catch (error: any) {
      dispatch(setLoadingState(false));
      alertify.error(error);
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div id="login-div" className="panel panel-default">
              <div className="panel-heading">
                <h2 className="panel-title text-center">Registration</h2>
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
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Confirm password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </form>
                <div style={{ margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a href="/login">Login</a>
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
