import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const { id, title, description, date } = await Meetup.create(req.data);
    return res.status(201).json({
      id,
      title,
      description,
      date,
    });
  }
}

export default new MeetupController();
