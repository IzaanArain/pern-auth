const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { jwtGenerator } = require("../utils/jwtGenerator");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ status: 0, message: "All fields required!" });
    }
    const user = await pool.query(
      `SELECT * FROM users
      WHERE user_email = $1`,
      [email]
    );
    if (user.rows.length !== 0) {
      return res.status(401).send({
        status: 0,
        message: "User already exists",
      });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `INSERT INTO users (user_name, user_email, user_password)
        VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );
    const token = jwtGenerator(newUser.rows[0]);
    res.json({
      status: 1,
      message: "user successfully registered",
      data: newUser.rows[0],
      token,
    });
  } catch (err) {
    console.error({
      status: 0,
      message: "Something went wrong",
      err: err.message,
    });
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ status: 0, message: "All fields required!" });
    }
    const user = await pool.query(
      `SELECT * FROM users
        WHERE user_email = $1`,
      [email]
    );
    if (user.rows.length === 0) {
      return res.status(404).send({
        status: 0,
        message: "User does not exist",
      });
    }
    const match = await bcrypt.compare(password, user.rows[0].user_password);

    if (!match) {
      return res.status(401).send({
        status: 0,
        message: "Invalid password!",
      });
    }
    const token = jwtGenerator(user.rows[0]);
    res.json({
      status: 1,
      message: "user successfully logged in",
      data: user.rows[0],
      token,
    });
  } catch (err) {
    console.error({
      status: 0,
      message: "Something went wrong",
      err: err.message,
    });
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};

const profile = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ status: 0, message: "User id required!" });
    };
    const user = await pool.query(
        `SELECT user_id, user_name, user_email FROM users
          WHERE user_id = $1`,
        [id]
      );
      if (user.rows.length === 0) {
        return res.status(404).send({
          status: 0,
          message: "User does not exist",
        });
      }
      res.json({
        status: 1,
        message: "user profile fetched successfully",
        data: user.rows[0],
      });
  } catch (err) {
    console.error({
      status: 0,
      message: "Something went wrong",
      err: err.message,
    });
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
  profile
};
