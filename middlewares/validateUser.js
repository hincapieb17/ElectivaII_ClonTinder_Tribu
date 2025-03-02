const {body, validationResult } =require('express-validator');

const validateUser = [
    body('firstName').notEmpty().withMessage('first name required'),
    body('lastName').notEmpty().withMessage('last name required'),
    body('email').isEmail().withMessage('email required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;