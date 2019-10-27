const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    const defaultPassword = await bcrypt.hashSync('foobar', 8);

    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Diego Fernandes',
          email: 'diego@rocketseat.com.br',
          password: defaultPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cláudio Orlandi',
          email: 'claudio.orlandi@rocketseat.com.br',
          password: defaultPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Robson Marques',
          email: 'robson.marques@rocketseat.com.br',
          password: defaultPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'João Pedro',
          email: 'joao.pedro@rocketseat.com.br',
          password: defaultPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
