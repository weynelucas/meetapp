// eslint-disable-next-line no-unused-vars
import { Model, FindOptions } from 'sequelize';

class PaginationService {
  /**
   * @param {typeof Model} model
   * @param {FindOptions} query
   */
  async run(model, query, { page, pageSize }) {
    const [count, results] = await Promise.all([
      model.count({ where: query.where }),
      model.findAll({
        ...query,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),
    ]);

    const hasPreviousPage = page > 1;
    const hasNextPage = page * pageSize <= count;

    return {
      results,
      count,
      hasPreviousPage,
      previousPage: hasPreviousPage ? Number(page) - 1 : null,
      hasNextPage,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    };
  }
}

export default new PaginationService();
