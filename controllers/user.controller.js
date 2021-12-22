const validators = require('./validation/index.js');
const userRepository = require('../database/repositories/users.repository');

const createNewUser = async (body) => {
  const { value, error } = validators.validate(body, validators.userValidator);
  if (error) return { error };

  const { error: dbError } = await userRepository.createUser(value.first_name, value.last_name, value.email, value.phone, value.adress);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};

const getUser = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError, result } = await userRepository.getUserById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const getAllUsers = async () => {
  const { error: dbError, result } = await userRepository.getUsers();

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const deleteUser = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError } = await userRepository.deleteUserById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

module.exports = { createNewUser, getUser, getAllUsers, deleteUser };
