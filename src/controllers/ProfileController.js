const connection =  require('../database/connections');

module.exports = {
    async index(req,res) {
        const teacher_id = req.headers.authorization;

        const aulas = await connection('aulas')
        .where('teacher_id', teacher_id)
        .select('*');
        return res.json(aulas);
    }
}