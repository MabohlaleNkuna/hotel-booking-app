import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, addRoom, editRoom, deleteRoom } from '../../redux/roomSlice.js';
import { Button, Form, Col, Row } from 'react-bootstrap';

const ManageRoom = () => {
  const dispatch = useDispatch();
  const { list: rooms, loading } = useSelector((state) => state.rooms);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    price: '',
    amenities: '',
    roomType: '',
    imageFiles: [],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'roomType') {
      updateAmenities(value);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFiles: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(editRoom({ id: editingId, updatedData: formData, imageFiles: formData.imageFiles }));
    } else {
      dispatch(addRoom({ newRoomData: formData, imageFiles: formData.imageFiles }));
    }
    setFormData({
      name: '',
      description: '',
      capacity: '',
      price: '',
      amenities: '',
      roomType: '',
      imageFiles: [],
    });
    setEditingId(null);
  };

  const handleEdit = (room) => {
    setFormData({
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      price: room.price,
      amenities: room.amenities,
      roomType: room.roomType,
      imageFiles: [],
    });
    setEditingId(room.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteRoom(id));
  };

  const updateAmenities = (roomType) => {
    let amenities = '';
    switch (roomType) {
      case 'Standard':
        amenities = 'Basic amenities, Free WiFi';
        break;
      case 'Deluxe':
        amenities = 'Enhanced amenities, Free WiFi, Mini-bar';
        break;
      case 'Suite':
        amenities = 'Luxurious amenities, Free WiFi, Mini-bar, Jacuzzi';
        break;
      default:
        amenities = '';
    }
    setFormData((prev) => ({ ...prev, amenities }));
  };

  return (
    <div>
      <h1>Manage Rooms</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column sm={2}>Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCapacity">
          <Form.Label column sm={2}>Capacity</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPrice">
          <Form.Label column sm={2}>Price</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formAmenities">
          <Form.Label column sm={2}>Amenities</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              required
              readOnly
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formRoomType">
          <Form.Label column sm={2}>Room Type</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formImages">
          <Form.Label column sm={2}>Images</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingId ? 'Update Room' : 'Add Room'}
        </Button>
      </Form>
      <h2>Existing Rooms</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: ${room.price}</p>
            <p>Amenities: {room.amenities}</p>
            <p>Room Type: {room.roomType}</p>
            {room.imageUrls && room.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Room image ${index}`} width="100" />
            ))}
            <Button variant="warning" onClick={() => handleEdit(room)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(room.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoom;
