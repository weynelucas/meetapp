module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('meetup', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('meetup', 'location');
  },
};
