import { Model } from 'sequelize';

export default class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'subscription',
      }
    );

    return this;
  }

  static associate({ User, Meetup }) {
    this.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'user_id' },
    });

    this.belongsTo(Meetup, {
      foreignKey: { name: 'meetupId', field: 'meetup_id' },
    });
  }
}
