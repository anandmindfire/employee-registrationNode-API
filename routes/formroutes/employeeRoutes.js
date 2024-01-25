// routes/formRoutes/employeeRoutes.js
import express from "express";
import { addnewEmployee } from "../../controllers/formController/employeeController.js";
import { updateEmployee } from "../../controllers/formController/updateEmployee.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

// router object
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Operations related to employees
 */

/**

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Use the following format - "Bearer your_token_here"
 */

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               mobileno:
 *                 type: string
 *               gender:
 *                 type: string
 *               empid:
 *                 type: string
 *               role:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee added successfully
 *         content:
 *           application/json:
 *             example: { message: 'Employee added successfully', employee:  }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 */

// new employee || METHOD POST
    router.post("/employees", verifyToken, addnewEmployee);

/**
 * @swagger
 * /api/v1/employees/{employeeId}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employee]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: ID of the employee to be updated
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
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               mobileno:
 *                 type: string
 *               gender:
 *                 type: string
 *               empid:
 *                 type: string
 *               role:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example: { message: 'Employee updated successfully', employee:  }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 */

// Update route definition with the employee ID parameter
    router.put("/employees/:employeeId", verifyToken, updateEmployee);

export default router;
