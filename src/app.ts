import 'reflect-metadata';
import express from 'express';
import connectToDatabase from './database';
import { router } from './routes';

const app = express();

connectToDatabase();

app.use(express.json());
app.use(router);

export { app };
