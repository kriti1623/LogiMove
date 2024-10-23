# logiMove

## Overview

This project is aimed at building a highly scalable logistics platform that connects users who need to transport goods with a network of drivers (captains). The platform enables real-time booking, price estimation, vehicle tracking, and smooth coordination between users and drivers. Admins can manage the fleet and monitor system performance via dedicated admin features.

The system is designed to handle a large user base and high traffic efficiently, with features that provide scalability and reliability.

## Features

### User Features

- **Booking Service**: 
  - Users can book a vehicle for transporting goods by providing details such as pickup location, drop-off location, and vehicle type.
  - Estimated cost is shown before confirming the booking.
  
- **Real-Time Tracking**: 
  - Once a booking is confirmed, users can track the driver's location in real-time as they proceed to the pickup location and drop-off point.
  
- **Price Estimation**: 
  - Users receive an upfront price estimate based on the distance between pickup and drop-off locations, the type of vehicle selected, and other demand factors.

### Driver (Captain) Features

- **Job Assignment**:
  - Captains (drivers) receive and can accept booking requests. Upon accepting, they see pickup and drop-off locations and can start the journey.

- **Job Status Updates**: 
  - Captains can update the status of their current job, such as marking when they are en route, when goods are collected, and when delivery is completed.

### Admin Features

- **Fleet Management**: 
  - Admins have the ability to manage the fleet of vehicles, monitor driver activity, and review booking data in real-time.

- **Data Analytics**:
  - Basic analytics are available to track the number of trips completed, average trip duration, and driver performance metrics.

## Progress

### UI Implementation

- **Landing Page**: A responsive and user-friendly landing page has been implemented.
- **Authentication Pages**: Custom authentication pages for both users and captains have been completed.
- **User Dashboard**: The user dashboard is fully functional, allowing users to:
  - View recent bookings
  - Track ongoing trips
  - Access price estimation tools
- **Captain Dashboard**: Captains have access to a dashboard where they can:
  - Accept or reject booking requests
  - Manage job statuses
  - View trip history and performance
- **Admin Routes**: Admin features for fleet management and analytics tracking have been integrated into the platform.

### Backend Implementation

- **Database Schema**: 
  - MongoDB is used for the database, with schemas for both users and captains, storing essential data such as booking logs, trip history, and driver availability.
  
- **Authentication**: 
  - User and captain authentication routes are fully implemented, utilizing JWT (JSON Web Tokens) for secure session management.
  
- **Price Estimation**: 
  - The backend leverages Google Maps Distance Matrix API to calculate distance-based price estimates depending on vehicle type, pickup, and drop-off locations.
  
- **Booking Logs**: 
  - The backend stores booking logs, allowing users and captains to access their recent booking history.
  
- **Captain History**: 
  - Captains can view their previous trips, earnings, and job status updates through the system.

## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS
  - Zustand
  - Axios for API requests

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for data storage
  - JWT for authentication
  - Bcrypt
  - Google Maps API (Distance Matrix) for price and distance calculations

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/on-demand-logistics-platform.git
