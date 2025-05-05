const userController = require('../application/controllers/userController');
const userService = require('../domain/services/userService');
const httpMocks = require('node-mocks-http');

jest.mock('../domain/services/userService'); 

describe('userController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getUsers', () => {
    it('debe retornar todos los usuarios', async () => {
      const users = [{ id: 1, email: 'test@example.com' }];
      userService.getAllUsers.mockResolvedValue(users);

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      await userController.getUsers(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(users);
    });

    it('debe manejar errores', async () => {
      userService.getAllUsers.mockRejectedValue(new Error('Error de base de datos'));

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      await userController.getUsers(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error de base de datos' });
    });
  });

  describe('getUserById', () => {
    it('debe retornar un usuario por ID', async () => {
      const user = { id: 1, email: 'john@example.com' };
      userService.getUserById.mockResolvedValue(user);

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await userController.getUserById(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(user);
    });

    it('debe retornar 404 si el usuario no existe', async () => {
      userService.getUserById.mockRejectedValue(new Error('Usuario no encontrado'));

      const req = httpMocks.createRequest({ params: { id: '999' } });
      const res = httpMocks.createResponse();

      await userController.getUserById(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Usuario no encontrado' });
    });
  });

  describe('getUserByEmail', () => {
    it('debe retornar un usuario por email', async () => {
      const user = { id: 1, email: 'john@example.com' };
      userService.getUserByEmail.mockResolvedValue(user);

      const req = httpMocks.createRequest({ params: { email: 'john@example.com' } });
      const res = httpMocks.createResponse();

      await userController.getUserByEmail(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(user);
    });

    it('debe retornar 404 si no se encuentra el email', async () => {
      userService.getUserByEmail.mockRejectedValue(new Error('Usuario no encontrado'));

      const req = httpMocks.createRequest({ params: { email: 'notfound@example.com' } });
      const res = httpMocks.createResponse();

      await userController.getUserByEmail(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Usuario no encontrado' });
    });
  });

  describe('createUser', () => {
    it('debe crear un usuario', async () => {
      const userInput = { email: 'new@example.com', password: '123' };
      const createdUser = { id: 1, email: 'new@example.com' };
      userService.createUser.mockResolvedValue(createdUser);

      const req = httpMocks.createRequest({ body: userInput });
      const res = httpMocks.createResponse();

      await userController.createUser(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(createdUser);
    });

    it('debe retornar 400 si el correo ya existe', async () => {
      userService.createUser.mockRejectedValue(new Error('Email already registered'));

      const req = httpMocks.createRequest({ body: { email: 'duplicate@example.com' } });
      const res = httpMocks.createResponse();

      await userController.createUser(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Email already registered' });
    });

    it('debe retornar 400 por otros errores', async () => {
      userService.createUser.mockRejectedValue(new Error('Otro error'));

      const req = httpMocks.createRequest({ body: { email: 'fail@example.com' } });
      const res = httpMocks.createResponse();

      await userController.createUser(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Error creating user' });
    });
  });

  describe('updateUser', () => {
    it('debe actualizar un usuario existente', async () => {
      const updatedUser = { id: 1, email: 'updated@example.com' };
      userService.updateUser.mockResolvedValue(updatedUser);

      const req = httpMocks.createRequest({
        params: { id: '1' },
        body: { email: 'updated@example.com' }
      });
      const res = httpMocks.createResponse();

      await userController.updateUser(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(updatedUser);
    });

    it('debe retornar 404 si el usuario no existe', async () => {
      userService.updateUser.mockRejectedValue(new Error('Usuario no encontrado'));

      const req = httpMocks.createRequest({ params: { id: '99' }, body: {} });
      const res = httpMocks.createResponse();

      await userController.updateUser(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Usuario no encontrado' });
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar un usuario', async () => {
      userService.deleteUser.mockResolvedValue();

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await userController.deleteUser(req, res);

      expect(res.statusCode).toBe(204);
      expect(res._getData()).toBe('');
    });

    it('debe retornar 404 si el usuario no se encuentra', async () => {
      userService.deleteUser.mockRejectedValue(new Error('Usuario no encontrado'));

      const req = httpMocks.createRequest({ params: { id: '404' } });
      const res = httpMocks.createResponse();

      await userController.deleteUser(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Usuario no encontrado' });
    });
  });
});
