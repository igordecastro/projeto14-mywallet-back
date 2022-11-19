import { walletCollection } from "../database/database.js";
import { walletSchema } from "../models/wallet.schema.js";

export async function postWallet(req, res) {
  const exchange = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if(!token) return res.sendStatus(401)
  const { error } = walletSchema.validate(exchange, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send(errors);
  }
}

export async function getWallet(req, res) {
    
}