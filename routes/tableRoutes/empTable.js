// routes/tableRoutes/empTable.js
import express from "express";
import { getAllEmployees } from "../../controllers/tableController/getallEmployees.js";
import { getSingleEmployeeDetails } from "../../controllers/tableController/getSingleEmployee.js";
import { deleteEmployee } from "../../controllers/tableController/deleteEmployee.js";
import { editEmployee } from "../../controllers/tableController/editEmployee.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

// router object
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: EmployeeTable
 *   description: Operations related to employee tables
 */

/**
 * @swagger
 * /api/v1/table/employees:
 *   get:
 *     summary: Get all employees with pagination, sorting, and searching
 *     tags: [EmployeeTable]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page (default is 10).
 *         schema:
 *           type: integer
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by (default is 'fullname').
 *         schema:
 *           type: string
 *       - name: order
 *         in: query
 *         description: Sorting order ('asc' for ascending, 'desc' for descending, default is 'asc').
 *         schema:
 *           type: string
 *       - name: search
 *         in: query
 *         description: Search for employees with the name containing the specified string.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved employees
 *         content:
 *           application/json:
 *             example: { employees: [...], totalItems: 100, totalPages: 10, currentPage: 1 }
 *       '401':
 *         description: Unauthorized. User does not have the necessary permissions.
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 */

// Get all employees with pagination, sorting, and searching
/*
For example, you can retrieve the second page of 5 items sorted by the 'dob' field in descending order
using the URL: http://localhost:5000/api/v1/table/employees?page=2&limit=5&sortBy=dob&order=desc.

http://localhost:5000/api/v1/table/employees?search=john - Search for employees with the name containing "john".
*/
    router.get("/employees", verifyToken, getAllEmployees);

/**
 * @swagger
 * /api/v1/table/employees/{employeeId}:
 *   get:
 *     summary: Get details of a single employee
 *     tags: [EmployeeTable]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: ID of the employee to get details for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved employee details
 *         content:
 *           application/json:
 *             example: { employee:  }
 *       '401':
 *         description: Unauthorized. User does not have the necessary permissions.
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 */

// Get details of a single employee
    router.get('/employees/:employeeId', verifyToken, getSingleEmployeeDetails);

/**
 * @swagger
 * /api/v1/table/employees/{employeeId}:
 *   patch:
 *     summary: Update employee details
 *     tags: [EmployeeTable]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: ID of the employee to update details for
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               
 *     responses:
 *       '200':
 *         description: Employee details updated successfully
 *         content:
 *           application/json:
 *             example: { message: 'Employee details updated successfully', employee:  }
 *       '401':
 *         description: Unauthorized. User does not have the necessary permissions.
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 */

// Update employee details using employee id
    router.patch('/employees/:employeeId', verifyToken, editEmployee);

/**
 * @swagger
 * /api/v1/table/employees/{employeeId}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [EmployeeTable]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'Employee deleted successfully' }
 *       '401':
 *         description: Unauthorized. User does not have the necessary permissions.
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 */

// Delete an employee using employee id
    router.delete('/employees/:employeeId', verifyToken, deleteEmployee);

export default router;
