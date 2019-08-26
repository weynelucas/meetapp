import { Router } from 'express';
import Auth from './app/middlewares/Auth';
import Validate from './app/middlewares/Validate';
import StoreSession from './app/validators/StoreSession';
import StoreUser from './app/validators/StoreUser';
import UpdateUser from './app/validators/UpdateUser';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = Router();

router.post('/login', Validate(StoreSession), SessionController.store);
router.post('/users', Validate(StoreUser), UserController.store);

router.use(Auth);

router.put('/users', Validate(UpdateUser), UserController.update);

export default router;
