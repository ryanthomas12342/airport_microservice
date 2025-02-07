const { Logger } = require("../config/index");
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;

    // Logger.error("Something went wrong in the crud repo :create ");
    // throw err;
  }
  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    return response;
  }
  async get(data) {
    const response = await this.model.findByPK(data);
    return response;
  }
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }
  async update(data, id) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
  }
}

module.exports = CrudRepository;
