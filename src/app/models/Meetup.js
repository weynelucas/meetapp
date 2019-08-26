import Sequelize, { Model } from 'sequelize';

export default class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'meetup',
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
