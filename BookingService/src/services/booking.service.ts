import { createBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKey } from "../repositories/booking.repository";
import { generateIdempotencyKey } from "../utils/generatedIdempotencyKey";

import { NotFoundError, BadRequestError } from "../utils/errors/app.error";

export async function createBookingService(createBookingDTO: createBookingDTO) {

    const booking = await createBooking({
        userId: createBookingDTO.userId,
        hotelId: createBookingDTO.hotelId,
        totalGuests: createBookingDTO.totalGuests,
        bookingAmount: createBookingDTO.bookingAmount
    });

    const idempotencyKey = generateIdempotencyKey();
    await createIdempotencyKey(idempotencyKey.toString(), booking.id);

    return {
        bookingId: booking.id,
        idempotencyKey: idempotencyKey
    }

}

export async function confirmBookingService(idempotencyKey: string) {
    const idempotencyKeydata = await getIdempotencyKey(idempotencyKey);

    if (!idempotencyKeydata) {
        throw new NotFoundError("Idempotency key not found");
    }

    if (idempotencyKeydata.finalized) {
        throw new BadRequestError("Idempotency key already finalized");
    }

    const booking = await confirmBooking(idempotencyKeydata.bookingId);
    await finalizeIdempotencyKey(idempotencyKey);

    return booking;



}