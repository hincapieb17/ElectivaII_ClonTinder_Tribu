/**
 * @openapi
 * openapi: 3.0.0
 */

const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /v1/messages:
 *   post:
 *     summary: Enviar un mensaje a otro usuario
 *     tags:
 *       - Mensajes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - content
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: ID del usuario receptor
 *               content:
 *                 type: string
 *                 description: Contenido del mensaje
 *     responses:
 *       201:
 *         description: Mensaje enviado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.route('/v1/messages/:id').post(authMiddleware, messageController.saveMessage);

/**
 * @swagger
 * /v1/messages/{userId}:
 *   get:
 *     summary: Obtener todos los mensajes entre el usuario autenticado y otro usuario
 *     tags:
 *       - Mensajes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del otro usuario de la conversación
 *     responses:
 *       200:
 *         description: Mensajes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Mensajes no encontrados
 *       500:
 *         description: Error del servidor
 */
router.route('/v1/messages/:sender_id/:receiver_id').get(authMiddleware, messageController.getMessages);

module.exports = router;