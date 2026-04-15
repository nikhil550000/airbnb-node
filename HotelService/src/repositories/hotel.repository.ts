import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";

export async function createHotel(hotelData: createHotelDTO) {
    try {
        const hotel = await Hotel.create(hotelData);
        logger.info("Hotel created successfully", hotel.id);
        return hotel;
    } catch (error) {
        throw error;
    }

}

export async function getHotelById(id: number) {
    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            throw new Error("Hotel not found");
        }
        logger.info("Hotel fetched successfully", hotel.id);
        return hotel;
    } catch (error) {
        throw error;
    }
}

export default {
    createHotel,
    getHotelById
}