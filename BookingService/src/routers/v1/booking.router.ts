import express from "express";
import { validateRequestBody } from "../../validators/index"
import { createBookingSchema } from "../../validators/booking.validator"
import { createBookingHandler, confirmBookingHandler } from "../../controllers/booking.controller";


const BookingRouter = express.Router();

BookingRouter.post("/", validateRequestBody(createBookingSchema), createBookingHandler);

BookingRouter.post("/confirm/:idempotencyKey", confirmBookingHandler);
export default BookingRouter;
