import express from 'express';
import { createHotelHandler, getAllHotelHandler, getHotelByIdHandler, deleteHotelHandler, updateHotelHandler } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { createHotelSchema } from '../../validators/hotel.validator';
const hotelRouter = express.Router();


hotelRouter.post('/',
    validateRequestBody(createHotelSchema),
    createHotelHandler);


hotelRouter.get('/', getAllHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.delete('/:id', deleteHotelHandler);
hotelRouter.put('/:id', validateRequestBody(createHotelSchema), updateHotelHandler);



export default hotelRouter;  