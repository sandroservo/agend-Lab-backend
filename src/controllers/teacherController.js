const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connections');


module.exports = {

/** Rota de listagem */
    async index(req, res) {
        const teachers = await connection('teachers').select('*');

        return res.json(teachers);
    },

/** Rota de Criação */
    async create(req, res) {

        const { name, email, whatsapp, city, uf } = req.body;

        const id = generateUniqueId();

        await connection('teachers').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return res.json({ id });

    }
};