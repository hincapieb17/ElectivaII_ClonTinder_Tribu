const express = require('express');
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

//Rutas con autentificación.
router.route('/v1/users').get(authMiddleware, userController.getUsers);
router.route('/v1/user/:id').get(authMiddleware, userController.getUserById);

// Validación antes de crear o actualizar un usuario.
router.route('/v1/createUser').post(authMiddleware, validateUser, userController.createUser);
router.route('/v1/updateUser/:id').put(authMiddleware, validateUser ,userController.updateUser);

// Eliminar usuario protegido con autenticación.
router.route('/v1/deleteUser/:id').delete(authMiddleware ,userController.deleteUser);

// Iniciar sesión y obtener el token
router.route('/v1/login').post(authController.loginUser);

module.exports = router;