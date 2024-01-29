import { validateEmployeeData } from '../../helpers/validation/employeeValidation.js';
import employeeModel from '../../models/employeeModel.js';

// POST request add new employee
export const addnewEmployee = async (req, res) => {
  try {
    const validationResult = validateEmployeeData(req.body);

    if (!validationResult.success) {
      return res.status(400).send(validationResult);
    }

    const { fullname, email, dob, age, mobileno, gender, empid, role, address } = req.body;

    // Check for existing user
    const existingUser = await employeeModel.findOne({ email });
    const createdByUser = req.user;

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Employee already added. Please add a different employee.',
      });
    }

    // Save new employee
    const employee = await new employeeModel({
      fullname,
      email,
      dob,
      age,
      mobileno,
      gender,
      empid,
      role,
      address,
      createdBy: createdByUser._id,
    }).save();

    res.status(201).send({
      success: true,
      message: 'Employee added successfully',
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in adding data',
      error,
    });
  }
};
