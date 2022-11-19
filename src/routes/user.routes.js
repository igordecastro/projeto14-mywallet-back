import { signUp } from "../controllers/users.controller.js";
import { Router } from "express"; 

const router = Router();

router.post("/sign-up", signUp)

export default router;