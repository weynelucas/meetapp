import * as Yup from 'yup';
import { startOfHour } from 'date-fns';
import File from '../models/File';

export default class UpdateMeetup {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string().max(60),
      description: Yup.string().max(1000),
      date: Yup.date()
        .min(new Date(), 'Não é possível registrar eventos que já aconteceram.')
        .transform(value => startOfHour(value)),
      bannerId: Yup.number()
        .integer()
        .test('file-not-found', 'Arquivo não encontrado.', async value => {
          return value ? (await File.findByPk(value)) !== null : true;
        }),
    });
  }
}
