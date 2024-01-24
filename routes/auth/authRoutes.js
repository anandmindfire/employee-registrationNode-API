import express from "express";
import { registerController } from "../../controllers/authController/authRegistration.js";
import { loginController } from "../../controllers/authController/authLogin.js";


//router object
const router = express.Router();

//routing
//admin registrstion || METHOD POST
router.post("/register", registerController);



// Admin Login route
router.post("/login", loginController);


export default router;
