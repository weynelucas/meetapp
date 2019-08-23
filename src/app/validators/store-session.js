import * as yup from 'yup';

export default class StoreSession {
  static getRules() {
    return yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });
  }
}
