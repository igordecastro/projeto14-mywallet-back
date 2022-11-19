import userRouters from "./routes/user.routes.js"
import walletRouters from "./routes/wallet.routes.js"
import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors());
app.use(userRouters)
app.use(walletRouters)

app.listen(5000, () => console.log("Running in port 5000"))