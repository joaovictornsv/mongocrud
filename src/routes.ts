import { Router } from 'express';
import { playerRouter } from './routers/playerRouter';
import { teamRouter } from './routers/teamRouter';

const router = Router();

router.use('/players', playerRouter);
router.use('/teams', teamRouter);
export { router };
