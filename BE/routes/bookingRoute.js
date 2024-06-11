import express from "express"
import { handleBooking, getFormData } from "../controllers/BookingController.js"
const router = express.Router();

router.get("/form-data", getFormData);
router.post("/book-service", handleBooking);


export default router