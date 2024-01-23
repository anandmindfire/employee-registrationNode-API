import employeeModel from '../../models/employeeModel.js';

/*
control the behavior of the GET /employees endpoint:
page: Page number for pagination (default is 1).
limit: Number of items per page (default is 10).
sortBy: Field to sort by (default is 'fullname').
order: Sorting order ('asc' for ascending, 'desc' for descending, default is 'asc').
For example, you can retrieve the second page of 5 items sorted by the 'dob' field in descending order
using the URL: http://localhost:5000/api/v1/table/employees?page=2&limit=5&sortBy=dob&order=desc.

http://localhost:5000/api/v1/table/employees?search=john - Search for employees with the name containing "john".
*/

export const getAllEmployees = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Sorting
    const sortField = req.query.sortBy || 'fullname';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

      // Search
      const keyword = req.query.search || '';

    // Retrieve employees with pagination ,sorting and searching
    const allEmployees = await employeeModel
    .find({
        $or: [
          { fullname: { $regex: keyword, $options: 'i' } }, // Case-insensitive substring match
        //   { email: { $regex: keyword, $options: 'i' } },
          // Add more fields for searching as needed
        ],
      })
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

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
