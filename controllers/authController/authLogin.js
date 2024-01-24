import adminModel from '../../models/adminModel.js';
import  jwt  from 'jsonwebtoken';
import { validateAuth } from '../../helpers/validation/authValidation.js';
import { comparePasswords } from '../../helpers/passwordHelper/hashPasswords.js';

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
        const token = jwt.sign({ adminId: admin._id },process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
        res.status(200).json({message: 'Admin Logined successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
}
};

