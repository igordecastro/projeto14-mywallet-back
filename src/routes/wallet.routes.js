import { getWallet, postWallet } from "../controllers/wallet.controller.js";
import { Router } from "express"; 
import authValidation from "../middlewares/authValidation.middleware.js";
// import signInValidation from "../middlewares/signInValidation.middleware.js";

const router = Router();

router.use(authValidation)
router.post("/wallet",postWallet)
router.get("/wallet", getWallet)

export default router;