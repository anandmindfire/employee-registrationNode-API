import employeeModel from "../../models/employeeModel.js";

export const getAllEmployees = async (req, res) => {
    try {
      // Retrieve all employees from the database
      const allEmployees = await employeeModel.find();
  
      res.status(200).json({
        success: true,
        message: 'All employees retrieved successfully',
        employees: allEmployees,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error while retrieving employees',
        error,
      });
    }
  };