import * as Yup from 'yup';

export default class UpdateMeetup {
  static getRules() {
    return Yup.object().shape({
      title: Yup.string().max(60),
      description: Yup.string(),
      date: Yup.date().min(
        new Date(),
        'you cannot create meetups for past dates. '
      ),
    });
  }
}
