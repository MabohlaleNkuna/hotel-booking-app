// ManageAccommodations.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, addAccommodation, editAccommodation, removeAccommodation } from '../../redux/accommodationsSlice';
import { uploadImage } from '../../utils/uploadImage';

const ManageAccommodations = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.accommodations);

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

  // Fetch accommodations data from Firestore
  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  // Handle form submission for adding or updating an accommodation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images to Firebase Storage
    const imageURLs = await Promise.all(imageFiles.map(file => uploadImage(file, 'accommodations')));
    const mainImage = imageURLs[0]; // Assuming the first image is the main image
    const galleryImages = imageURLs.slice(1);
    
    // Prepare the data to be added or updated
    const newAccommodationData = { ...formData, mainImage, galleryImages };

    if (isEditing) {
      await dispatch(editAccommodation({ id: currentAccommodation.id, updatedData: newAccommodationData }));
    } else {
      await dispatch(addAccommodation(newAccommodationData));
    }
    setIsEditing(false);
    setCurrentAccommodation(null);
    setFormData({
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
    setImageFiles([]);
  };

  // Handle editing an accommodation
  const handleEdit = (accommodation) => {
    setCurrentAccommodation(accommodation);
    setFormData(accommodation);
    setIsEditing(true);
  };

  // Handle deleting an accommodation
  const handleDelete = async (id) => {
    await dispatch(removeAccommodation(id));
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
          {/* Add other input fields for accommodation details */}
          <input type="file" multiple onChange={handleImageChange} />
          <button type="submit">{isEditing ? 'Update Accommodation' : 'Add Accommodation'}</button>
        </form>
      ) : null}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      <div>
        {list.map((accommodation) => (
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