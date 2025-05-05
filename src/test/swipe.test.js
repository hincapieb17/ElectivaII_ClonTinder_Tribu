// src/test/swipe.test.js

const httpMocks = require('node-mocks-http');
const swipeController = require('../application/controllers/swipeController');
const swipeService = require('../domain/services/swipeService');

jest.mock('../domain/services/swipeService');

describe('swipeController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('createSwipe', () => {
    it('debe registrar un swipe correctamente', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/v1/swipe/1',
        params: { id: '1' },
        body: { likedUserId: '2', swipe: true },
      });
      const res = httpMocks.createResponse();

      const result = { message: 'Es un match', match: true };
      swipeService.createValidate.mockResolvedValue(result);

      await swipeController.createSwipe(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(result);
    });

    it('debe manejar errores al registrar swipe', async () => {
      swipeService.createValidate.mockRejectedValue(new Error('Error de validación'));

      const req = httpMocks.createRequest({
        params: { id: '1' },
        body: { likedUserId: '2', swipe: false },
      });
      const res = httpMocks.createResponse();

      await swipeController.createSwipe(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Error de validación' });
    });
  });

  describe('getUserSwipes', () => {
    it('debe retornar swipes del usuario', async () => {
      const swipes = [{ likedUserId: 2, swipe: true, date: '2024-01-01T00:00:00Z' }];
      swipeService.getUserSwipes.mockResolvedValue(swipes);

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await swipeController.getUserSwipes(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(swipes);
    });

    it('debe manejar errores al obtener swipes', async () => {
      swipeService.getUserSwipes.mockRejectedValue(new Error('Error interno'));

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await swipeController.getUserSwipes(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error interno' });
    });
  });

  describe('deleteSwipe', () => {
    it('debe eliminar un swipe', async () => {
      swipeService.deleteSwipe.mockResolvedValue();

      const req = httpMocks.createRequest({ params: { id: '123' } });
      const res = httpMocks.createResponse();

      await swipeController.deleteSwipe(req, res);

      expect(res.statusCode).toBe(204);
      expect(res._getData()).toBe('');
    });

    it('debe manejar error al eliminar swipe', async () => {
      swipeService.deleteSwipe.mockRejectedValue(new Error('Swipe no encontrado'));

      const req = httpMocks.createRequest({ params: { id: '999' } });
      const res = httpMocks.createResponse();

      await swipeController.deleteSwipe(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Swipe no encontrado' });
    });
  });
});
