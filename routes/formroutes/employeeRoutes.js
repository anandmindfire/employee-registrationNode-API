import express from "express";
import { addnewEmployee } from "../../controllers/formController/employeeController.js";
import { updateEmployee } from "../../controllers/formController/updateEmployee.js";

//router object
const router = express.Router();

//routing
//new employee || METHOD POST
router.post("/employees", addnewEmployee);



// Update route definition with the employee ID parameter
router.put("/employees/update/:employeeId", updateEmployee);


export default router;
