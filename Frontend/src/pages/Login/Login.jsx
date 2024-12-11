import React, { useState } from 'react';
import s from './Login.module.css';
import { login } from '../../services/operation/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.profile)


  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userId: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userId.trim()) {
      newErrors.userId = 'User ID is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login(formData.userId, formData.password, navigate));
    }
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.loginInnerContainer}>
        <h1>Login</h1>

        {
          loading ? <p>Loading...</p> : (
            <form className={s.inputBox} onSubmit={handleSubmit}>
              <div className={s.loginInputContainer}>
                <label htmlFor="userId">UserID :</label>
                <input
                  type="text"
                  name="userId"
                  placeholder="User ID"
                  value={formData.userId}
                  onChange={handleChange}
                  className={errors.userId ? s.errorInput : ''}
                />
                {errors.userId && <p className={s.errorMessage}>{errors.userId}</p>}
              </div>
              <div className={s.loginInputContainer}>
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? s.errorInput : ''}
                />
                {errors.password && (
                  <p className={s.errorMessage}>{errors.password}</p>
                )}
              </div>
              <div className={s.btnContainer}>
                <button type="submit">Login</button>
                <Link className={s.nav} to="/signup">Don't Have UserID? Create One</Link>
              </div>
            </form>
          )
        }

      </div>
    </div>
  );
};

export default Login;
