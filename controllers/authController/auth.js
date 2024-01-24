import adminModel from '../../models/adminModel.js';
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';


// Admin registration
export const registerController =  async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin  = new adminModel({ username, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully',admin });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Admin login
export const loginController =  async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminModel.findOne({ username });
        if (!admin) {
            res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
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

