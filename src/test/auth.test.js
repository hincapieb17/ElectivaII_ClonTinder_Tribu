const authService = require('../domain/services/authService');
const userService = require('../domain/services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../domain/services/userService');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('authService.loginUser', () => {
    it('debe retornar el usuario y token si las credenciales son validas', async () => {
        const email = 'test@example.com';
        const password = '123456';
        const user = { id: 1, email, password: 'hashed' };

        userService.getUserByEmail.mockResolvedValue(user);
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('fake-jwt-token');

        const result = await authService.loginUser(email, password);

        expect(result).toHaveProperty('user', user);
        expect(result).toHaveProperty('token', 'fake-jwt-token');
    });

    it('debe lanzar error si el usuario no existe', async () => {
        userService.getUserByEmail.mockResolvedValue(null);

        await expect(authService.loginUser('no@existe.com', '1234'))
            .rejects
            .toThrow('Credenciales inválidas');
    });

    it('debe lanzar error si la contraseña no coincide', async () => {
        const email = 'test@example.com';
        const password = 'wrongpassword';
        const user = { id: 1, email, password: 'hashed' };

        userService.getUserByEmail.mockResolvedValue(user);
        bcrypt.compareSync.mockReturnValue(false);

        await expect(authService.loginUser(email, password))
            .rejects
            .toThrow('Credenciales inválidas');
    });
});
