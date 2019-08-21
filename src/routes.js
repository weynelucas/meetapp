import { Router } from 'express';
import userController from './app/controllers/user-controller';
import sessionController from './app/controllers/session-controller';

const router = Router();

router.post('/users', userController.store);
router.post('/login', sessionController.store);

export default router;
