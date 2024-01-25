import adminModel from '../../models/adminModel.js';
import { validateAuth } from '../../helpers/validation/authValidation.js';
import { comparePasswords } from '../../helpers/passwordHelper/hashPasswords.js';
import { generateToken } from '../../helpers/token/generateToken.js';

// Admin login
export const loginController =  async (req, res) => {
    try {
        const { username, password } = req.body;

         // Validate input data
      const validationResult = validateAuth(req.body);
  
      if (!validationResult.success) {
        return res.status(400).json(validationResult);
      }

        const admin = await adminModel.findOne({ username });
        if (!admin) {
            res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await comparePasswords(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        //generate tokens
        const token = generateToken(admin._id);
        res.status(200).json({message: 'Admin Logined successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
}
};

