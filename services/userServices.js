const pool = require("../config/db");

const getUserInfo = async () => {
  try {
    const user = await pool.query(
      `SELECT * FROM users
      WHERE user_email = $1`,
      [email]
    );
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUserInfo,
};
