import * as Yup from 'yup';
import { startOfHour } from 'date-fns';
import File from '../models/File';

export default class StoreMeetup {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string()
        .required()
        .max(60),
      description: Yup.string()
        .required()
        .max(1000),
      date: Yup.date()
        .min(new Date(), 'you cannot create meetups for past dates')
        .required()
        .transform(value => startOfHour(value)),
      bannerId: Yup.number()
        .integer()
        .test(
          'exists',
          'file not found',
          async value => (await File.findByPk(value)) !== null
        )
        .required(),
    });
  }
}
