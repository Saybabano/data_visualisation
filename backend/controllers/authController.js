const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  console.log(name,password,email)
  try {
    if (!name || !password || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (existingUser.rows.length > 0) {
      console.log("email already exit")
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const userResult = await pool.query(
      `SELECT id, name, password FROM users WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ user_name: user.name });
  } catch (error) {
    res.status(501).json({ message: 'Server error' });
  }
};


module.exports= { registerUser, loginUser};
