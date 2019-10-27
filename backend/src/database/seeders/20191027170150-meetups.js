const dateFns = require('date-fns');

module.exports = {
  up: async queryInterface => {
    const randomChoice = arr => arr[Math.floor(arr.length * Math.random())];

    const today = dateFns.startOfDay(new Date());
    const daysOffset = [-2, -1, 0, 1, 2, 3, 5, 11];
    const hours = [8, 10, 14, 18, 20, 22];
    const techs = [
      'Node JS',
      'React JS',
      'React Native',
      'Angular JS',
      'Vue JS',
      'Adonis JS',
    ];
    const locations = [
      'Austin, Texas',
      'San Diego, California',
      'Rua Guilherme Gembala, 260',
      'Rua Visconde de Mauá, 1940 - Meireles',
    ];

    const files = (await queryInterface.sequelize.query(
      'SELECT id FROM files;'
    ))[0];

    const users = (await queryInterface.sequelize.query(
      'SELECT id FROM users;'
    ))[0];

    const meetups = users.reduce((currentMeetups, { id: user_id }) => {
      const dates = daysOffset.reduce((currentDates, offset) => {
        const date = dateFns.addDays(today, offset);

        return [
          ...currentDates,
          ...hours.map(hour => dateFns.setHours(date, hour)),
        ];
      }, []);

      const meetupsFromUser = dates.map(date => {
        const tech = randomChoice(techs);
        const location = randomChoice(locations);
        const { id: banner_id } = randomChoice(files);

        return {
          title: `Meetup de ${tech}`,
          description: `Evento que reúne a comunidade de ${tech} a fim de compartilhar conhecimento.`,
          date,
          location,
          user_id,
          banner_id,
          created_at: today,
          updated_at: today,
        };
      });

      return [...currentMeetups, ...meetupsFromUser];
    }, []);

    return queryInterface.bulkInsert('meetups', meetups, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('meetups', null, {});
  },
};
