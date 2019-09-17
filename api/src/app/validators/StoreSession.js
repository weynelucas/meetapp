import * as Yup from 'yup';

export default class StoreSession {
  static getRules(req) {
    return Yup.object().shape({
      email: Yup.string()
        .trim()
        .required(req.t('required')),
      password: Yup.string()
        .trim()
        .required(req.t('required')),
    });
  }
}
