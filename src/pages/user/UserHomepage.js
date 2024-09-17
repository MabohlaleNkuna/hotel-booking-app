import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAccommodations } from '../../redux/accommodationsSlice.js';
import { fetchRooms } from '../../redux/roomSlice.js';
import SearchBar from '../../components/SearchBar.jsx'; // Import the SearchBar component

const UserHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: accommodations, loading: accommodationsLoading, error: accommodationsError } = useSelector((state) => state.accommodations);
  const { list: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);
  
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  if (accommodationsLoading || roomsLoading) return <p>Loading...</p>;
  if (accommodationsError || roomsError) return <p>Error: {accommodationsError || roomsError}</p>;

  const handleViewDetails = (roomId) => {
    navigate(`/room/${roomId}`);
  };
  const handleSearch = (searchTerm) => {
    console.log('Search Term:', searchTerm);
    console.log('Rooms:', rooms);
  
    if (!searchTerm) {
      setFilteredRooms(rooms);
      return;
    }
  
    const filteredRooms = rooms.filter((room) => {
      console.log('Room:', room);
      // return room.roomType && typeof room.roomType === 'string' &&
       return room.roomType.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    console.log('Filtered Rooms:', filteredRooms);
    setFilteredRooms(filteredRooms);
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f8ff', color: '#004AAD', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '20px' }}>Welcome to Botlhale Hotel</h1>

      {/* Add SearchBar component */}
      <SearchBar onSearch={handleSearch} />

      <section style={{ 
        marginBottom: '40px', 
        padding: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: '8px', 
        boxShadow: 'transparent' 
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Available Accommodations</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {accommodations.map(accommodation => (
            <li key={accommodation.id} style={{ 
              marginBottom: '40px', 
              padding: '20px', 
              border: '1px solid #004AAD', 
              borderRadius: '8px', 
              backgroundColor: 'transparent' 
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                
                  
                  <img src={accommodation.mainImage} alt={accommodation.name} width="300" style={{ borderRadius: '8px', marginBottom: '20px' }} />
             
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{accommodation.name}</h3>
                <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '10px' }}>{accommodation.description}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <p><strong>Capacity:</strong> {accommodation.capacity}</p>
                <p><strong>Amenities:</strong> {Array.isArray(accommodation.amenities) ? accommodation.amenities.join(', ') : 'N/A'}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ 
        marginBottom: '40px', 
        padding: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Available Rooms</h2>
        <ul style={{ 
          listStyle: 'none', 
          padding: '0', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px' 
        }}>
          {filteredRooms.map(room => (
            <li key={room.id} style={{ 
              padding: '20px', 
              border: '1px solid #004AAD', 
              borderRadius: '8px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)' 
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{room.name}</h3>
              {room.imageUrls && room.imageUrls[0] && (
                <img src={room.imageUrls[0]} alt={room.name} width="200" style={{ borderRadius: '8px', marginBottom: '10px' }} />
              )}
              <button 
                onClick={() => handleViewDetails(room.id)} 
                style={{
                  backgroundColor: '#004AAD', 
                  color: '#fff', 
                  padding: '10px 20px', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'}
                onMouseOut={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ 
        padding: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Upcoming Features</h2>
        <p style={{ fontSize: '16px' }}>Stay tuned for more updates on our platform, including user reviews, booking options, and more!</p>
      </section>
    </div>
  );
};

export default UserHomePage;

