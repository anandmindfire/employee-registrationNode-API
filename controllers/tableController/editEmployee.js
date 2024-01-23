import employeeModel from "../../models/employeeModel.js";

//PATCH request edit the required employee details using its ID
export const editEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { fullname, email, dob, age, mobileno, gender, empid, role, address } = req.body;
   
     // server side validation for PATCH request
     // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Validate mobile number format
    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (mobileno && !mobileRegex.test(mobileno)) {
      return res.status(400).send({
        success: false,
        message: 'Please provide a valid 10-digit mobile number',
      });
    }
       
        // Find the employee by ID
        const employee = await employeeModel.findById(employeeId);
    
        if (!employee) {
          return res.status(404).json({
            success: false,
            message: 'Employee not found',
          });
        }
    
        // Update employee's information
        const editedEmployee = await employeeModel.findByIdAndUpdate(
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
          message: 'Employee edited successfully',
          editedEmployee,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error while editing employee',
          error,
        });
      }
    };
    