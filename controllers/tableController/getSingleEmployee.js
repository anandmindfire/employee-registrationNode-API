import employeeModel from "../../models/employeeModel.js";

// GET request get details of a single employee using its ID
export const getSingleEmployeeDetails = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Retrieve the employee details based on the employeeId
    const employeeDetails = await employeeModel.findById(employeeId);

    if (!employeeDetails) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Single Employee details retrieved successfully',
      employee: employeeDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while retrieving employee details',
      error,
    });
  }
};
