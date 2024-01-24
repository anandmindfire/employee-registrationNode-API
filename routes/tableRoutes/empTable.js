import express from "express";
import { getAllEmployees } from "../../controllers/tableController/getallEmployees.js";
import { getSingleEmployeeDetails } from "../../controllers/tableController/getSingleEmployee.js";
import { deleteEmployee } from "../../controllers/tableController/deleteEmployee.js";
import { editEmployee } from "../../controllers/tableController/editEmployee.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

//router object
const router = express.Router();

// Get all employees with pagination, sorting, and searching
router.get("/employees",verifyToken, getAllEmployees);

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

// Get details of a single employee
router.get('/employees/:employeeId',verifyToken,getSingleEmployeeDetails);

// Update employee details
router.patch('/employees/:employeeId',verifyToken,editEmployee);

// Delete an employee
router.delete('/employees/:employeeId',verifyToken,deleteEmployee);

export default router;