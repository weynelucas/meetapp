import Sequelize, { Model } from 'sequelize';

export default class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        filename: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'file',
      }
    );

    return this;
  }
}
