import { Request, Response } from 'express';
import Player from '@entities/Player';
import Team from '@entities/Team';

class PlayerController {
  /**
   * Method that get all players
   * @param req Request
   * @param res Response
   * @returns Promise<Response>
   */
  async indexAll(req: Request, res: Response): Promise<Response> {
    const profiles = await Player.find().populate({ path: 'team', select: 'name coach -_id' });

    return res.status(200).json(profiles);
  }

  /**
   * Method that create a new Player
   * @param req Request
   * @param res Response
   * @returns Promise<Response>
   */
  async create(req: Request, res: Response) {
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

    return res.status(201).json(profile);
  }
}

export { PlayerController };
