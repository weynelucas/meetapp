import Meetup from '../models/Meetup';
import File from '../models/File';
import PaginationService from '../services/PaginationService';

class OrganizingController {
  async index(req, res) {
    const limit = 10;
    const { page = 1 } = req.query;

    const {
      results,
      count,
      nextPage,
      previousPage,
    } = await PaginationService.run(
      Meetup,
      {
        where: { userId: req.user.id },
        attributes: ['id', 'title', 'description', 'date', 'location'],
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'name', 'path', 'url'],
          },
        ],
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
}

export default new OrganizingController();
