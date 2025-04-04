/**
 * @openapi
 * openapi: 3.0.0
 */
const express = require('express');
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   address:
 *                     type: string
 *                     example: 123 Main St, Anytown, CA 12345
 *                   phoneNumber:
 *                     type: string
 *                     example: 555-123-4567
 */
router.route('/v1/users').get(authMiddleware, userController.getUsers);

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 address:
 *                   type: string
 *                   example: 123 Main St, Anytown, CA 12345
 *                 phoneNumber:
 *                   type: string
 *                   example: 555-123-4567
 */
router.route('/v1/user/:id').get(authMiddleware, userController.getUserById);

/**
 * @swagger
 * /v1/createUser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: new.user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               address:
 *                 type: string
 *                 example: 123 Main St, Anytown, CA 12345
 *               phoneNumber:
 *                 type: string
 *                 example: 555-123-4567
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.route('/v1/createUser').post(authMiddleware, validateUser, userController.createUser);

/**
 * @swagger
 * /v1/updateUser/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updated.user@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               address:
 *                 type: string
 *                 example: 456 Updated St, New City, NY 67890
 *               phoneNumber:
 *                 type: string
 *                 example: 555-987-6543
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */
router.route('/v1/updateUser/:id').put(authMiddleware, validateUser, userController.updateUser);

/**
 * @swagger
 * /v1/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.route('/v1/deleteUser/:id').delete(authMiddleware, userController.deleteUser);

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Iniciar sesión y obtener token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: clave123
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente, devuelve el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.route('/v1/login').post(authController.loginUser);

/**
 * @swagger
 * /v1/users/liked:
 *   get:
 *     summary: Obtener usuarios con "like"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios con "like" obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 */
router.route('/v1/users/liked').get(authMiddleware, userController.getUsersWithLikeSwipe);

/**
 * @swagger
 * /v1/user/swipe/{id}:
 *   post:
 *     summary: Registrar un like/dislike
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               swipe:
 *                 type: string
 *                 enum: [like, dislike]
 *                 example: like
 *     responses:
 *       200:
 *         description: Like/dislike registrado correctamente
 */
router.route('/v1/user/swipe/:id').post(authMiddleware, userController.createSwipe);

/**
 * @swagger
 * /v1/user/{id}/swipes:
 *   get:
 *     summary: Obtener los swipes de un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Swipes obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   likedUserId:
 *                     type: integer
 *                   swipe:
 *                     type: string
 *                     enum: [like, dislike]
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.route('/v1/user/:id/swipes').get(authMiddleware, userController.getUserSwipes);

module.exports = router;
