import { Router } from 'express';
import Auth from './app/middlewares/Auth';
import Validate from './app/middlewares/Validate';
import StoreSession from './app/validators/StoreSession';
import StoreUser from './app/validators/StoreUser';
import UpdateUser from './app/validators/UpdateUser';
import StoreMeetup from './app/validators/StoreMeetup';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupControler from './app/controllers/MeetupControler';

const router = Router();

router.post('/login', Validate(StoreSession), SessionController.store);
router.post('/users', Validate(StoreUser), UserController.store);

router.use(Auth);

router.put('/users', Validate(UpdateUser), UserController.update);

router.get('/meetups', MeetupControler.index);
router.post('/meetups', Validate(StoreMeetup), MeetupControler.store);

export default router;
