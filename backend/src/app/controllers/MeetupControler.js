import { parseISO, isValid, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';
import PaginationService from '../services/PaginationService';

class MeetupController {
  async index(req, res) {
    const where = {};
    const limit = 10;
    const { page = 1, date } = req.query;

    if (date && isValid(new Date(date))) {
      const parsedDate = parseISO(date);
      where.date = {
        [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
      };
    }

    const {
      count,
      previousPage,
      nextPage,
      results,
    } = await PaginationService.run(
      Meetup,
      {
        where,
        attributes: ['id', 'title', 'description', 'date', 'location'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'name', 'path', 'url'],
          },
        ],
        order: ['date', 'id'],
      },
      { page, pageSize: limit }
    );

    return res.json({
      count,
      previousPage,
      nextPage,
      results,
    });
  }

  async store(req, res) {
    const meetup = await Meetup.create({
      ...req.data,
      userId: req.user.id,
    });

    const { id, title, description, date, location, bannerId } = meetup;
    const { name, path, url } = await meetup.getBanner();

    return res.status(201).json({
      id,
      title,
      description,
      date,
      location,
      bannerId,
      banner: { name, path, url },
    });
  }

  async update(req, res) {
    const meetup = await req.meetup.update(req.data);

    const { id, title, description, date, location, bannerId } = meetup;
    const { name, path, url } = await meetup.getBanner();

    return res.json({
      id,
      title,
      description,
      date,
      bannerId,
      location,
      banner: { name, path, url },
    });
  }

  async delete(req, res) {
    await req.meetup.destroy();

    return res.status(204).json();
  }
}

export default new MeetupController();
