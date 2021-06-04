import 'reflect-metadata';
import express from 'express';
import Player from './entities/Player';
import connectToDatabase from './database';

const app = express();

connectToDatabase();

app.use(express.json());

app.get('/players', async (req, res) => {
  const profiles = await Player.find();

  res.status(200).json(profiles);
});

app.post('/players', async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    position,
    team,
  } = req.body;

  const profile = await Player.create({
    firstName,
    lastName,
    age,
    position,
    team,
  });

  res.status(201).json(profile);
});

export { app };
