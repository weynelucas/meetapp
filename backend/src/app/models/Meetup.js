import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

export default class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        date: Sequelize.DATE,
        location: Sequelize.STRING,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
      },
      {
        sequelize,
        tableName: 'meetups',
      }
    );

    return this;
  }

  static associate({ User, File }) {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: { name: 'userId', field: 'user_id' },
    });

    this.belongsTo(File, {
      as: 'banner',
      foreignKey: { name: 'bannerId', field: 'banner_id' },
    });
  }
}
