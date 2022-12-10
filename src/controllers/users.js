const User = require('../models/Users');
const jwt = require('jsonwebtoken');

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user && !user.isDeleted) {
      if (user.password === req.body.password) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.TOKEN_SECRET,
          // { expiresIn: "1d" }
        );
        const updatedUser = await User.findOneAndUpdate(
          { name: req.body.name },
          { token: token },
          { new: true,}
        );
        res.status(200).json({
          token: updatedUser.token,
          message: "OK",
          id: user._id,
          name: user.name,
          type: user.type,
        });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
    try {
        User.updateOne({ _id: req.params.id }, req.body, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else if (result.matchedCount === 0) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User updated" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isDeleted = true;
      await user.save();
      res.status(200).json({message: "User deleted"});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isDeleted = false;
      await user.save();
      res.status(200).json({message: "User activated"});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};