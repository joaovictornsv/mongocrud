import { Router } from 'express';
import Player from '../entities/Player';
import Team from '../entities/Team';

const router = Router();

router.get('/', async (req, res) => {
  const profiles = await Player.find().populate({ path: 'team', select: 'name coach -_id' });

  res.status(200).json(profiles);
});

router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    position,
    team,
  } = req.body;

  if (!firstName || !lastName || !age || !position) {
    return res.status(400).json({ message: 'Provide the required fields' });
  }

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

export { router as playerRouter };
