import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, updateBookingStatus } from '../../redux/bookingsSlice';

const ManageBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(state => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleUpdateStatus = (bookingId, status) => {
    dispatch(updateBookingStatus({ bookingId, status }));
  };

  return (
    <div>
      <h2>Manage Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p>Error fetching bookings: {error}</p>}
      <div>
        {bookings.map(booking => (
          <div key={booking.id}>
            <p>Booking for {booking.customerName} - Status: {booking.status}</p>
            <button onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}>Confirm</button>
            <button onClick={() => handleUpdateStatus(booking.id, 'Canceled')}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
