import express from "express";
import { addnewEmployee } from "../../controllers/formController/employeeController.js";
import { updateEmployee } from "../../controllers/formController/updateEmployee.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//new employee || METHOD POST
router.post("/employees",verifyToken, addnewEmployee);



// Update route definition with the employee ID parameter
router.put("/employees/:employeeId",verifyToken,updateEmployee);


export default router;
