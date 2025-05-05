const messageController = require('../application/controllers/messageController');
const chatService = require('../domain/services/chatService');
const httpMocks = require('node-mocks-http');

jest.mock('../domain/services/chatService');

describe('messageController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('saveMessage', () => {
    it('debe guardar un mensaje exitosamente', async () => {
      const message = {
        sender_id: '1',
        receiver_id: '2',
        content: 'Hola'
      };

      chatService.saveMessage.mockResolvedValue(message);

      const req = httpMocks.createRequest({
        method: 'POST',
        params: { id: '1' },
        body: { receiver_id: '2', content: 'Hola' }
      });

      const res = httpMocks.createResponse();

      await messageController.saveMessage(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(message);
    });

    it('debe manejar errores al guardar el mensaje', async () => {
      chatService.saveMessage.mockRejectedValue(new Error('Error al guardar mensaje'));

      const req = httpMocks.createRequest({
        method: 'POST',
        params: { id: '1' },
        body: { receiver_id: '2', content: 'Hola' }
      });

      const res = httpMocks.createResponse();

      await messageController.saveMessage(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error al guardar mensaje' });
    });
  });

  describe('getMessages', () => {
    it('debe retornar todos los mensajes entre dos usuarios', async () => {
      const messages = [
        { sender_id: '1', receiver_id: '2', content: 'Hola' },
        { sender_id: '2', receiver_id: '1', content: 'Hola de vuelta' }
      ];

      chatService.getMessages.mockResolvedValue(messages);

      const req = httpMocks.createRequest({
        method: 'GET',
        params: { sender_id: '1', receiver_id: '2' }
      });

      const res = httpMocks.createResponse();

      await messageController.getMessages(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(messages);
    });

    it('debe manejar errores si no se encuentran mensajes', async () => {
      chatService.getMessages.mockRejectedValue(new Error('Mensajes no encontrados'));

      const req = httpMocks.createRequest({
        method: 'GET',
        params: { sender_id: '1', receiver_id: '2' }
      });

      const res = httpMocks.createResponse();

      await messageController.getMessages(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Mensajes no encontrados' });
    });
  });
});
