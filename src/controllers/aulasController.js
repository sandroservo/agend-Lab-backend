const connection = require('../database/connections');


module.exports = {
    /* Rota de listagem de Casos*/
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('aulas').count();

        const aulas = await connection('aulas')
            .join('teachers', 'teachers.id', '=', 'aulas.teacher_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'aulas.*',
                'teachers.name',
                'teachers.email',
                'teachers.whatsapp',
                'teachers.city',
                'teachers.uf']);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(aulas);
    },

    /* Rota de criação de Casos*/
    async create(req, res) {
        const { subject, prof, curso, description, data_aula,hora_aula } = req.body;
        const teacher_id = req.headers.authorization;

        const [id] = await connection('aulas').insert({
            subject,
            prof,
            curso,
            description,
            data_aula,
            hora_aula,
            teacher_id,
        });

        return res.json({ id });
    },

    /* Rota de apagar Casos*/
    async delete(req, res) {
        const { id } = req.params;
        const teacher_id = req.headers.authorization;

        const aula = await connection('aulas')
            .where('id', id)
            .select('teacher_id')
            .first();

        if (aula.teacher_id !== teacher_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }
        await connection('aulas').where('id', id).delete();

        return res.status(204).send();
    }
};