import 'reflect-metadata';
import express from 'express';
import Player from './entities/Player';
import connectToDatabase from './database';
import Team from './entities/Team';

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

  if (!team) {
    return res.status(400).json({ message: 'Team not provided' });
  }

  const teamExists = await Team.findOne({ name: team });

  if (!teamExists) {
    return res.status(400).json({ message: 'Team provided not found' });
  }

  const profile = await Player.create({
    firstName,
    lastName,
    age,
    position,
    team: teamExists.id,
  });

  await Team.findByIdAndUpdate(teamExists.id, { $push: { players: profile } });

  res.status(201).json(profile);
});

app.post('/teams', async (req, res) => {
  const { name, coach } = req.body;

  const teamExists = await Team.findOne({ name });

  if (teamExists) {
    return res.status(400).json({ message: 'Team already exists' });
  }

  const team = await Team.create({ name, coach });

  res.status(201).json(team);
});

export { app };
