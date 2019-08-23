import { Router } from 'express';
import auth from './app/middlewares/auth-middleware';
import validate from './app/middlewares/validate-middleware';
import userController from './app/controllers/user-controller';
import sessionController from './app/controllers/session-controller';
import StoreUser from './app/validators/store-user';
import StoreSession from './app/validators/store-session';
import UpdateUser from './app/validators/update-user';

const router = Router();

router.post('/login', validate(StoreSession), sessionController.store);
router.post('/users', validate(StoreUser), userController.store);

router.use(auth);

router.put('/users', validate(UpdateUser), userController.update);

export default router;
