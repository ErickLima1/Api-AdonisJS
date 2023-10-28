const userValidationRules = {
  username: 'required|unique:users',
  email: 'required|email|unique:users',
  password: 'required',
};

const userValidationMessages = {
  'username.required': 'O campo username é obrigatório.',
  'username.unique': 'Username Já em Uso',
  'email.required': 'O campo email é obrigatório.',
  'email.email': 'O campo email deve ser um endereço de email válido.',
  'email.unique': 'O email já está em uso.',
  'password.required': 'O campo password é obrigatório.',
};

module.exports = { userValidationRules, userValidationMessages };
