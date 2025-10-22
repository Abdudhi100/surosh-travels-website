# Backend Implementation Guide

## Overview
Your travel website now has full backend functionality powered by Supabase. The system uses a three-tier architecture: Frontend → Server → Database.

## Features Implemented

### 1. Contact Form Submissions
- Users can submit contact inquiries through the contact form
- All submissions are stored in the database
- Admins can view, track, and update the status of each inquiry

### 2. Travel Packages Management
- Create and manage travel packages (Hajj, Umrah, Study Abroad)
- Each package includes pricing, features, and descriptions
- Packages can be retrieved and displayed on the website

### 3. Booking System
- Users can book travel packages through the "Book Now" button
- Booking form collects traveler details, number of people, and departure dates
- Calculates total amount based on travelers
- All bookings are stored and can be managed by admins

### 4. Admin Dashboard
- Comprehensive dashboard to manage all backend data
- View and update contact submissions
- Track and manage bookings
- See real-time statistics (total contacts, bookings, revenue)
- Update status of contacts and bookings

## How to Use

### For Website Visitors:
1. **Browse Services**: View Hajj, Umrah, and Study Abroad packages on the homepage
2. **Book a Package**: Click "Book Now" on any service card to open the booking form
3. **Submit Inquiry**: Use the contact form to ask questions or request information
4. **Get Notifications**: Toast notifications confirm successful submissions

### For Admins:
1. **Access Dashboard**: Click the "Admin" button in the bottom-right corner of the homepage
2. **Initial Setup**: On first visit, use the "Create Sample Packages" button to populate the database
3. **View Contacts**: See all contact form submissions in the Contacts tab
4. **Manage Bookings**: Review and update booking statuses (pending → confirmed)
5. **Track Statistics**: Monitor total contacts, bookings, and revenue

## API Endpoints

All endpoints are prefixed with `/make-server-330fd21f`

### Contact Endpoints:
- `POST /contact` - Submit a contact form
- `GET /contacts` - Get all contact submissions
- `PUT /contact/:id` - Update contact status

### Package Endpoints:
- `POST /packages` - Create a new package
- `GET /packages` - Get all packages (optional ?type= filter)
- `GET /packages/:id` - Get a specific package

### Booking Endpoints:
- `POST /bookings` - Create a new booking
- `GET /bookings` - Get all bookings (optional ?email= filter)
- `PUT /bookings/:id` - Update booking status

### Auth Endpoints:
- `POST /signup` - Create a new user account

## Data Storage

All data is stored in the Supabase KV (key-value) store with these key patterns:
- `contact:{timestamp}` - Contact form submissions
- `package:{timestamp}` - Travel packages
- `booking:{timestamp}` - Travel bookings

## Status Workflows

### Contact Statuses:
- **new** - Just submitted
- **contacted** - Team has reached out
- **resolved** - Inquiry completed

### Booking Statuses:
- **pending** - Waiting for confirmation
- **confirmed** - Booking approved
- **cancelled** - Booking cancelled

## Important Notes

⚠️ **Security Reminder**: While this backend is functional for prototypes and demos, remember that Figma Make is not designed for collecting sensitive personally identifiable information (PII) in production environments.

For production deployment:
- Implement proper authentication and authorization
- Add data encryption for sensitive information
- Set up email confirmations
- Integrate payment processing
- Implement proper compliance measures (GDPR, etc.)

## Extending the Backend

You can easily extend functionality by:
1. Adding new routes in `/supabase/functions/server/index.tsx`
2. Creating new API functions in `/utils/api.ts`
3. Building new UI components that use these APIs

## Support

If you encounter any issues:
- Check the browser console for error messages
- Verify Supabase connection is active
- Ensure all required fields are filled in forms
- Check the server logs for backend errors
