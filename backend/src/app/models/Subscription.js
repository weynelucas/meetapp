import { Model } from 'sequelize';

export default class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'subscriptions',
      }
    );

    return this;
  }

  static associate({ User, Meetup }) {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: { name: 'userId', field: 'user_id' },
    });

    this.belongsTo(Meetup, {
      as: 'meetup',
      foreignKey: { name: 'meetupId', field: 'meetup_id' },
    });
  }
}
