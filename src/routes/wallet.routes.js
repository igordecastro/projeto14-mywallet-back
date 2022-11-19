import { getWallet, postWallet } from "../controllers/wallet.controller.js";
import { Router } from "express"; 
// import signInValidation from "../middlewares/signInValidation.middleware.js";

const router = Router();

router.post("/wallet",postWallet)
router.get("/wallet", getWallet)

export default router;