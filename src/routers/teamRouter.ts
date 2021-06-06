import { Router } from 'express';
import { TeamController } from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.indexAll);

router.post('/', teamController.create);

export { router as teamRouter };
