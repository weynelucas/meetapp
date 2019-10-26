import * as Yup from 'yup';
import { startOfHour } from 'date-fns';
import File from '../models/File';

export default class UpdateMeetup {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string().max(75),
      description: Yup.string().max(2200),
      date: Yup.date()
        .min(new Date(), 'Não é possível registrar meetups que já aconteceram.')
        .transform(value => startOfHour(value)),
      location: Yup.string().max(255),
      bannerId: Yup.number()
        .integer()
        .test('file-not-found', 'Arquivo não encontrado.', async value => {
          return value ? (await File.findByPk(value)) !== null : true;
        }),
    });
  }
}
