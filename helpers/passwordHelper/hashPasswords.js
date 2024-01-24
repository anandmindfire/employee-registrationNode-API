// helpers/passwordHelpers
import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error while hashing password');
  }
};

export const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return passwordMatch;
  } catch (error) {
    throw new Error('Error while comparing passwords');
  }
};
