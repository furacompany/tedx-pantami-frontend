# TEDxPantami Frontend API Documentation

This document provides all the information needed to build the TEDxPantami frontend application. It describes the system flow, API endpoints, data structures, and requirements.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Features](#features)
3. [System Flow](#system-flow)
4. [API Endpoints](#api-endpoints)
5. [Data Models](#data-models)
6. [Frontend Requirements](#frontend-requirements)
7. [Payment Integration](#payment-integration)
8. [Important Notes](#important-notes)

---

## System Overview

TEDxPantami is an event management system where:
- **Admins** can create and manage events, tickets, and view bookings
- **Users** can browse events, book tickets, make payments, and receive email confirmations with PDF tickets

### Base URL

```
Development: http://localhost:5000
Production: [Your Production URL]
```

### API Prefix

All API endpoints are prefixed with `/api`

---

## Features

### User Features
- Browse all events (public)
- View event details
- View available tickets for an event
- Book tickets with payment
- Receive email confirmation with PDF ticket
- View booking using transaction reference

### Admin Features
- Admin authentication (JWT)
- Create, update, delete events
- Upload event images (ImageKit)
- Create, update, delete tickets
- Manage notifications (one active at a time)
- View all bookings with filters
- View bookings by event or ticket
- Profile management

---

## System Flow

### Admin Flow

```
1. Admin Login
   ↓
2. Get JWT Token (valid for 7 days)
   ↓
3. Use token in Authorization header: "Bearer <token>"
   ↓
4. Create Event
   ↓
5. Upload Event Image (optional)
   ↓
6. Create Tickets for Event
   ↓
7. Set Active Notification (optional)
   ↓
8. Monitor Bookings
```

### User Booking Flow

```
1. View All Events (GET /api/events)
   ↓
2. View Event Details (GET /api/events/:id)
   ↓
3. View Tickets for Event (GET /api/tickets/event/:eventId)
   ↓
4. Select Ticket & Fill Booking Form
   ↓
5. Initialize Payment (POST /api/payments/initialize)
   - Creates transaction
   - Returns Paystack authorization URL
   ↓
6. Complete Payment via Paystack
   - User redirected/popup to Paystack checkout
   - User completes payment
   ↓
7. Payment Verification (via webhook or manual)
   - Webhook: POST /api/payments/webhook (automatic)
   - Manual: GET /api/payments/verify/:reference
   ↓
8. Create Booking (POST /api/bookings or auto-created)
   - Booking created with status "confirmed"
   - Ticket availability decreases
   - Email sent automatically with PDF ticket
   ↓
9. User Receives Email
   - Confirmation email
   - PDF ticket attachment with QR code
```

---

## API Endpoints

### Authentication

All admin endpoints require JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

### Health Check

#### GET /health

**Purpose:** Check if server is running

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

### Admin Endpoints

#### POST /api/admin/login

**Purpose:** Admin login to get JWT token

**Authentication:** None

**Request Body:**
```json
{
  "email": "admin@tedxpantami.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "admin_id_here",
      "email": "admin@tedxpantami.com",
      "name": "Admin Name",
      "role": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

#### GET /api/admin/profile

**Purpose:** Get current admin profile

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "admin_id_here",
    "email": "admin@tedxpantami.com",
    "name": "Admin Name",
    "role": "admin",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

#### PUT /api/admin/profile

**Purpose:** Update admin profile

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```
*(Both fields optional - only send fields to update)*

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "admin_id_here",
    "email": "newemail@example.com",
    "name": "Updated Name",
    "role": "admin"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already in use"
}
```

---

### Event Endpoints

#### GET /api/events

**Purpose:** Get all events (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "event_id_here",
      "title": "TEDxPantami Youth 2025",
      "description": "Redefining Possibilities",
      "date": "2025-09-27T10:00:00.000Z",
      "venue": "Matrix International Academy Hall, Gombe",
      "imageUrl": "https://ik.imagekit.io/...",
      "status": "active",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

**Note:** Events are sorted by date (newest first)

---

#### GET /api/events/:id

**Purpose:** Get single event by ID (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "event_id_here",
    "title": "TEDxPantami Youth 2025",
    "description": "Redefining Possibilities",
    "date": "2025-09-27T10:00:00.000Z",
    "venue": "Matrix International Academy Hall, Gombe",
    "imageUrl": "https://ik.imagekit.io/...",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Event not found"
}
```

---

#### GET /api/events/admin/all

**Purpose:** Get all events with pagination and filters (admin)

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `sortBy` (optional): Field to sort by (default: "createdAt")
- `sortOrder` (optional): "asc" or "desc" (default: "desc")
- `search` (optional): Search in title or description
- `status` (optional): "active" or "inactive"
- `dateFrom` (optional): Filter events from this date (ISO 8601)
- `dateTo` (optional): Filter events until this date (ISO 8601)

**Example Request:**
```
GET /api/events/admin/all?page=1&limit=20&search=TEDx&status=active&sortBy=date&sortOrder=asc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "event_id_here",
      "title": "TEDxPantami Youth 2025",
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

#### POST /api/events

**Purpose:** Create new event (admin)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "title": "TEDxPantami Youth 2025",
  "description": "Redefining Possibilities",
  "date": "2025-09-27T10:00:00.000Z",
  "venue": "Matrix International Academy Hall, Gombe",
  "imageUrl": "https://ik.imagekit.io/...",
  "status": "active"
}
```

**Required Fields:**
- `title`: string (required)
- `date`: ISO 8601 date string (required)

**Optional Fields:**
- `description`: string
- `venue`: string
- `imageUrl`: string (valid URL)
- `status`: "active" | "inactive" (default: "active")

**Response:**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "event_id_here",
    "title": "TEDxPantami Youth 2025",
    "description": "Redefining Possibilities",
    "date": "2025-09-27T10:00:00.000Z",
    "venue": "Matrix International Academy Hall, Gombe",
    "imageUrl": "https://ik.imagekit.io/...",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

#### PUT /api/events/:id

**Purpose:** Update event (admin)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "title": "Updated Title",
  "venue": "New Venue",
  "status": "inactive"
}
```
*(All fields optional - only send fields to update)*

**Response:**
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "_id": "event_id_here",
    "title": "Updated Title",
    "venue": "New Venue",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Event not found"
}
```

---

#### DELETE /api/events/:id

**Purpose:** Delete event (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Event not found"
}
```

**Note:** Associated image is also deleted from ImageKit

---

#### DELETE /api/events/:id/image

**Purpose:** Delete event image only (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Event image deleted successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Event has no image"
}
```

---

#### GET /api/events/admin/:id/tickets

**Purpose:** Get event with all its tickets (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "data": {
    "event": {
      "_id": "event_id_here",
      "title": "TEDxPantami Youth 2025",
      ...
    },
    "tickets": [
      {
        "_id": "ticket_id_here",
        "name": "Gold",
        "price": 5000000,
        "availableQuantity": 95,
        ...
      }
    ],
    "ticketCount": 3
  }
}
```

---

### Ticket Endpoints

#### GET /api/tickets/event/:eventId

**Purpose:** Get all active tickets for an event (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ticket_id_here",
      "eventId": "event_id_here",
      "name": "Gold",
      "description": "VIP access with premium seating",
      "price": 5000000,
      "quantity": 100,
      "availableQuantity": 95,
      "status": "active",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "_id": "ticket_id_2",
      "name": "Silver",
      "price": 3000000,
      "quantity": 200,
      "availableQuantity": 200,
      "status": "active",
      ...
    }
  ]
}
```

**Note:** Only returns tickets with `status: "active"`

---

#### GET /api/tickets/:id

**Purpose:** Get single ticket by ID (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "ticket_id_here",
    "eventId": "event_id_here",
    "name": "Gold",
    "description": "VIP access with premium seating",
    "price": 5000000,
    "quantity": 100,
    "availableQuantity": 95,
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Ticket not found"
}
```

---

#### GET /api/tickets/admin/all

**Purpose:** Get all tickets with pagination and filters (admin)

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `sortBy` (optional): Field to sort by (default: "createdAt")
- `sortOrder` (optional): "asc" or "desc" (default: "desc")
- `search` (optional): Search in name or description
- `eventId` (optional): Filter by event ID
- `status` (optional): "active" or "inactive"
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter

**Example Request:**
```
GET /api/tickets/admin/all?page=1&limit=20&eventId=event_id_here&status=active&minPrice=1000000&maxPrice=10000000
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ticket_id_here",
      "eventId": {
        "_id": "event_id_here",
        "title": "TEDxPantami Youth 2025",
        "venue": "...",
        "status": "active"
      },
      "name": "Gold",
      "price": 5000000,
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

#### POST /api/tickets

**Purpose:** Create new ticket (admin)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "eventId": "event_id_here",
  "name": "Gold",
  "description": "VIP access with premium seating",
  "price": 5000000,
  "quantity": 100,
  "status": "active"
}
```

**Required Fields:**
- `eventId`: MongoDB ObjectId (required)
- `name`: string (required)
- `price`: number (min: 0, in kobo)
- `quantity`: number (min: 1)

**Optional Fields:**
- `description`: string
- `status`: "active" | "inactive" (default: "active")

**Response:**
```json
{
  "success": true,
  "message": "Ticket created successfully",
  "data": {
    "_id": "ticket_id_here",
    "eventId": "event_id_here",
    "name": "Gold",
    "description": "VIP access with premium seating",
    "price": 5000000,
    "quantity": 100,
    "availableQuantity": 100,
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Note:** `availableQuantity` is automatically set equal to `quantity` on creation

**Error Response (404):**
```json
{
  "success": false,
  "message": "Event not found"
}
```

---

#### PUT /api/tickets/:id

**Purpose:** Update ticket (admin)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "name": "Updated Gold Ticket",
  "price": 6000000,
  "quantity": 150,
  "status": "inactive"
}
```
*(All fields optional - only send fields to update)*

**Response:**
```json
{
  "success": true,
  "message": "Ticket updated successfully",
  "data": {
    "_id": "ticket_id_here",
    "name": "Updated Gold Ticket",
    "price": 6000000,
    "quantity": 150,
    "availableQuantity": 145,
    ...
  }
}
```

**Note:** When updating `quantity`, `availableQuantity` is automatically adjusted:
- If quantity increases by 10, availableQuantity increases by 10
- If quantity decreases by 5, availableQuantity decreases by 5 (but won't go below 0)

**Error Response (404):**
```json
{
  "success": false,
  "message": "Ticket not found"
}
```

---

#### DELETE /api/tickets/:id

**Purpose:** Delete ticket (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Ticket deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Ticket not found"
}
```

---

#### GET /api/tickets/admin/:id/event

**Purpose:** Get ticket with its event details (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "data": {
    "ticket": {
      "_id": "ticket_id_here",
      "eventId": {
        "_id": "event_id_here",
        "title": "TEDxPantami Youth 2025",
        ...
      },
      "name": "Gold",
      ...
    },
    "event": {
      "_id": "event_id_here",
      "title": "TEDxPantami Youth 2025",
      ...
    }
  }
}
```

---

### Booking Endpoints

#### POST /api/bookings

**Purpose:** Create booking after successful payment (public)

**Authentication:** None

**Request Body:**
```json
{
  "reference": "TEDX-1234567890-ABCD"
}
```

**Required Fields:**
- `reference`: Transaction reference from payment initialization (string)

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking": {
      "_id": "booking_id_here",
      "eventId": "event_id_here",
      "ticketId": "ticket_id_here",
      "transactionId": "transaction_id_here",
      "email": "user@example.com",
      "fullName": "John Doe",
      "phoneNumber": "+2348012345678",
      "quantity": 2,
      "totalAmount": 10000000,
      "status": "confirmed",
      "qrCodeData": "a1b2c3d4e5f6...",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    "transaction": {
      "_id": "transaction_id_here",
      "reference": "TEDX-1234567890-ABCD",
      "status": "success",
      "amount": 10000000,
      ...
    },
    "event": {
      "_id": "event_id_here",
      "title": "TEDxPantami Youth 2025",
      ...
    },
    "ticket": {
      "_id": "ticket_id_here",
      "name": "Gold",
      "price": 5000000,
      ...
    }
  }
}
```

**What Happens:**
1. Verifies transaction status is "success"
2. Creates booking with status "confirmed"
3. Links booking to transaction
4. Decreases ticket `availableQuantity`
5. **Sends email automatically with PDF ticket**

**Error Response (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Payment not successful. Please complete payment first."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Insufficient tickets available"
}
```

**Note:** If booking already exists, returns existing booking data

---

#### GET /api/bookings/:reference

**Purpose:** Get booking by transaction reference (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "_id": "booking_id_here",
      "eventId": {
        "_id": "event_id_here",
        "title": "TEDxPantami Youth 2025",
        "date": "2025-09-27T10:00:00.000Z",
        "venue": "Matrix International Academy Hall, Gombe"
      },
      "ticketId": {
        "_id": "ticket_id_here",
        "name": "Gold",
        "price": 5000000
      },
      "email": "user@example.com",
      "fullName": "John Doe",
      "phoneNumber": "+2348012345678",
      "quantity": 2,
      "totalAmount": 10000000,
      "status": "confirmed",
      "qrCodeData": "a1b2c3d4e5f6...",
      ...
    },
    "transaction": {
      "_id": "transaction_id_here",
      "reference": "TEDX-1234567890-ABCD",
      "status": "success",
      "amount": 10000000
    }
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

#### GET /api/bookings/admin/all

**Purpose:** Get all bookings with pagination and filters (admin)

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `sortBy` (optional): Field to sort by (default: "createdAt")
- `sortOrder` (optional): "asc" or "desc" (default: "desc")
- `search` (optional): Search in email, fullName, or phoneNumber
- `eventId` (optional): Filter by event ID
- `ticketId` (optional): Filter by ticket ID
- `status` (optional): "pending" | "confirmed" | "cancelled"
- `email` (optional): Filter by email
- `dateFrom` (optional): Filter bookings from this date (ISO 8601)
- `dateTo` (optional): Filter bookings until this date (ISO 8601)

**Example Request:**
```
GET /api/bookings/admin/all?page=1&limit=20&eventId=event_id_here&status=confirmed&sortBy=createdAt&sortOrder=desc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "booking_id_here",
      "eventId": {
        "_id": "event_id_here",
        "title": "TEDxPantami Youth 2025",
        "date": "2025-09-27T10:00:00.000Z",
        "venue": "...",
        "status": "active"
      },
      "ticketId": {
        "_id": "ticket_id_here",
        "name": "Gold",
        "price": 5000000,
        "status": "active"
      },
      "transactionId": {
        "_id": "transaction_id_here",
        "reference": "TEDX-1234567890-ABCD",
        "status": "success",
        "amount": 10000000
      },
      "email": "user@example.com",
      "fullName": "John Doe",
      "phoneNumber": "+2348012345678",
      "quantity": 2,
      "totalAmount": 10000000,
      "status": "confirmed",
      "qrCodeData": "a1b2c3d4e5f6...",
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

#### GET /api/bookings/admin/event/:eventId

**Purpose:** Get all bookings for a specific event (admin)

**Authentication:** Required (Bearer token)

**Query Parameters:** Same as `/api/bookings/admin/all` (except `eventId` is in URL)

**Response:** Same format as `/api/bookings/admin/all`

---

#### GET /api/bookings/admin/ticket/:ticketId

**Purpose:** Get all bookings for a specific ticket (admin)

**Authentication:** Required (Bearer token)

**Query Parameters:** Same as `/api/bookings/admin/all` (except `ticketId` is in URL)

**Response:** Same format as `/api/bookings/admin/all`

---

### Payment Endpoints

#### POST /api/payments/initialize

**Purpose:** Initialize payment and create transaction (public)

**Authentication:** None

**Request Body:**
```json
{
  "eventId": "event_id_here",
  "ticketId": "ticket_id_here",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phoneNumber": "+2348012345678",
  "quantity": 2
}
```

**Required Fields:**
- `eventId`: MongoDB ObjectId (required)
- `ticketId`: MongoDB ObjectId (required)
- `email`: Valid email address (required)
- `fullName`: string (required)
- `phoneNumber`: string (required)
- `quantity`: number (min: 1, required)

**Response:**
```json
{
  "success": true,
  "message": "Payment initialized successfully",
  "data": {
    "access_code": "br6cgmvflhn3qtd",
    "reference": "TEDX-1234567890-ABCD",
    "authorization_url": "https://checkout.paystack.com/br6cgmvflhn3qtd",
    "amount": 10000000,
    "transactionId": "transaction_id_here"
  }
}
```

**What Happens:**
1. Validates ticket availability
2. Verifies ticket belongs to event
3. Checks sufficient quantity available
4. Creates transaction with status "pending"
5. Stores booking data in transaction metadata
6. Initializes Paystack payment
7. Returns Paystack authorization URL and reference

**Error Response (404):**
```json
{
  "success": false,
  "message": "Ticket not found"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Insufficient tickets available"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Ticket does not belong to this event"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Ticket is not available"
}
```

**Frontend Action:**
- Save the `reference` for later use
- Use `authorization_url` to redirect user to Paystack, OR
- Use `access_code` with Paystack frontend SDK to open popup

---

#### POST /api/payments/create-booking

**Purpose:** Create booking after successful payment (alternative to POST /api/bookings)

**Authentication:** None

**Request Body:**
```json
{
  "reference": "TEDX-1234567890-ABCD"
}
```

**Response:** Same as `POST /api/bookings`

**Note:** This endpoint does the same thing as `POST /api/bookings`. Use either one.

---

#### GET /api/payments/verify/:reference

**Purpose:** Verify payment status and auto-create booking if successful (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "message": "Payment verified",
  "data": {
    "transaction": {
      "_id": "transaction_id_here",
      "reference": "TEDX-1234567890-ABCD",
      "status": "success",
      "amount": 10000000,
      "verified": true,
      ...
    },
    "verification": {
      "data": {
        "status": "success",
        "amount": 10000000,
        ...
      }
    },
    "alreadyFulfilled": false
  }
}
```

**What Happens:**
1. Verifies payment with Paystack
2. Updates transaction status
3. **Auto-creates booking if payment successful and booking doesn't exist**
4. Decreases ticket availability
5. **Sends email with PDF ticket**

**Note:** This endpoint can be used as a fallback or called after payment completion

---

#### POST /api/payments/webhook

**Purpose:** Paystack webhook handler (automatic)

**Authentication:** None (but verifies Paystack signature)

**Headers:**
```
X-Paystack-Signature: <signature>
```

**Note:** This endpoint is automatically called by Paystack. Configure the webhook URL in Paystack dashboard:
```
https://your-domain.com/api/payments/webhook
```

**What Happens:**
1. Verifies webhook signature
2. Processes `charge.success` event
3. Updates transaction status to "success"
4. **Auto-creates booking if it doesn't exist**
5. Decreases ticket availability
6. **Sends email with PDF ticket**

---

### Image Endpoints

#### POST /api/images/upload

**Purpose:** Upload image to ImageKit (admin)

**Authentication:** Required (Bearer token)

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**
- `image`: File (required)
- `fileName` (optional): Custom file name

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://ik.imagekit.io/tedxpantami/filename.jpg"
  }
}
```

**Frontend Usage:**
1. Get image from file input
2. Create FormData
3. Append file to FormData
4. Send POST request with FormData
5. Use returned `url` in event creation/update

---

#### DELETE /api/images/delete/:fileId

**Purpose:** Delete image from ImageKit (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

**Note:** Usually not needed as event deletion handles image cleanup

---

### Notification Endpoints

#### GET /api/notifications

**Purpose:** Get active notification (public)

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "notification_id_here",
    "message": "Early bird tickets now available!",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Response (No Active Notification):**
```json
{
  "success": true,
  "data": null
}
```

**Note:** Only one notification can be active at a time. Frontend should display this at the top of the page if `data` is not null.

---

#### GET /api/notifications/all

**Purpose:** Get all notifications (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "notification_id_here",
      "message": "Early bird tickets now available!",
      "status": "active",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "_id": "notification_id_2",
      "message": "Last 10 tickets remaining!",
      "status": "inactive",
      ...
    }
  ]
}
```

**Note:** Sorted by creation date (newest first)

---

#### POST /api/notifications

**Purpose:** Create notification (admin)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "message": "Early bird tickets now available!",
  "status": "active"
}
```

**Required Fields:**
- `message`: string (required)

**Optional Fields:**
- `status`: "active" | "inactive" (default: "active")

**Response:**
```json
{
  "success": true,
  "message": "Notification created successfully",
  "data": {
    "_id": "notification_id_here",
    "message": "Early bird tickets now available!",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Important:** If creating with `status: "active"`, all other active notifications are automatically set to "inactive"

---

#### PUT /api/notifications/:id

**Purpose:** Update notification (admin)

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "message": "Updated message",
  "status": "inactive"
}
```
*(All fields optional - only send fields to update)*

**Response:**
```json
{
  "success": true,
  "message": "Notification updated successfully",
  "data": {
    "_id": "notification_id_here",
    "message": "Updated message",
    "status": "inactive",
    ...
  }
}
```

**Important:** If setting `status: "active"`, all other active notifications are automatically set to "inactive"

---

#### DELETE /api/notifications/:id

**Purpose:** Delete notification (admin)

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

## Data Models

### Event Model

```typescript
{
  _id: string;                    // MongoDB ObjectId
  title: string;                  // Required
  description?: string;           // Optional
  date: Date;                     // Required, ISO 8601
  venue?: string;                 // Optional
  imageUrl?: string;              // Optional, ImageKit URL
  status: "active" | "inactive";  // Default: "active"
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

---

### Ticket Model

```typescript
{
  _id: string;                    // MongoDB ObjectId
  eventId: string;                // Reference to Event, Required
  name: string;                   // Required (e.g., "Gold", "Silver")
  description?: string;           // Optional
  price: number;                  // Required, in kobo (₦100,000 = 10000000)
  quantity: number;               // Required, total tickets
  availableQuantity: number;      // Required, decreases on booking
  status: "active" | "inactive";  // Default: "active"
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

**Important Notes:**
- `price` is stored in **kobo** (divide by 100 to get Naira)
- `availableQuantity` is automatically set equal to `quantity` on creation
- `availableQuantity` decreases when bookings are confirmed

---

### Booking Model

```typescript
{
  _id: string;                    // MongoDB ObjectId
  eventId: string;                // Reference to Event, Required
  ticketId: string;               // Reference to Ticket, Required
  transactionId: string;          // Reference to Transaction, Required, Unique
  email: string;                  // Required, lowercase
  fullName: string;               // Required
  phoneNumber: string;            // Required
  quantity: number;               // Required, min: 1
  totalAmount: number;            // Required, in kobo
  status: "pending" | "confirmed" | "cancelled";  // Default: "confirmed" after payment
  qrCodeData?: string;            // Auto-generated, SHA-256 hash
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

**Important Notes:**
- `qrCodeData` is automatically generated on booking creation
- Status is "confirmed" when booking is created (after successful payment)
- `totalAmount` = ticket price × quantity

---

### Transaction Model

```typescript
{
  _id: string;                    // MongoDB ObjectId
  reference: string;              // Required, Unique (e.g., "TEDX-1234567890-ABCD")
  bookingId?: string;             // Reference to Booking, Optional (set after booking creation)
  email: string;                  // Required, lowercase
  amount: number;                 // Required, in kobo
  status: "pending" | "success" | "failed";  // Default: "pending"
  paystackResponse?: any;         // Paystack API response
  verified: boolean;              // Default: false
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

**Important Notes:**
- `reference` is generated automatically (format: `TEDX-{timestamp}-{random}`)
- `bookingId` is null initially, set after booking creation
- Transaction metadata contains booking data (eventId, ticketId, fullName, phoneNumber, quantity)

---

### Admin Model

```typescript
{
  _id: string;                    // MongoDB ObjectId
  email: string;                  // Required, Unique, lowercase
  password: string;               // Required, hashed with bcrypt
  name: string;                   // Required
  role: string;                   // Default: "admin"
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

---

### Notification Model

```typescript
{
  _id: string;                    // MongoDB ObjectId
  message: string;                // Required
  status: "active" | "inactive";  // Default: "active"
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

**Important Notes:**
- Only one notification can be "active" at a time
- Setting a notification to "active" automatically deactivates others

---

## Frontend Requirements

### Required Libraries/Dependencies

#### Core Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "typescript": "^5.x",
  "vite": "^5.x",
  "tailwindcss": "^3.x"
}
```

#### HTTP Client

```bash
npm install axios
# or
npm install fetch (built-in, no install needed)
```

**Recommended:** Use `axios` for better error handling and interceptors

#### Form Handling

```bash
npm install react-hook-form
npm install @hookform/resolvers zod
# or
npm install formik yup
```

**Recommended:** `react-hook-form` with `zod` for validation

#### State Management

```bash
npm install @tanstack/react-query
# or
npm install react-query
# or
npm install zustand
# or
npm install redux @reduxjs/toolkit react-redux
```

**Recommended:** `@tanstack/react-query` for server state management

#### Payment Integration

```bash
# For Paystack integration
npm install react-paystack
# or use Paystack inline JS
# Add script: https://js.paystack.co/v1/inline.js
```

**Alternative:** Use Paystack Inline JS (no npm package needed)

```html
<script src="https://js.paystack.co/v1/inline.js"></script>
```

#### Date Handling

```bash
npm install date-fns
# or
npm install dayjs
# or
npm install moment
```

**Recommended:** `date-fns` (lightweight) or `dayjs` (Moment.js alternative)

#### QR Code Generation

```bash
npm install qrcode.react
# or
npm install react-qr-code
```

**Purpose:** Display QR code from `booking.qrCodeData` in booking confirmation page

#### File Upload

```bash
# Built-in File API, no package needed
# Or use a library for better UX
npm install react-dropzone
```

#### UI Components (Optional)

```bash
# Tailwind UI components
npm install @headlessui/react
npm install @heroicons/react

# Or use a component library
npm install shadcn-ui  # (requires setup)
# or
npm install @mui/material
# or
npm install antd
```

#### Toast/Notification System

```bash
npm install react-hot-toast
# or
npm install react-toastify
# or
npm install sonner
```

#### Loading States

```bash
# Use with react-query or implement yourself
# Optional: Spinner library
npm install react-spinners
```

---

### Environment Variables

Create a `.env` file in frontend root:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000
VITE_API_BASE_URL_PROD=https://your-production-api.com

# Paystack Public Key (for payment)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...

# ImageKit (if doing client-side uploads)
VITE_IMAGEKIT_PUBLIC_KEY=...
VITE_IMAGEKIT_URL_ENDPOINT=...
```

**Note:** Vite uses `VITE_` prefix for environment variables

---

### API Client Setup

#### Example with Axios

```typescript
// api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

### Authentication Flow

#### Admin Authentication

1. **Login:**
   - POST `/api/admin/login` with email and password
   - Save `token` to localStorage/sessionStorage
   - Redirect to admin dashboard

2. **Authenticated Requests:**
   - Add token to `Authorization` header: `Bearer <token>`
   - Token expires after 7 days

3. **Logout:**
   - Remove token from storage
   - Redirect to login page

4. **Protected Routes:**
   - Check if token exists before rendering admin pages
   - Redirect to login if no token

---

## Payment Integration

### Paystack Integration

#### Step 1: Initialize Payment

```typescript
// After user fills booking form
const response = await fetch('/api/payments/initialize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventId: '...',
    ticketId: '...',
    email: 'user@example.com',
    fullName: 'John Doe',
    phoneNumber: '+2348012345678',
    quantity: 2,
  }),
});

const { data } = await response.json();
const { access_code, reference, authorization_url } = data;
```

#### Step 2: Open Paystack Popup

**Option A: Using Paystack Inline JS**

```html
<script src="https://js.paystack.co/v1/inline.js"></script>
```

```typescript
const handler = PaystackPop.setup({
  key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  email: 'user@example.com',
  amount: data.amount, // Amount in kobo
  ref: reference,
  callback: async function(response) {
    // Payment successful
    // Create booking
    await createBooking(reference);
    // Redirect to success page
  },
  onClose: function() {
    // User closed popup
    alert('Payment cancelled');
  },
});

handler.openIframe();
```

**Option B: Redirect to Paystack**

```typescript
window.location.href = authorization_url;
// After payment, user is redirected back to your callback URL
// Verify payment and create booking in callback handler
```

#### Step 3: Create Booking After Payment

```typescript
const createBooking = async (reference: string) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reference }),
  });

  const result = await response.json();
  if (result.success) {
    // Show success message
    // Redirect to booking confirmation page
    // User will receive email automatically
  }
};
```

#### Step 4: Verify Payment (Optional Fallback)

```typescript
const verifyPayment = async (reference: string) => {
  const response = await fetch(`/api/payments/verify/${reference}`);
  const result = await response.json();
  
  if (result.success && result.data.transaction.status === 'success') {
    // Payment verified
    // Booking may have been auto-created
  }
};
```

---

### Payment Flow Summary

```
User fills form → Initialize Payment → Get Paystack URL → 
User completes payment → Create Booking → Receive email with PDF ticket
```

**Alternative (Automatic):**
```
User fills form → Initialize Payment → Get Paystack URL → 
User completes payment → Webhook/Verify auto-creates booking → Receive email
```

---

## Important Notes

### Currency Handling

**All amounts are in KOBO:**
- ₦100,000 = 10,000,000 kobo
- ₦5,000 = 500,000 kobo
- ₦50 = 5,000 kobo

**Frontend Conversion:**
```typescript
// Convert kobo to Naira for display
const formatPrice = (kobo: number) => {
  return (kobo / 100).toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
};

