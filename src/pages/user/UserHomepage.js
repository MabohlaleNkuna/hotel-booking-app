import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchAccommodations } from '../../redux/accommodationsSlice.js';
import { fetchRooms } from '../../redux/roomSlice.js';

const UserHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { list: accommodations, loading: accommodationsLoading, error: accommodationsError } = useSelector((state) => state.accommodations);
  const { list: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchRooms());
  }, [dispatch]);

  if (accommodationsLoading || roomsLoading) return <p>Loading...</p>;
  if (accommodationsError || roomsError) return <p>Error: {accommodationsError || roomsError}</p>;

  const handleViewDetails = (roomId) => {
    navigate(`/room/${roomId}`); // Navigate to RoomDetailsPage with room ID
  };

  return (
    <div>
      <h1>Welcome to Botlhale Hotel</h1>
      
      <section>
        <h2>Available Accommodations</h2>
        <ul>
          {accommodations.map(accommodation => (
            <li key={accommodation.id}>
              <h3>{accommodation.name}</h3>
              <p>{accommodation.description}</p>
              <p>Capacity: {accommodation.capacity}</p>
              <p>
                Amenities: {Array.isArray(accommodation.amenities) ? accommodation.amenities.join(', ') : 'N/A'}
              </p>
              {accommodation.imageUrls && accommodation.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`${accommodation.name}`} width="200" />
              ))}
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Available Rooms</h2>
        <ul>
          {rooms.map(room => (
            <li key={room.id}>
              <h3>{room.name}</h3>
              {room.imageUrls && room.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`${room.name}`} width="200" />
              ))}
              <button onClick={() => handleViewDetails(room.id)}>View Details</button>
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Upcoming Features</h2>
        <p>Stay tuned for more updates on our platform, including user reviews, booking options, and more!</p>
      </section>
    </div>
  );
};

export default UserHomePage;
