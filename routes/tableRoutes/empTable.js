import express from "express";
import { getAllEmployees } from "../../controllers/tableController/getallEmployees.js";
import { getSingleEmployeeDetails } from "../../controllers/tableController/getSingleEmployee.js";
import { deleteEmployee } from "../../controllers/tableController/deleteEmployee.js";
import { editEmployee } from "../../controllers/tableController/editEmployee.js";

//router object
const router = express.Router();

// Route definition to get all employees
router.get("/employees", getAllEmployees);

// Get details of a single employee
router.get('/employees/:employeeId', getSingleEmployeeDetails);

// Update employee details
router.patch('/employees/edit/:employeeId', editEmployee);

// Delete an employee
router.delete('/employees/:employeeId', deleteEmployee);

export default router;