// Convert Naira to kobo for API
const toKobo = (naira: number) => {
  return Math.round(naira * 100);
};
```

---

### Date Handling

- All dates are in ISO 8601 format: `2025-09-27T10:00:00.000Z`
- Event dates are stored in UTC
- Display dates in user's local timezone
- Use a date library (date-fns, dayjs) for formatting

---

### Image Handling

- Event images are stored in ImageKit
- Image URLs are returned as full ImageKit URLs
- Images can be displayed directly: `<img src={event.imageUrl} />`
- For admin upload: Use `POST /api/images/upload` with FormData

---

### Error Handling

**Standard Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors, invalid data)
- `401`: Unauthorized (no token or invalid token)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

**Validation Errors:**
Some endpoints return detailed validation errors:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Valid email is required" }
  ]
}
```

---

### Pagination

**Paginated Responses Include:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sortBy`: Field to sort by (default: "createdAt")
- `sortOrder`: "asc" or "desc" (default: "desc")

---

### Booking Status Flow

1. **Payment Initialized:**
   - Transaction created with status "pending"
   - No booking exists yet

2. **Payment Successful:**
   - Transaction status → "success"
   - Booking created with status "confirmed"
   - Ticket availability decreases
   - Email sent with PDF ticket

3. **Payment Failed:**
   - Transaction status → "failed"
   - No booking created
   - User can retry payment

---

### QR Code Data

- `qrCodeData` is a SHA-256 hash string
- Automatically generated on booking creation
- Can be used to generate QR code visual using `qrcode.react` or similar
- QR code is included in PDF ticket sent via email

---

### Email Confirmation

- Email is sent **automatically** after booking creation
- Email contains:
  - Confirmation message
  - Event details
  - Booking information
  - **PDF ticket attachment** with QR code
- User should check spam folder if email not received

---

### Notification Display

- Get active notification: `GET /api/notifications`
- Display at top of page if `data` is not null
- Only one notification can be active at a time
- Update periodically or on page load

---

### Ticket Availability

- Check `availableQuantity` before allowing booking
- Display "Sold Out" if `availableQuantity === 0`
- Disable booking button if quantity is 0
- Real-time check happens on payment initialization (backend validates)

---

### Booking Reference

- Transaction `reference` is unique and permanent
- Format: `TEDX-{timestamp}-{random}`
- User should save reference for booking lookup
- Reference is included in confirmation email

---

### CORS Configuration

- Backend CORS is enabled for all origins (development)
- For production, configure allowed origins in backend
- Frontend should use correct API base URL

---

### Webhook Configuration

- Webhook URL: `https://your-domain.com/api/payments/webhook`
- Configure in Paystack Dashboard → Settings → Webhooks
- Webhook automatically creates booking when payment succeeds
- Frontend can also manually create booking after payment

