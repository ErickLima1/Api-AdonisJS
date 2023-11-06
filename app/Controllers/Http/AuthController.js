'use strict';

const User = use('App/Models/User');
const { userValidationRules, userValidationMessages } = use('App/Validators/UserValidation')
const { userValidationRulesEmail, userValidationEmailMessages } = use('App/Validators/User')
const { validate } = use('Validator');

class AuthController {
  async register({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password']);

      const validation = await validate(data, userValidationRules, userValidationMessages);

      if (validation.fails()) {
        return response.status(400).json({ message: validation.messages() });

      };

      const user = await User.create(data);

      return response.status(200).json({ message: 'Usuário cadastrado com sucesso', user });

    } catch (error) {
      console.log(error);
      return response.status(500).send({ message: 'Ocorreu Um Erro ao Registrar o Usuário' });
    };
  };

  async authenticate({ request, response, auth }) {
    try {
      const Hash = use('Hash');
      const { email, password } = request.all();
      const validation = await validate({ email, password }, userValidationRulesEmail, userValidationEmailMessages);
      const emailUser = await User.findBy('email', email);
  
      if (validation.fails()) {
        return response.status(400).json({ message: validation.messages() });
        
      };
      
      if (!emailUser) {
        return response.status(400).json({ message: 'Endereço de e-mail inválido. Verifique novamente.' });
      };

      const isPasswordValid = await Hash.verify(password, emailUser.password);
      
      if (!isPasswordValid) {
        return response.status(400).json({ message: 'Senha incorreta. Verifique novamente.' });
      };
      
      const token = await auth.attempt(email, password);
      const userName = emailUser.username;
  
      return {userName, token};
  
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    };
  };
  
};

module.exports = AuthController;
