import { isBefore } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const limit = 10;
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'title', 'description', 'date'],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const { id, title, description, date } = await Meetup.create({
      ...req.data,
      userId: req.user.id,
    });
    return res.status(201).json({
      id,
      title,
      description,
      date,
    });
  }

  async update(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Check if meetup exists
     */
    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found.' });
    }

    /**
     * Check if logged user is owner
     */
    if (meetup.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You don't have permission to update this meetup." });
    }

    /**
     * Check if meetup already happened
     */
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(403)
        .json({ error: 'You cannot change meetups that already happened.' });
    }

    const { id, title, description, date } = await meetup.update(req.data);
    return res.json({
      id,
      title,
      description,
      date,
    });
  }
}

export default new MeetupController();
