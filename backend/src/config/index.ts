import dotenv from "dotenv";
dotenv.config();

// export const redisPort = Number(process.env.REDIS_PORT) || 6379;
// export const redisHost = process.env.REDIS_HOST || '127.0.0.1';
// export const redisUsername = String(process.env.REDIS_USER_NAME) || 'default';
// export const redisPassword = String(process.env.REDIS_PASSWORD) || '';

// export const proxyUrl = String(process.env.PROXY_URL) || '';

//web push config:
export const publicVapidKey = process.env.PUBLIC_VAPID_KEY as string;
export const privateVapidKey = process.env.PRIVATE_VAPID_KEY as string;
export const BASE_URL = process.env.BASE_URL as string;
export const FE_URL = process.env.FE_URL as string;
export const NT_URL = process.env.NT_URL as string;
export const LH_URL = process.env.LH_URL as string;
export const MONGO_URL = process.env.MONGO_URL as string;
