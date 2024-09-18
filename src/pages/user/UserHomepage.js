import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAccommodations } from '../../redux/accommodationsSlice.js';
import { fetchRooms } from '../../redux/roomSlice.js';
import SearchBar from '../../components/SearchBar.jsx';
import MapComponent from '../../components/MapComponent.jsx'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import './userhomepage.css'; 

const UserHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: accommodations, loading: accommodationsLoading, error: accommodationsError } = useSelector((state) => state.accommodations);
  const { list: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  if (accommodationsLoading || roomsLoading) return <p className="loading-text">Loading...</p>;
  if (accommodationsError || roomsError) return <p className="error-text">Error: {accommodationsError || roomsError}</p>;

  const handleViewDetails = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredRooms(rooms);
      return;
    }

    const filteredRooms = rooms.filter((room) =>
      room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRooms(filteredRooms);
  };

  const handleAddToFavorites = (id) => {
    setFavorites(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleShare = (url) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this accommodation!',
        url: url
      }).catch(console.error);
    } else {
      prompt('Copy this link:', url);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Welcome to Bohlale's HideAway</h1>

      <SearchBar onSearch={handleSearch} className="search-bar" />

      <section className="map-container">
        <MapComponent className="map" />
        <div className="accommodations">
          <ul className="accommodations-list">
            {accommodations.map(accommodation => (
              <li key={accommodation.id} className="accommodation-item">
                <div className="accommodation-image-container">
                  <img src={accommodation.mainImage} alt={accommodation.name} className="accommodation-image" />
                  <h3 className="accommodation-name">{accommodation.name}</h3>
                  <p className="accommodation-description">{accommodation.description}</p>
                </div>
                <div className="accommodation-details">
                  <p><strong>Capacity:</strong> {accommodation.capacity}</p>
                  <p><strong>Amenities:</strong> {Array.isArray(accommodation.amenities) ? accommodation.amenities.join(', ') : 'N/A'}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => handleAddToFavorites(accommodation.id)}
                    style={{
                      cursor: 'pointer',
                      color: favorites.has(accommodation.id) ? '#4caf50' : '#004AAD',
                      fontSize: '24px',
                      transition: 'color 0.3s ease'
                    }}
                    title={favorites.has(accommodation.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  />
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    onClick={() => handleShare(window.location.href)}
                    style={{
                      cursor: 'pointer',
                      color: '#4caf50',
                      fontSize: '24px',
                      transition: 'color 0.3s ease'
                    }}
                    title="Share"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rooms-section">
        <h2 className="rooms-title">Available Rooms</h2>
        <ul className="rooms-list">
          {filteredRooms.map(room => (
            <li key={room.id} className="room-item">
              <h3 className="room-name">{room.name}</h3>
              {room.imageUrls && room.imageUrls[0] && (
                <img src={room.imageUrls[0]} alt={room.name} className="room-image" />
              )}
              <button
                onClick={() => handleViewDetails(room.id)}
                className="view-details-button"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UserHomePage;
