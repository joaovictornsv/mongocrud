import { Router } from 'express';
import { PlayerController } from '@controllers/PlayerController';

const router = Router();

const playerController = new PlayerController();

router.get('/', playerController.indexAll);

router.post('/', playerController.create);

export { router as playerRouter };
