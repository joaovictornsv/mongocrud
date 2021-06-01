import 'reflect-metadata';
import express from 'express';
import { v4 as uuid } from 'uuid';
import Profile from './entities/Profile';
import connectToDatabase from './database';

const app = express();

connectToDatabase();

app.use(express.json());

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
