import { createBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeywithLock } from "../repositories/booking.repository";
import { generateIdempotencyKey } from "../utils/generatedIdempotencyKey";
import prismaClient from "../prisma/client";
import { serverConfig } from "../config"
import { redlock } from "../config/redis.config";


import { NotFoundError, InternalServerError, BadRequestError } from "../utils/errors/app.error";

export async function createBookingService(createBookingDTO: createBookingDTO) {

    const ttl = serverConfig.LOCK_TTL;
    const bookingResource = `hotel:${createBookingDTO.hotelId}`;

    try {
        await redlock.acquire([bookingResource], ttl);

        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount,
        })

        const idempotencyKey = generateIdempotencyKey();
        await createIdempotencyKey(idempotencyKey, booking.id);

        return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey
        }

    } catch (error) {
        throw new InternalServerError("Failed to acquire lock on booking resource");


    }

}

export async function confirmBookingService(idempotencyKey: string) {
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