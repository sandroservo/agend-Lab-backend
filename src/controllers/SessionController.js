const connection = require('../database/connections');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const teacher = await connection('teachers')
      .where('id', id)
      .select('name')
      .first();

    if (!teacher) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(teacher);
  }
}