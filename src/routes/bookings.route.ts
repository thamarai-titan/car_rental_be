import express from 'express';
import { verifyToken } from '../modules/middleware/auth.middleware';
import { createBooking, getSingleBookings, EditBooking, DeleteBooking } from '../controllers/bookings.controller';

const route = express.Router();

route.post("/bookings", verifyToken, createBooking )
route.get("/bookings", verifyToken, getSingleBookings)
route.put("/bookings/:bookingId", verifyToken, EditBooking)
route.delete("/bookings/:bookingId", verifyToken, DeleteBooking)

export default route 