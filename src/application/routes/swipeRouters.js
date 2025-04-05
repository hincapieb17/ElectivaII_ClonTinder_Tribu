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
router.route('/v1/liked').get(authMiddleware, swipeController.getUsersWithLikeSwipe);

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
router.route('/v1/swipe/:id').post(authMiddleware, swipeController.createSwipe);

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
router.route('/v1/swipes/:id').get(authMiddleware, swipeController.getUserSwipes);

module.exports = router;