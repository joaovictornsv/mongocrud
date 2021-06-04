import { Router } from 'express';
import Team from '../entities/Team';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await Team.find().populate({ path: 'players', select: 'firstName lastName position -_id' });

  res.status(200).json(teams);
});

router.post('/', async (req, res) => {
  const { name, coach } = req.body;

  const teamExists = await Team.findOne({ name });

  if (teamExists) {
    return res.status(400).json({ message: 'Team already exists' });
  }

  const team = await Team.create({ name, coach });

  res.status(201).json(team);
});

export { router as teamRouter };
