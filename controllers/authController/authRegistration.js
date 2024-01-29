import userModel from '../../models/userModel.js';
import { hashPassword } from '../../helpers/passwordHelper/hashPasswords.js';
import { validateAuth } from '../../helpers/validation/authValidation.js';

// Admin registration
export const registerController = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;

    // Check if email is already registered
    const existingEmailUser = await userModel.findOne({ email: email });
    if (existingEmailUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered.'
      });
    }

    // Check if username is already registered
    const existingUsernameUser = await userModel.findOne({ username: username });
    if (existingUsernameUser) {
      return res.status(400).json({
        success: false,
        message: 'Username is already registered.'
      });
    }

    // Validate input data
    const validationResult = validateAuth(req.body);

    if (!validationResult.success) {
      return res.status(400).json(validationResult);
    }

    // Hash your passwords
    const hashedPassword = await hashPassword(password);
    const user = new userModel({ username, email, password: hashedPassword ,role});
    await user.save();

    res.status(201).json({ message: 'User registered successfully', username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};
