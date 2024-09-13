import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, addAccommodation, editAccommodation, removeAccommodation } from '../../redux/accommodationsSlice';
import { uploadImage } from '../../utils/uploadImage'; // Adjust path as needed

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
    policies: [],
    mainImage: '',
    galleryImages: []
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageURLs = await Promise.all(imageFiles.map(file => uploadImage(file, 'accommodations')));
    const mainImage = imageURLs[0];
    const galleryImages = imageURLs.slice(1);
    
    const newAccommodationData = { ...formData, mainImage, galleryImages };

    if (isEditing && currentAccommodation) {
      await dispatch(editAccommodation({ id: currentAccommodation.id, updatedData: newAccommodationData, imageFile: imageFiles[0] }));
    } else {
      await dispatch(addAccommodation({ newAccommodationData, imageFile: imageFiles[0] }));
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
      policies: [],
      mainImage: '',
      galleryImages: []
    });
    setImageFiles([]);
  };

  const handleEdit = (accommodation) => {
    setCurrentAccommodation(accommodation);
    setFormData(accommodation);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await dispatch(removeAccommodation(id));
  };

  return (
    <div>
      <h2>Manage Accommodations</h2>
      <button onClick={() => setIsEditing(prev => !prev)}>
        {isEditing ? 'Cancel' : 'Add New Accommodation'}
      </button>
      
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Hotel Name" />
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <input type="file" multiple onChange={handleImageChange} />
          <button type="submit">{currentAccommodation ? 'Update Accommodation' : 'Add Accommodation'}</button>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      <div>
        {list.map((accommodation) => (
          <div key={accommodation.id}>
            <h3>{accommodation.name}</h3>
            <p>{accommodation.description}</p>
            <p>{accommodation.address}</p>
            {accommodation.mainImage && (
              <img src={accommodation.mainImage} alt={accommodation.name} style={{ width: '100px', height: 'auto' }} />
            )}
            <div>
              {accommodation.galleryImages && accommodation.galleryImages.map((image, index) => (
                <img key={index} src={image} alt={`${accommodation.name} gallery ${index}`} style={{ width: '50px', height: 'auto', marginRight: '5px' }} />
              ))}
            </div>
            <button onClick={() => handleEdit(accommodation)}>Edit</button>
            <button onClick={() => handleDelete(accommodation.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAccommodations;
