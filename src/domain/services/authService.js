const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userService = require('./userService');

const authService = {

    loginUser: async (email, password) => {

        const user = await userService.getUserByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
    
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }
    
        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'clave_secreta', 
            { expiresIn: '1h' }
        );

        const data= {
            user: user,
            token: token
        };

        return data;
        
    }
}

module.exports = authService;