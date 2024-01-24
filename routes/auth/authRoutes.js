import express from "express";
import { registerController ,loginController } from "../../controllers/authController/auth.js";


//router object
const router = express.Router();

//routing
//admin registrstion || METHOD POST
router.post("/register", registerController);



// Admin Login route
router.post("/login", loginController);


export default router;
