import * as Yup from 'yup';
import File from '../models/File';

export default class UpdateMeetup {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string().max(60),
      description: Yup.string().max(1000),
      date: Yup.date().min(
        new Date(),
        'you cannot create meetups for past dates'
      ),
      bannerId: Yup.number()
        .integer()
        .test('exists', 'file not found.', async value => {
          return value ? File.findByPk(value) : true;
        }),
    });
  }
}
