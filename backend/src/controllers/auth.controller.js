import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register 
export const registerUser = async (req, reply) => {
    try {
       const { name, email, password } = req.body;

       const existingUser = await User.findOne({ email });
         if (existingUser) {
        return reply.status(400).send({ message: 'User already exists' });
        }

         const hashedPassword = await bcrypt.hash(password, 10);

         const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
         return reply.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        return reply.status(500).send({ message: 'Server error' });
    }

};

// Login
export const loginUser = async (req, reply) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

if (!user) {
  return reply.code(400).send({ message: "Invalid credentials" });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return reply.code(400).send({ message: "Invalid credentials" });
}

const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

const userResponse = user.toObject();
delete userResponse.password;

return reply.send({
  message: "Login successful",
  token,
  user: userResponse
});

  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};