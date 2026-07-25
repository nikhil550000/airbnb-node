import { v4 as uuid4 } from "uuid";


export function generateIdempotencyKey(): String {
    return uuid4();
}