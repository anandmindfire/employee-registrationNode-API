import employeeModel from "../../models/employeeModel.js";


export const addnewEmployee = async (req, res) => {
  try {
    const { fullname, email, dob, age, mobileno, gender,empid,role,address } = req.body;

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


