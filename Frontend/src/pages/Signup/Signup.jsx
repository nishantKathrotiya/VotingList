import React, { useState } from 'react';
import s from './Signup.module.css';
import { signUp } from '../../services/operation/authApi';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        authKey: '',
        password: '',
        confirmPassword: '',
        role: 'user', 
    });

    const [errors, setErrors] = useState({
        userId: '',
        authKey: '',
        password: '',
        confirmPassword: '',
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
        if (!formData.authKey.trim()) {
            newErrors.authKey = 'AuthKey is required';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Submitted:', formData);
            signUp(formData, setLoading);
        }
    };

    return (
        <div className={s.loginContainer}>
            <div className={s.loginInnerContainer}>
                <h1>Signup</h1>
                <form className={s.inputBox} onSubmit={handleSubmit}>
                    {/* Role Selection */}
                    <div className={s.radioSignUp}>
                        <div className={s.radioConatienr}>
                            <input
                                type="radio"
                                id="admin"
                                name="role"
                                value="admin"
                                checked={formData.role === 'admin'}
                                onChange={handleChange}
                            />
                            <label htmlFor="admin">Admin</label>
                        </div>
                        <div className={s.radioConatienr}>
                            <input
                                type="radio"
                                id="user"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleChange}
                            />
                            <label htmlFor="user">User</label>
                        </div>
                    </div>

                    {/* User ID */}
                    <div className={s.loginInputContainer}>
                        <label htmlFor="userId">User ID:</label>
                        <input
                            type="text"
                            name="userId"
                            placeholder="Enter User ID"
                            value={formData.userId}
                            onChange={handleChange}
                            className={errors.userId ? s.errorInput : ''}
                        />
                        {errors.userId && <p className={s.errorMessage}>{errors.userId}</p>}
                    </div>

                    {/* AuthKey */}
                    <div className={s.loginInputContainer}>
                        <label htmlFor="authKey">AuthKey:</label>
                        <input
                            type="text"
                            name="authKey"
                            placeholder="Enter AuthKey"
                            value={formData.authKey}
                            onChange={handleChange}
                            className={errors.authKey ? s.errorInput : ''}
                        />
                        {errors.authKey && <p className={s.errorMessage}>{errors.authKey}</p>}
                    </div>

                    {/* Password */}
                    <div className={s.loginInputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? s.errorInput : ''}
                        />
                        {errors.password && (
                            <p className={s.errorMessage}>{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className={s.loginInputContainer}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? s.errorInput : ''}
                        />
                        {errors.confirmPassword && (
                            <p className={s.errorMessage}>{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className={s.btnContainer}>
                        <button type="submit">Signup</button>
                        <Link className={s.nav} to="/">Alredy Have an UserID? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
