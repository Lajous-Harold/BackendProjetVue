const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  async create(req, res) {
    console.log(req.body);
    try {
      const user = await User.create({ ...req.body });
      return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid Data" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Data" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
        },
        "ceci est une cle",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = UserController;
