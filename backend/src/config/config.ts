import dotenv from 'dotenv'

dotenv.config();

export const config = {
    port : process.env.PORT,
    database_url : process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL
} 