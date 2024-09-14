import { config } from 'dotenv';

config();

export const TOKEN = process.env.TOKEN || '';
export const OPEN_API_KEY= process.env.OPEN_API_KEY || '';
