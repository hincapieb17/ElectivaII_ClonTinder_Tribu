const matchController = require('../application/controllers/matchController');
const matchService = require('../domain/services/matchService');
const httpMocks = require('node-mocks-http');

jest.mock('../domain/services/matchService');

describe('matchController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getAllMatches', () => {
    it('debe retornar todos los matches', async () => {
      const matches = [
        { user1: { _id: '1', firstName: 'User1' }, user2: { _id: '2', firstName: 'User2' }, swipe: true },
        { user1: { _id: '3', firstName: 'User3' }, user2: { _id: '4', firstName: 'User4' }, swipe: false }
      ];

      matchService.getAllMatches.mockResolvedValue(matches);

      const req = httpMocks.createRequest({
        method: 'GET',
      });

      const res = httpMocks.createResponse();

      await matchController.getAllMatches(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(matches);
    });

    it('debe manejar error al obtener los matches', async () => {
      matchService.getAllMatches.mockRejectedValue(new Error('Error al obtener los matches'));

      const req = httpMocks.createRequest({
        method: 'GET',
      });

      const res = httpMocks.createResponse();

      await matchController.getAllMatches(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error al obtener los matches' });
    });
  });

  describe('createMatch', () => {
    it('debe crear un nuevo match', async () => {
      const newMatch = {
        user1: '1',
        user2: '2',
        swipe: true
      };

      matchService.createMatch.mockResolvedValue(newMatch);

      const req = httpMocks.createRequest({
        method: 'POST',
        body: newMatch,
      });

      const res = httpMocks.createResponse();

      await matchController.createMatch(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(newMatch);
    });

    it('debe manejar error si ya existe un match', async () => {
      matchService.createMatch.mockRejectedValue(new Error('Ya existe un match entre estos dos usuarios'));

      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          user1: '1',
          user2: '2',
          swipe: true
        },
      });

      const res = httpMocks.createResponse();

      await matchController.createMatch(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Ya existe un match entre estos dos usuarios' });
    });
  });

  describe('deleteMatch', () => {
    it('debe eliminar un match correctamente', async () => {
      const matchId = '123';

      matchService.deleteMatch.mockResolvedValue({ _id: matchId });

      const req = httpMocks.createRequest({
        method: 'DELETE',
        params: { id: matchId },
      });

      const res = httpMocks.createResponse();

      await matchController.deleteMatch(req, res);

      expect(res.statusCode).toBe(204);
    });

    it('debe manejar error al eliminar un match', async () => {
      const matchId = '123';

      matchService.deleteMatch.mockRejectedValue(new Error('Match no encontrado'));

      const req = httpMocks.createRequest({
        method: 'DELETE',
        params: { id: matchId },
      });

      const res = httpMocks.createResponse();

      await matchController.deleteMatch(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Match no encontrado' });
    });
  });

  describe('getUserMatches', () => {
    it('debe obtener todos los matches de un usuario', async () => {
      const userMatches = [
        { user1: { _id: '1', firstName: 'User1' }, user2: { _id: '2', firstName: 'User2' }, swipe: true }
      ];

      matchService.getUserMatches.mockResolvedValue(userMatches);

      const req = httpMocks.createRequest({
        method: 'GET',
        params: { id: '1' },
      });

      const res = httpMocks.createResponse();

      await matchController.getUserMatches(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(userMatches);
    });

    it('debe manejar error al obtener los matches de un usuario', async () => {
      matchService.getUserMatches.mockRejectedValue(new Error('Error al obtener los matches del usuario'));

      const req = httpMocks.createRequest({
        method: 'GET',
        params: { id: '1' },
      });

      const res = httpMocks.createResponse();

      await matchController.getUserMatches(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error al obtener los matches del usuario' });
    });
  });
});
