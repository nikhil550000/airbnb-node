import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

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
        if (hotel) {
            logger.info("Hotel fetched successfully", hotel.id);
        }
        return hotel;
    } catch (error) {
        throw (error);
    }
}

export async function getAllHotels() {
    try {
        const hotels = await Hotel.findAll(
            {
                where: {
                    deletedAt: null
                }
            }

        );
        if (hotels) {
            logger.info("All Active Hotels Fetched successfully")
        }
        return hotels;
    }
    catch (error) {
        throw (error);
    }
}

export async function softdelete(id: number) {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
        logger.error(`Hotel with id ${id} not found`);
        throw new NotFoundError(`Hotel with pk ${id} Not Found`);
    }

    hotel.deletedAt = new Date();
    await hotel.save();//save the chagnes to the database
    logger.info(`Hotel with id ${hotel.id} soft deleted`);
    return true;
}


export async function updateHotel(id: number, hotelData: createHotelDTO) {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
        logger.info(`Hotel with id ${id} not found`)
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }
    hotel.set(hotelData);
    await hotel.save();//save changes to the database
    logger.info(`Hotel with id ${hotel.id} updated`);
    return hotel;

}





const HotelRepository = {
    createHotel,
    getHotelById,
    getAllHotels,
    softdelete,
    updateHotel
};

export default HotelRepository;