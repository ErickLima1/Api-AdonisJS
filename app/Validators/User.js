const userValidationRulesEmail = {
    email: 'required|email',
    password: 'required',
  };
  
  const userValidationEmailMessages = {
    'email.required': 'O campo email é obrigatório.',
    'email.email': 'O campo email deve ser um endereço de email válido.',
    'email.unique': 'O email já está em uso.',
    'password.required': 'O campo password é obrigatório.',
  };
  
  module.exports = { userValidationRulesEmail, userValidationEmailMessages };
  