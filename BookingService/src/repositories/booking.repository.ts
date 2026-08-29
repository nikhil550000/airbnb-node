import { Prisma, IdempotencyKey } from "../prisma/generated/client";
import prismaClient from "../prisma/client";
import { validate as isValidUUid } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error"

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {

    const booking = await prismaClient.booking.create({
        data: bookingInput
    })

    return booking;
}


export async function createIdempotencyKey(key: string, bookingId: number) {

    const idempotencykey = await prismaClient.idempotencyKey.create({
        data: {
            idemkey: key,
            booking: {
                connect: {
                    id: bookingId
                }
            }
        }
    });
    return idempotencykey;
}

export async function getIdempotencyKeywithLock(tx: Prisma.TransactionClient, key: string) {
    if (!isValidUUid(key)) {
        throw new BadRequestError("Invalid Idempotency Key");
    }

    const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
        Prisma.raw(`SELECT * FROM IdempotencyKey  WHERE idemkey = '${key}' FOR UPDATE;`)
    )

    if (!idempotencyKey || idempotencyKey.length == 0) {
        throw new NotFoundError("Idempotency key not found");
    }

    return idempotencyKey[0];


}

export async function getBookingbyId(bookingId: number) {
    const booking = await prismaClient.booking.findUnique({
        where: {
            id: bookingId
        }
    });

    return booking;
}

export async function confirmBooking(tx: Prisma.TransactionClient, bookingId: number) {
    const booking = await tx.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: "CONFIRMED"
        }
    });

    return booking;

}

export async function cancelBooking(bookingId: number) {
    const booking = await prismaClient.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: "CANCELLED"
        }
    });
    return booking;
}

export async function finalizeIdempotencyKey(tx: Prisma.TransactionClient, key: string) {

    const idempotencyKey = await tx.idempotencyKey.update({

        where: {
            idemkey: key
        },
        data: {
            finalized: true
        }

    });

    return idempotencyKey;
}






