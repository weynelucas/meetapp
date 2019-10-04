module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('meetup', 'banner_id', {
      type: Sequelize.INTEGER,
      references: { model: 'file', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('meetup', 'banner_id');
  },
};
