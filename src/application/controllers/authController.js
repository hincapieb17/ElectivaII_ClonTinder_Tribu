const authService = require('../../domain/services/authService')

const authController = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const token = await authService.loginUser(email, password);

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = authController;
