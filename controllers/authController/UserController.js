import userModel from '../../models/userModel.js';
import { hashPassword, comparePasswords } from '../../helpers/passwordHelper/hashPasswords.js';
import { validateAuth } from '../../helpers/validation/authValidation.js';

// GET request to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// PUT request to update user information
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const { username, email, password, role } = req.body;

    // Hash your passwords
    const hashedPassword = await hashPassword(password);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { username, email, password: hashedPassword, role },
      { new: true }
    );

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user',error });
  }
};

// DELETE request to delete a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
