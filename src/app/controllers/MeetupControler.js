import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const limit = 10;
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      attributes: ['id', 'title', 'description', 'date'],
      include: [
        {
          model: User,
          as: 'user',
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
