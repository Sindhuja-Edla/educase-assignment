const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, company, agency } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({
      fullName,
      phoneNumber,
      email,
      password,
      company,
      agency,
    });

    res.status(201).json({ message: 'Account created successfully', token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ 
      message: 'You have logged in successfully!', 
      token: generateToken(user._id),
      name: user.fullName, 
      email: user.email  
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
