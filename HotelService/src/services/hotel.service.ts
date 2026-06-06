import { createHotelDTO } from "../dto/hotel.dto";
import HotelRepository from "../repositories/hotel.repository";
import { NotFoundError } from "../utils/errors/app.error";




export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await HotelRepository.createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await HotelRepository.getHotelById(id);
    if (!hotel) {
        throw new NotFoundError(`Hotel with pk ${id} not found`);
    }
    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await HotelRepository.getAllHotels();
    return hotels;
}

export async function deleteHotelService(id: number) {
    const response = await HotelRepository.softdelete(id);
    return response;
}

export async function updateHotelService(id: number, hotelData: createHotelDTO) {
    const response = await HotelRepository.updateHotel(id, hotelData);
    return response;
}