---

## Frontend Structure Recommendations

```
src/
├── api/
│   ├── client.ts              # Axios instance with interceptors
│   ├── events.ts              # Event API calls
│   ├── tickets.ts             # Ticket API calls
│   ├── bookings.ts            # Booking API calls
│   ├── payments.ts            # Payment API calls
│   ├── admin.ts               # Admin API calls
│   └── notifications.ts       # Notification API calls
├── components/
│   ├── EventCard.tsx
│   ├── TicketCard.tsx
│   ├── BookingForm.tsx
│   ├── PaymentModal.tsx
│   ├── QRCode.tsx
│   └── ...
├── pages/
│   ├── Home.tsx               # Events list
│   ├── EventDetail.tsx
│   ├── Booking.tsx
│   ├── BookingConfirmation.tsx
│   ├── Admin/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Events.tsx
│   │   └── Bookings.tsx
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   ├── useEvents.ts
│   ├── useTickets.ts
│   └── ...
├── utils/
│   ├── formatPrice.ts         # Convert kobo to Naira
│   ├── formatDate.ts          # Format dates
│   └── ...
├── types/
│   ├── event.ts
│   ├── ticket.ts
│   ├── booking.ts
│   └── ...
└── App.tsx
```

---

## Testing Checklist

### User Flow
- [ ] View all events
- [ ] View event details
- [ ] View tickets for event
- [ ] Initialize payment
- [ ] Complete payment via Paystack
- [ ] Create booking
- [ ] View booking confirmation
- [ ] Receive email with PDF ticket

### Admin Flow
- [ ] Admin login
- [ ] View admin dashboard
- [ ] Create event
- [ ] Upload event image
- [ ] Create tickets
- [ ] View bookings
- [ ] Update event/ticket
- [ ] Manage notifications
- [ ] Logout

---

## Support & Contact

- **Email:** tedxpantamiyouth@gmail.com
- **Social:** @tedxpantami

---

## Summary

This documentation provides everything needed to build the TEDxPantami frontend:

1. **System Flow:** Complete user and admin workflows
2. **API Endpoints:** All endpoints with request/response examples
3. **Data Models:** Complete data structures
4. **Frontend Requirements:** Required libraries and setup
5. **Payment Integration:** Paystack integration guide
6. **Important Notes:** Currency, dates, errors, pagination, etc.

**Key Points:**
- All amounts are in **kobo** (divide by 100 for Naira)
- Payment flow: Initialize → Paystack → Create Booking → Email
- Admin endpoints require JWT token in Authorization header
- Bookings are created after successful payment
- Email with PDF ticket is sent automatically
- Only one notification can be active at a time

Build the frontend with confidence using this documentation! 🚀

