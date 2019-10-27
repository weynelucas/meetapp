import bcrypt from 'bcrypt';
import Sequelize, { Model } from 'sequelize';
import config from '../../config/auth';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'users',
        hooks: {
          beforeSave: user => {
            if (user.password && user.changed('password')) {
              user.password = bcrypt.hashSync(user.password, config.rounds);
            }
          },
        },
      }
    );

    return this;
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
