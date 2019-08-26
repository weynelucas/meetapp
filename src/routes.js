import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import Auth from './app/middlewares/Auth';
import Validate from './app/middlewares/Validate';
import Meetup from './app/middlewares/Meetup';
import StoreSession from './app/validators/StoreSession';
import StoreUser from './app/validators/StoreUser';
import UpdateUser from './app/validators/UpdateUser';
import StoreMeetup from './app/validators/StoreMeetup';
import UpdateMeetup from './app/validators/UpdateMeetup';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupControler from './app/controllers/MeetupControler';
import FileController from './app/controllers/FileController';
import OrganizingController from './app/controllers/OrganizingController';

const router = Router();
const upload = multer(multerConfig);

router.post('/login', Validate(StoreSession), SessionController.store);
router.post('/users', Validate(StoreUser), UserController.store);

router.use(Auth);

router.put('/users', Validate(UpdateUser), UserController.update);

router.post('/files', upload.single('file'), FileController.store);

router.get('/organizing', OrganizingController.index);

router.get('/meetups', MeetupControler.index);
router.post('/meetups', Validate(StoreMeetup), MeetupControler.store);
router.use(
  '/meetups/:id',
  Meetup.checkObject,
  Meetup.isOwner,
  Meetup.isPastDate
);
router.put('/meetups/:id', Validate(UpdateMeetup), MeetupControler.update);
router.delete('/meetups/:id', MeetupControler.delete);

export default router;
