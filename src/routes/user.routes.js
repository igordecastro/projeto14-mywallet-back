import { signIn, signUp } from "../controllers/users.controller.js";
import { Router } from "express"; 
import signInValidation from "../middlewares/signInValidation.middleware.js";

const router = Router();

router.post("/sign-up", signUp)
router.post("/sign-in", signInValidation, signIn)

export default router;