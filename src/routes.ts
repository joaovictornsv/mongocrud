import { Router } from 'express';
import { teamRouter } from '@routers/teamRouter';
import { playerRouter } from '@routers/playerRouter';

const router = Router();

router.use('/players', playerRouter);
router.use('/teams', teamRouter);
export { router };
