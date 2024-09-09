import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import Buttons from '../components/Buttons';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }))
      .then(() => setSuccessMessage('Registered successfully!')) // Set success message on successful registration
      .catch(() => setSuccessMessage('')); // Clear success message if there's an error
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <Buttons
          style={{ marginTop: '10px' }} 
          onClick={handleRegister}
        >
          Register
        </Buttons>
        {successMessage && <p>{successMessage}</p>} {/* Display success message */}
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
