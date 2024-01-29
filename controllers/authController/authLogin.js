import userModel from '../../models/userModel.js';
import { validateAuth } from '../../helpers/validation/authValidation.js';
import { comparePasswords } from '../../helpers/passwordHelper/hashPasswords.js';
import { generateToken } from '../../helpers/token/generateToken.js';

// Admin login
export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data
    const validationResult = validateAuth(req.body);

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Check the user's role
    if (user.role === 'admin') {
      // Admin login, generate admin token
      const adminToken = generateToken(user._id);
      return res.status(200).json({ message: 'Admin logged in successfully', token: adminToken, role: 'admin', user:user.username });
    } else if (user.role === 'user') {
      // User login, generate user token
      const userToken = generateToken(user._id);
      return res.status(200).json({ message: 'User logged in successfully', token: userToken, role: 'user',user:user.username });
    } else {
      // Unexpected role
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};
