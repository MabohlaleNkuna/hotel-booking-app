import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../../redux/accommodationsSlice';
import { fetchRooms } from '../../redux/roomSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list: accommodations, loading: accommodationsLoading, error: accommodationsError } = useSelector((state) => state.accommodations);
  const { list: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchRooms());
  }, [dispatch]);

  if (accommodationsLoading || roomsLoading) return <p>Loading...</p>;
  if (accommodationsError || roomsError) return <p>Error: {accommodationsError || roomsError}</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Accommodations</h3>
      <ul>
        {accommodations.map(accommodation => (
          <li key={accommodation.id}>
            <h4>{accommodation.name}</h4>
            <p>{accommodation.description}</p>
            {/* Display other accommodation details as needed */}
          </li>
        ))}
      </ul>
      <h3>Rooms</h3>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <h4>{room.name}</h4>
            <p>{room.description}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
