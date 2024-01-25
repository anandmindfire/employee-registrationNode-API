import adminModel from '../../models/adminModel.js';
import { hashPassword } from '../../helpers/passwordHelper/hashPasswords.js';
import { validateAuth } from '../../helpers/validation/authValidation.js';

// Admin registration
export const registerController = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate input data
      const validationResult = validateAuth(req.body);
  
      if (!validationResult.success) {
        return res.status(400).json(validationResult);
      }
      
      //hash your passwords
      const hashedPassword = await hashPassword(password);
      const admin = new adminModel({ username, password: hashedPassword });
      await admin.save();
  
      res.status(201).json({ message: 'Admin registered successfully', username: admin.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  };


