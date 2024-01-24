// validation
export const validateEmployeeData = (data) => {
    const { fullname, email, dob, age, mobileno, gender, empid, role, address } = data;
  
    if (!fullname || !email || !dob || !age || !mobileno || !gender || !empid || !role || !address) {
      return {
        success: false,
        message: 'All fields are required',
      };
    }
  
    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please provide a valid email address',
      };
    }
  
    // Validate mobile number format
    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (!mobileRegex.test(mobileno)) {
      return {
        success: false,
        message: 'Please provide a valid 10-digit mobile number',
      };
    }
  
    return { success: true };
  };
  

// validation/patch
export const validateEmployeeEditData = (data) => {
  const { email, mobileno } = data;

  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email && !emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please provide a valid email address',
    };
  }

  // Validate mobile number format
  const mobileRegex = /^[1-9][0-9]{9}$/;
  if (mobileno && !mobileRegex.test(mobileno)) {
    return {
      success: false,
      message: 'Please provide a valid 10-digit mobile number',
    };
  }

  return { success: true };
};
