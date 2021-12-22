const URL = require('url');

const { CREATE_USER, GET_USER, GET_ALL_USERS, DELETE_USER } = require('../constants/routes');
const { createNewUser, getUser, getAllUsers, deleteUser } = require('../controllers/user.controller');

const router = async ({ req, res, body }) => {
  let result, error;
  const { method, url } = req;
  const { query, pathname } = URL.parse(url, true);
  switch (true) {
    case method === 'POST' && pathname === CREATE_USER:
      ({ result, error } = await createNewUser(body));
      break;
    case method === 'GET' && pathname === GET_USER:
      ({ result, error } = await getUser(query));
      break;
    case method === 'GET' && pathname === GET_ALL_USERS:
      ({ result, error } = await getAllUsers());
      break;
    case method === 'DELETE' && pathname === DELETE_USER:
      ({ result, error } = await deleteUser(query));
      break;
    
    default:
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Route Not Found' }));
  }

  if (error) {
    res.statusCode = error.status;
    return res.end(JSON.stringify({ error }));
  }
  res.statusCode = result.status;
  res.end(JSON.stringify(result.data));
};

module.exports = { router };
