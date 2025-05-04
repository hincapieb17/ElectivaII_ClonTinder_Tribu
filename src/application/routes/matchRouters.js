/**
 * @openapi
 * openapi: 3.0.0
 */

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const matchController = require('../controllers/matchController');
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del match
 *         user1:
 *           $ref: '#/components/schemas/User'
 *         user2:
 *           $ref: '#/components/schemas/User'
 *         swipe:
 *           type: boolean
 *           enum:
 *             - true
 *             - false
 *           description: Acción que generó el match
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 * 
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña encriptada
 *         age:
 *           type: integer
 *           description: Edad del usuario
 *         gender:
 *           type: string
 *           description: Género del usuario
 *         location:
 *           type: string
 *           description: Ubicación del usuario
 *         profilePicture:
 *           type: string
 *           format: uri
 *           description: URL de la foto de perfil
 *         preferences:
 *           type: object
 *           properties:
 *             genders:
 *               type: array
 *               items:
 *                 type: string
 *             min_age:
 *               type: integer
 *             max_age:
 *               type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
router.get('/v1/matches', authMiddleware, matchController.getAllMatches);

/**
 * @swagger
 * /v1/matches:
 *   post:
 *     summary: Crear un nuevo match
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Matches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user1
 *               - user2
 *               - swipe
 *             properties:
 *               user1:
 *                 type: string
 *                 format: ObjectId
 *               user2:
 *                 type: string
 *                 format: ObjectId
 *               swipe:
 *                 type: boolean
 *                 enum: [true, false]
 *                 example: true
 *     responses:
 *       201:
 *         description: Match creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/v1/matches', authMiddleware, matchController.createMatch);

/**
 * @swagger
 * /v1/matches/{id}:
 *   delete:
 *     summary: Eliminar un match por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Matches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Match eliminado correctamente
 *       404:
 *         description: Match no encontrado
 */
router.delete('/v1/matches/:id', authMiddleware, matchController.deleteMatch);

/**
 * @swagger
 * /v1/matches/user/{id}:
 *   get:
 *     summary: Obtener matches de un usuario
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Matches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de matches del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get('/v1/matches/user/:id', authMiddleware, matchController.getUserMatches);

module.exports = router;