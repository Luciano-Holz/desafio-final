const UserService = require('../service/AuthenticatorService');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');


class UserController {
    async auth(req, res) {
        
        try {
            const result = await UserService.auth(req.body);
            if(!result) {
                return res.status(404).json('Not found authentication')
            }
            
            const { _id, nome, cpf, data_nascimento, senha, createdAt, __v, ...authentication } = result.toObject();
            const  generateToken = (params = {}) => {
                return jwt.sign(params, authConfig.secret, { expiresIn: 86400});
            }
            return res.status(201)
                .json({authentication, token: generateToken({id: authentication._id, email: authentication.email, habilitado: authentication.habilitado})});

        } catch (error) {
            return error;
        }
       
    }
}

module.exports = new UserController();