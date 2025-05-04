/**
 * @openapi
 * openapi: 3.0.0
 */

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const swipeController = require('../controllers/swipeController');
const router = express.Router();

/**
 * @swagger
 * /v1/user/swipe/{id}:
 * 
 *   post:
 *     summary: Registrar un like/dislike
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Swipe
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
 *                 type: boolean
 *                 enum: [true, false]
 *                 example: true
 *     responses:
 *       200:
 *         description: Like/dislike registrado correctamente
 */
router.route('/v1/swipe/:id').post(authMiddleware, swipeController.createSwipe);

/**
 * @swagger
 * /v1/swipes/{id}:
 * 
 *   get:
 *     summary: Obtener los swipes de un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Swipe
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
 *                     type: boolean
 *                     enum: [true, false]
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.route('/v1/swipes/:id').get(authMiddleware, swipeController.getUserSwipes);

router.route('/v1/deleteSwipe/:id').delete(authMiddleware, swipeController.deleteSwipe);

module.exports = router;