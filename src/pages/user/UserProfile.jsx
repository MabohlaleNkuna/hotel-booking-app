import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/usersSlice.js';
import { fetchUserBookings } from '../../redux/bookingSlice';
import { getUserProfile, updateProfile } from '../../utils/profileUtils.js'; // Correct import

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.booking.bookings);
  const favorites = useSelector((state) => state.booking.favorites);

  const [profileData, setProfileData] = useState({ email: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user || !user.uid) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    dispatch(fetchUserBookings(user.uid));
  }, [dispatch, user]);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    if (!user || !user.uid) return;

    await updateProfile(user.uid, profileData);
    dispatch(updateUserProfile({ ...profileData, uid: user.uid }));
    setIsEditing(false);
  };

  const handleChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {isEditing ? (
        <div className="mb-6">
          <input
            type="text"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            placeholder="Email"
          />
          <button
            onClick={handleSaveClick}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <p className="text-lg">Email: {profileData.email}</p>
          <p className="text-lg">Role: {profileData.role}</p>
          <button
            onClick={handleEditClick}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <ul className="list-disc pl-5">
        {bookings.map((booking) => (
          <li key={booking.id} className="mb-2">
            {booking.name} - {booking.date}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      <ul className="list-disc pl-5">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="mb-2">
            {favorite.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
