import { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
      randomBytes(16, (err, buff) => {
        if (err) cb(err);

        cb(null, buff.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
