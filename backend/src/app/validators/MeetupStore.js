import * as Yup from 'yup';
import { startOfHour } from 'date-fns';
import File from '../models/File';

export default class MeetupStore {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string()
        .required()
        .max(75),
      description: Yup.string()
        .required()
        .max(63206),
      date: Yup.date()
        .min(new Date(), 'Não é possível registrar meetups que já aconteceram.')
        .required()
        .transform(value => startOfHour(value)),
      location: Yup.string()
        .required()
        .max(255),
      bannerId: Yup.number()
        .integer()
        .test(
          'file-not-found',
          'Arquivo não encontrado.',
          async value => (await File.findByPk(value)) !== null
        )
        .required(),
    });
  }
}
