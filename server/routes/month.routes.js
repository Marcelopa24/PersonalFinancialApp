const MonthController = require("../controllers/month.controller");
const UserController = require("../controllers/user.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.get('/api/months',  MonthController.get_all);
    app.post('/api/months',  MonthController.create_month);
    app.get('/api/months/:id', MonthController.get_month);
    app.put('/api/months/:id', MonthController.update_month);
    app.delete('/api/months/:id', MonthController.delete_month);

    app.get('/api/users/:id',  UserController.get_user);/*no tener que crear controlador ni ruta par aobtener nombres NUEVO*/
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
}