import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebaseConfig.js';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../../firebaseConfig';
import { updatePassword, deleteUser } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { email, role });

      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'users', user.uid));
        await deleteUser(auth.currentUser);
      } catch (error) {
        console.error('Error deleting account: ', error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Profile</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="New Password (leave blank to keep current)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 mb-3"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          {error && <p className="text-danger text-center">{error}</p>}
        </form>
        <button
          onClick={handleDeleteAccount}
          className="btn btn-danger w-100 mt-2"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
