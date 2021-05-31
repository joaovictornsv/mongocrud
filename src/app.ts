import 'reflect-metadata';
import express from 'express';

import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost/mongocrud', { useNewUrlParser: true, useUnifiedTopology: true });

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected!');
});

app.get('/api', (req, res) => res.status(200).json({ message: 'hello' }));

export { app };
