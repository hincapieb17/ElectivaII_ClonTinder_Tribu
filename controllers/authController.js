const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

const authController = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            
            const user = userService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Generar el token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                'clave_secreta', 
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = authController;
