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
 * /v1/matches:
 *   get:
 *     summary: Obtener todos los matches
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Matches
 *     responses:
 *       200:
 *         description: Lista de matches obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get('/v1/matches', authMiddleware, matchController.getAllMatches);

/**
 * @swagger
 * /v1/matches/{id}:
 *   get:
 *     summary: Obtener un match por ID
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
 *         description: Match encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Match no encontrado
 */
router.get('/v1/matches/:id', authMiddleware, matchController.getMatchById);

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
 *                 type: string
 *                 enum: [like, dislike]
 *                 example: like
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