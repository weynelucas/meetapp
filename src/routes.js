import { Router } from 'express';
import SessionController from './app/controllers/session-controller';

const router = Router();

router.post('/login', SessionController.store);

export default router;
