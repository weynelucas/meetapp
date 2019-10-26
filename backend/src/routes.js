import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import Auth from './app/middlewares/Auth';
import Validate from './app/middlewares/Validate';
import MeetupPreloader from './app/middlewares/MeetupPreloader';
import MeetupOwnerDetector from './app/middlewares/MeetupOwnerDetector';
import MeetupPastDateDetector from './app/middlewares/MeetupPastDateDetector';
import SubscriptionOwnerDetector from './app/middlewares/SubscriptionOwnerDetector';
import SubscriptionDuplicatedDetector from './app/middlewares/SubscriptionDuplicatedDetector';
import SubscriptionDateConflictDetector from './app/middlewares/SubscriptionDateConflictDetector';
import SubscriptionPreloader from './app/middlewares/SubscriptionPreloader';
import SubscriptionPastDateDetector from './app/middlewares/SubscriptionPastDateDetector';

import SessionStore from './app/validators/SessionStore';
import UserStore from './app/validators/UserStore';
import UserUpdate from './app/validators/UserUpdate';
import MeetupStore from './app/validators/MeetupStore';
import MeetupUpdate from './app/validators/MeetupUpdate';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupControler from './app/controllers/MeetupControler';
import FileController from './app/controllers/FileController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';

const router = Router();
const upload = multer(multerConfig);

// Auth
router.post('/login', Validate(SessionStore), SessionController.store);
router.post('/users', Validate(UserStore), UserController.store);
router.use(Auth);
router.put('/users', Validate(UserUpdate), UserController.update);

// Files
router.post('/files', upload.single('file'), FileController.store);

// Organizing
router.get('/organizing', OrganizingController.index);

// Meetups
router.use('/meetups/:meetupId', MeetupPreloader);
router.get('/meetups', MeetupControler.index);
router.post('/meetups', Validate(MeetupStore), MeetupControler.store);
router.put(
  '/meetups/:meetupId',
  MeetupOwnerDetector,
  MeetupPastDateDetector,
  Validate(MeetupUpdate),
  MeetupControler.update
);
router.delete(
  '/meetups/:meetupId',
  MeetupOwnerDetector,
  MeetupPastDateDetector,
  MeetupControler.delete
);

// Subscriptions
router.use('/subscriptions/:subscriptionId', SubscriptionPreloader);
router.get('/subscriptions', SubscriptionController.index);
router.delete(
  '/subscriptions/:subscriptionId',
  SubscriptionPastDateDetector,
  SubscriptionController.delete
);
router.post(
  '/meetups/:meetupId/subscriptions',
  MeetupPastDateDetector,
  SubscriptionOwnerDetector,
  SubscriptionDuplicatedDetector,
  SubscriptionDateConflictDetector,
  SubscriptionController.store
);

export default router;
