import employeeModel from "../../models/employeeModel.js";

// DELETE request Delete an employee using its ID
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Check if the employee exists
    const existingEmployee = await employeeModel.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Remove the employee from the database
    await employeeModel.findByIdAndRemove(employeeId);

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while deleting employee',
      error,
    });
  }
};
