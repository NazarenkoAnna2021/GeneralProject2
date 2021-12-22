const pgClient = require('../index');



exports.createUser = async (first_name, last_name, email, phone, adress) => {
  try {
    const user = await pgClient.query(`INSERT INTO users (first_name, last_name, email, phone, adress) VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${adress}')`);

    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await pgClient.query(`SELECT * FROM users WHERE id = ${id}`);
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getUsers = async () => {
  try {
    const user = await pgClient.query(`SELECT * FROM users`);
    return { result: user.rows };
  } catch (e) {
    return { error: e.message };
  }
};

exports.deleteUserById = async (id) => {
  try {
    const user = await pgClient.query(`Delete FROM users WHERE id = ${id}`);
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};