import employeeModel from "../../models/employeeModel.js";

//POST request add new employee
export const addnewEmployee = async (req, res) => {
  try {
    const { fullname, email, dob, age, mobileno, gender,empid,role,address } = req.body;

     // Server-side validation
     if (!fullname || !email || !dob || !age || !mobileno || !gender || !empid || !role || !address) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Validate mobile number format
    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (!mobileRegex.test(mobileno)) {
      return res.status(400).send({
        success: false,
        message: 'Please provide a valid 10-digit mobile number',
      });
    }


    //check user
    const exisitingUser = await employeeModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Added please add different employee",
      });
    }
    
    //save
    const employee = await new employeeModel({
      fullname,
      email,
      dob,
      age,
      mobileno,
      gender,
      empid,
      role,
      address
    }).save();

    res.status(201).send({
      success: true,
      message: "Employee added Successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Adding data",
      error,
    });
  }
};


