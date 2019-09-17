import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import Auth from './app/middlewares/Auth';
import Validate from './app/middlewares/Validate';
import MeetupPreloader from './app/middlewares/MeetupPreloader';
import MeetupOwnerDetector from './app/middlewares/MeetupOwnerDetector';
import MeetupPastDateDetector from './app/middlewares/MeetupPastDateDetector';

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
import SubscriptionController from './app/controllers/SubscriptionController';

const router = Router();
const upload = multer(multerConfig);

router.post('/login', Validate(StoreSession), SessionController.store);
router.post('/users', Validate(StoreUser), UserController.store);

router.use(Auth);

router.put('/users', Validate(UpdateUser), UserController.update);

router.post('/files', upload.single('file'), FileController.store);

router.get('/organizing', OrganizingController.index);

router.use('/meetups/:meetupId', [
  MeetupPreloader,
  MeetupOwnerDetector,
  MeetupPastDateDetector,
]);
router.get('/meetups', MeetupControler.index);
router.post('/meetups', Validate(StoreMeetup), MeetupControler.store);
router.put(
  '/meetups/:meetupId',
  Validate(UpdateMeetup),
  MeetupControler.update
);
router.delete('/meetups/:meetupId', MeetupControler.delete);

router.get('/subscriptions', SubscriptionController.index);
router.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);

export default router;
