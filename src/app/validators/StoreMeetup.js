import * as Yup from 'yup';

export default class StoreMeetup {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string()
        .required()
        .max(60),
      description: Yup.string().required(),
      date: Yup.date()
        .min(new Date(), 'you cannot create meetups for past dates. ')
        .required(),
    });
  }
}
