import { TeamController } from '@controllers/TeamController';
import { Router } from 'express';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.indexAll);

router.post('/', teamController.create);

export { router as teamRouter };
