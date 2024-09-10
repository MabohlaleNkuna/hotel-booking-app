import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import AuthForm from '../../components/AuthForm'; 

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }))
      .then(() => setSuccessMessage('Registered successfully!'))
      .catch(() => setSuccessMessage(''));
  };

  return (
    <AuthForm
      title="Register"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleRegister}
      buttonText="Register"
      error={error}
      successMessage={successMessage}
    />
  );
};

export default RegisterPage;
