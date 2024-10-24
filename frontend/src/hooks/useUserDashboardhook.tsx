import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/config';

interface EstimatedBookingResponse {
  estimatedPrice: string;
  totalDistance: string;
  estimatedDuration: string;
}

export const useUserDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'tracking'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [estimatedBookingResponse, setEstimatedBookingResponse] = useState<EstimatedBookingResponse>({
    estimatedPrice: '',
    totalDistance: '',
    estimatedDuration: ''
  });
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    dropoff: '',
    vehicleType: '',
  });

  useEffect(() => {
    setUserEmail(sessionStorage.getItem('email'));
    setUserName(sessionStorage.getItem('name'));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleTypeChange = (value: string) => {
    setBookingDetails((prev) => ({ ...prev, vehicleType: value }));
  };

  const handleGetPriceEstimate = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const payload = {
        pickup: bookingDetails.pickup,
        dropoff: bookingDetails.dropoff,
        vehicleType: bookingDetails.vehicleType,
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/dashboard/price-estimate`, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      setEstimatedBookingResponse({
        estimatedPrice: response.data.estimatedPrice,
        totalDistance: response.data.distanceInKm,
        estimatedDuration: response.data.estimatedDuration,
      });
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error in Price Estimate:', error);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in session

      const payload = {
        userId,
        pickup: bookingDetails.pickup,
        dropoff: bookingDetails.dropoff,
        vehicleType: bookingDetails.vehicleType,
      };

      const response = await axios.post(`${BACKEND_URL}/api/v1/dashboard/confirm-booking`, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      console.log('Booking confirmed:', response.data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  return {
    activeTab,
    sidebarOpen,
    userName,
    email,
    isDialogOpen,
    estimatedBookingResponse,
    bookingDetails,
    setActiveTab,
    setSidebarOpen,
    handleInputChange,
    handleVehicleTypeChange,
    handleGetPriceEstimate,
    handleConfirmBooking,
    setIsDialogOpen,
  };
};
