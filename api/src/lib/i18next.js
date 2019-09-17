import i18next from 'i18next';
import { LanguageDetector, handle } from 'i18next-express-middleware';
import Backend from 'i18next-node-fs-backend';
import { resolve } from 'path';

class I18n {
  constructor() {
    i18next
      .use(Backend)
      .use(LanguageDetector)
      .init({
        fallbackLng: 'en',
        preload: ['en', 'pt-BR'],
        backend: {
          loadPath: resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
          addPath: resolve(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
        },
      });
  }

  handle() {
    return handle(i18next);
  }
}

export default new I18n();
