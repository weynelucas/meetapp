module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscription', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' },
        allowNull: false,
      },
      meetup_id: {
        type: Sequelize.INTEGER,
        references: { model: 'meetup', key: 'id' },
        allowNull: false,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('subscription');
  },
};
