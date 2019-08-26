import { parseISO, isValid, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const filters = {};
    const limit = 10;
    const { page = 1, date } = req.query;

    /**
     * Filter meetups by date
     */
    if (date && isValid(new Date(date))) {
      const parsedDate = parseISO(date);
      filters.where = {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      };
    }

    const meetups = await Meetup.findAll({
      ...filters,
      attributes: ['id', 'title', 'description', 'date'],
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const meetup = await Meetup.create({
      ...req.data,
      userId: req.user.id,
    });

    const { id, title, description, date, bannerId } = meetup;
    const { name, path, url } = await meetup.getBanner();

    return res.status(201).json({
      id,
      title,
      description,
      date,
      bannerId,
      banner: { name, path, url },
    });
  }

  async update(req, res) {
    const meetup = await req.meetup.update(req.data);

    const { id, title, description, date, bannerId } = meetup;
    const { name, path, url } = await meetup.getBanner();

    return res.json({
      id,
      title,
      description,
      date,
      bannerId,
      banner: { name, path, url },
    });
  }

  async delete(req, res) {
    await req.meetup.destroy();

    return res.status(204).json();
  }
}

export default new MeetupController();
