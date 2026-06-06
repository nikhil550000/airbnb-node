import { NextFunction, Request, Response } from "express";
import { createHotelService, getHotelByIdService, getAllHotelsService, deleteHotelService, updateHotelService } from "../services/hotel.service";
import { StatusCodes } from 'http-status-codes';

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        //call the service layer
        const hotel = await createHotelService(req.body);
        //send the response
        res.status(StatusCodes.OK).json(hotel);
    } catch (error) {
        next(error);
    }
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const hotel = await getHotelByIdService(Number(req.params.id));
        res.status(StatusCodes.OK).json(hotel);
    } catch (error) {
        next(error);
    }
}

export async function getAllHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const hotels = await getAllHotelsService();
        res.status(StatusCodes.OK).json(hotels);
    }
    catch (error) {
        next(error);
    }

}

export async function deleteHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await deleteHotelService(Number(req.params.id));
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Hotel deleted successfully",
            data: response
        })
    } catch (error) {
        next(error);
    }


}

export async function updateHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const hotel = await updateHotelService(Number(req.params.id), req.body);
        res.status(StatusCodes.OK).json(hotel);
    }
    catch (error) {
        next(error);
    }


}