// ManageAccommodations.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAccommodations,
  addAccommodation,
  editAccommodation,
  removeAccommodation
} from '../../store/accommodationsSlice';
import { uploadImage } from '../../utils/uploadImage';

const ManageAccommodations = () => {
  const dispatch = useDispatch();
  const { list: accommodations, loading, error } = useSelector((state) => state.accommodations);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    mapLocation: { latitude: 0, longitude: 0 },
    starRating: 0,
    facilities: [],
    policies: '',
    mainImage: '',
    galleryImages: []
  });
  const [imageFiles, setImageFiles] = useState([]);

  // Fetch accommodations when component mounts
  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageURLs = await Promise.all(imageFiles.map((file) => uploadImage(file, 'accommodations')));
    const mainImage = imageURLs[0];
    const galleryImages = imageURLs.slice(1);

    const newAccommodationData = { ...formData, mainImage, galleryImages };

    if (isEditing) {
      dispatch(editAccommodation({ id: currentAccommodation.id, updatedData: newAccommodationData }));
    } else {
      dispatch(addAccommodation(newAccommodationData));
    }

    setIsEditing(false);
    setCurrentAccommodation(null);
    setFormData({});
    setImageFiles([]);
  };

  const handleEdit = (accommodation) => {
    setCurrentAccommodation(accommodation);
    setFormData(accommodation);
    setIsEditing(true);
  };

  const handleDelete = (accommodationID) => {
    dispatch(removeAccommodation(accommodationID));
  };

  return (
    <div>
      <h2>Manage Accommodations</h2>
      <button onClick={() => setIsEditing(false)}>Add New Accommodation</button>

      {isEditing || currentAccommodation ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Hotel Name" />
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <input type="file" multiple onChange={handleImageChange} />
          <button type="submit">{isEditing ? 'Update Accommodation' : 'Add Accommodation'}</button>
        </form>
      ) : null}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {accommodations.map((accommodation) => (
          <div key={accommodation.id}>
            <h3>{accommodation.name}</h3>
            <p>{accommodation.description}</p>
            <button onClick={() => handleEdit(accommodation)}>Edit</button>
            <button onClick={() => handleDelete(accommodation.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAccommodations;
