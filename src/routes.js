const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


const TeacherController = require('./controllers/teacherController');
const AulasController = require('./controllers/aulasController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
//const { join } = require('./database/connections');
//const connection =  require('./database/connections');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/teachers', TeacherController.index);

routes.post("/teachers", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), TeacherController.create);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get("/aulas", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), AulasController.index);

routes.post("/aulas", AulasController.create);

routes.delete("/aulas/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), AulasController.delete);


module.exports = routes;