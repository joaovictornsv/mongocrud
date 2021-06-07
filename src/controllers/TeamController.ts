import { Request, Response } from 'express';
import Team from '@entities/Team';

class TeamController {
  async indexAll(req: Request, res: Response) {
    const teams = await Team.find().populate({ path: 'players', select: 'firstName lastName position -_id' });

    return res.status(200).json(teams);
  }

  async create(req: Request, res: Response) {
    const { name, coach } = req.body;

    const teamExists = await Team.findOne({ name });

    if (teamExists) {
      return res.status(400).json({ message: 'Team already exists' });
    }

    const team = await Team.create({ name, coach });

    return res.status(201).json(team);
  }
}

export { TeamController };
