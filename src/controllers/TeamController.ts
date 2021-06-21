import { Request, Response } from 'express';
import Team from '@entities/Team';

class TeamController {
  /**
   * Method that get all Teams
   * @param req Request
   * @param res Response
   * @returns Promise<Response>
   */
  async indexAll(req: Request, res: Response) {
    const teams = await Team.find().populate({ path: 'players', select: 'firstName lastName position -_id' });

    return res.status(200).json(teams);
  }

  /**
   * Method that create a new Team
   * @param req Request
   * @param res Response
   * @returns Promise<Response>
   */
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
