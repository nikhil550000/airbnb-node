import { NextFunction, Request, Response } from "express";
import { createHotelService, getHotelByIdService } from "../services/hotel.service";


export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const hotel = await createHotelService(req.body);
        res.status(201).json(hotel);
    } catch (error) {
        next(error);
    }
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const hotel = await getHotelByIdService(Number(req.params.id));
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}