import employeeModel from "../../models/employeeModel.js";

export const updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { fullname, email, dob, age, mobileno, gender, empid, role, address } = req.body;
    
        // Find the employee by ID
        const employee = await employeeModel.findById(employeeId);
    
        if (!employee) {
          return res.status(404).json({
            success: false,
            message: 'Employee not found',
          });
        }
    
        // Update employee's information
        const updatedEmployee = await employeeModel.findByIdAndUpdate(
          employeeId,
          {
            fullname: fullname || employee.fullname,
            email: email || employee.email,
            dob: dob || employee.dob,
            age: age || employee.age,
            mobileno: mobileno || employee.mobileno,
            gender: gender || employee.gender,
            empid: empid || employee.empid,
            role: role || employee.role,
            address: address || employee.address,
          },
          { new: true }
        );
    
        res.status(200).json({
          success: true,
          message: 'Employee updated successfully',
          updatedEmployee,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error while updating employee',
          error,
        });
      }
    };
    