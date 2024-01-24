// validation
export const validateAuth = (data) => {
    const { username, password } = data;
  
    // Server-side validation
    if (!username || !password) {
      return {
        success: false,
        message: 'Both username and password are required',
      };
    }
  
    return { success: true };
  };
  