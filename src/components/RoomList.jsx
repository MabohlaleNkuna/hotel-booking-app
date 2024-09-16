import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../src/redux/roomSlice.js';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleViewDetails = (roomId) => {
    navigate(`/room-details/${roomId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Room List</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: R{room.price}</p>
            <Button onClick={() => handleViewDetails(room.id)}>View Details</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
