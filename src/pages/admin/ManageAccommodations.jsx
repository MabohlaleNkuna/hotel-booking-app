import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAccommodations,
  addAccommodation,
  editAccommodation,
  removeAccommodation
} from '../../redux/accommodationsSlice';
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
    setImageFiles(Array.from(e.target.files)); // Convert FileList to Array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mainImage = '';
    let galleryImages = [];

    if (imageFiles.length > 0) {
      const imageURLs = await Promise.all(imageFiles.map((file) => uploadImage(file, 'accommodations')));
      mainImage = imageURLs[0];
      galleryImages = imageURLs.slice(1);
    }

    const newAccommodationData = { ...formData, mainImage, galleryImages };

    if (isEditing) {
      dispatch(editAccommodation({ id: currentAccommodation.id, updatedData: newAccommodationData, imageFiles }));
    } else {
      dispatch(addAccommodation({ newAccommodationData, imageFiles }));
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

  const handleEdit = (accommodation) => {
    setCurrentAccommodation(accommodation);
    setFormData(accommodation);
    setIsEditing(true);
  };

  const handleDelete = (accommodationID) => {
    dispatch(removeAccommodation(accommodationID));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Accommodations</h2>
      <button 
        onClick={() => {
          setIsEditing(true);
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
        }}
        style={styles.button}
      >
        Add New Accommodation
      </button>

      {isEditing && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Hotel Name" 
            style={styles.input}
          />
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Description" 
            style={styles.input}
          />
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Address" 
            style={styles.input}
          />
          <input 
            type="file" 
            multiple 
            onChange={handleImageChange} 
            style={styles.fileInput}
          />
          <button type="submit" style={styles.submitButton}>
            {isEditing ? 'Update Accommodation' : 'Add Accommodation'}
          </button>
        </form>
      )}

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      <div style={styles.accommodationList}>
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} style={styles.accommodationItem}>
            <h3>{accommodation.name}</h3>
            <p>{accommodation.description}</p>
            <button onClick={() => handleEdit(accommodation)} style={styles.button}>
              Edit
            </button>
            <button onClick={() => handleDelete(accommodation.id)} style={styles.button}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    marginBottom: '20px',
    color: '#004AAD'
  },
  button: {
    backgroundColor: '#F4C561',
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#FFF'
  },
  form: {
    marginBottom: '20px'
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #CCC'
  },
  fileInput: {
    marginBottom: '10px'
  },
  submitButton: {
    backgroundColor: '#004AAD',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#FFF',
    cursor: 'pointer'
  },
  loading: {
    color: '#F4C561'
  },
  error: {
    color: '#FF0000'
  },
  accommodationList: {
    marginTop: '20px'
  },
  accommodationItem: {
    borderBottom: '1px solid #CCC',
    padding: '10px 0'
  }
};

export default ManageAccommodations;
