import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const limit = 10;
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'title', 'description', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'filename'],
        },
      ],
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
    const { id, title, description, date } = await req.meetup.update(req.data);

    return res.json({
      id,
      title,
      description,
      date,
    });
  }

  async delete(req, res) {
    await req.meetup.destroy();

    return res.status(204).json();
  }
}

export default new MeetupController();
