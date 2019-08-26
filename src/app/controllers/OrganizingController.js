import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizingController {
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
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
