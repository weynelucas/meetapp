import { Router } from 'express';
import authMiddleware from './app/middlewares/auth-middleware';
import userController from './app/controllers/user-controller';
import sessionController from './app/controllers/session-controller';

const router = Router();

router.post('/login', sessionController.store);
router.post('/users', userController.store);
router.put('/users', authMiddleware, userController.update);

export default router;
