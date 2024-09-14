import { config } from 'dotenv';

config();

export const TOKEN = process.env.TOKEN || '';
export const CONFIRMATION = process.env.CONFIRMATION || '';
export const OPEN_API_KEY= process.env.OPEN_API_KEY || '';
export const PORT = process.env.APP_PORT || '';
