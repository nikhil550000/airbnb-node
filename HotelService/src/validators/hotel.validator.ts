import { z } from "zod";

export const createHotelSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    location: z.string().min(1, "Location is required"),
    rating: z.number().optional().refine((val) => val === undefined || (val >= 0 && val <= 5), {
        message: "Rating must be between 0 and 5"
    }),
    ratingCount: z.number().optional().refine((val) => val === undefined || val >= 0, {
        message: "Rating count must be at least 0"
    })
});