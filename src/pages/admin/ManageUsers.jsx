import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, removeUser } from '../../redux/usersSlice';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(removeUser(userId));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p>Error fetching users: {error}</p>}
      <div>
        {users.map(user => (
          <div key={user.id}>
            <p>{user.name} ({user.email})</p>
            <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
