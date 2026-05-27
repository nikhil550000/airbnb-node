import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getHotelById } from "../repositories/hotel.repository";
import { NotFoundError } from "../utils/errors/app.error";




export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    if (!hotel) {
        throw new NotFoundError(`Hotel with pk ${id} not found`);
    }
    return hotel;
}
