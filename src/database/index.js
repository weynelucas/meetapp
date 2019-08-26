import Sequelize from 'sequelize';
import config from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.sequelize = new Sequelize(config);
    models.map(model => model.init(this.sequelize));
  }
}

export default new Database();
