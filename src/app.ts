import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import Profile from './entities/Profile';

const app = express();

app.use(express.json());
mongoose.connect('mongodb://localhost/mongocrud', { useNewUrlParser: true, useUnifiedTopology: true });

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected!');
});

app.get('/profiles', async (req, res) => {
  const profiles = await Profile.find();

  res.status(200).json(profiles);
});

app.post('/profiles', async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    position,
    team,
  } = req.body;

  const profile = await Profile.create({
    _id: uuid(),
    firstName,
    lastName,
    age,
    position,
    team,
  });

  res.status(201).json(profile);
});

export { app };
