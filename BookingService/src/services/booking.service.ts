import { createBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeywithLock } from "../repositories/booking.repository";
import { generateIdempotencyKey } from "../utils/generatedIdempotencyKey";
import { Prisma } from "../prisma/generated/client";
import prismaClient from "../prisma/client";



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

export async function confirmBookingService(tx: Prisma.TransactionClient, idempotencyKey: string) {
    return await prismaClient.$transaction(async (tx) => {
        const idempotencyKeydata = await getIdempotencyKeywithLock(tx, idempotencyKey);

        if (!idempotencyKeydata || !idempotencyKeydata.bookingId) {
            throw new NotFoundError("Idempotency key not found");
        }

        if (idempotencyKeydata.finalized) {
            throw new BadRequestError("Idempotency key already finalized");
        }

        const booking = await confirmBooking(tx, idempotencyKeydata.bookingId);
        await finalizeIdempotencyKey(tx, idempotencyKey);

        return booking;



    })
}