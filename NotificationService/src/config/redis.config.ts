import IoRedis, { Redis } from 'IoRedis';
import { serverConfig } from '.';


let connection: Redis | null = null;

function getRedisConnObject(): Redis {
    if (!connection) {
        try {
            const redisConfig = {
                port: serverConfig.REDIS_PORT,
                host: serverConfig.REDIS_HOST,
                maxRetriesPerRequest: null
            };
            connection = new IoRedis(redisConfig);
        } catch (error) {
            console.error("Error connecting to redis:", error);
            throw error;
        }
    }
    return connection;
}

export { getRedisConnObject };
