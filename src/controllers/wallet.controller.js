import { usersCollection } from "../database/database.js";
import { walletSchema } from "../models/wallet.schema.js";
import dayjs from "dayjs";

export async function postWallet(req, res) {
  const transaction = req.body;
  const { value, type, description } = req.body;
  const validUser = req.validUser;
  const { error } = walletSchema.validate(transaction, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send(errors);
  }

  try {
    await usersCollection.updateOne(
      { _id: validUser._id },
      {
        $set: {
          wallet: [...validUser.wallet, {value, type, description, date: dayjs().format("DD/MM")}]
        },
      }
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getWallet(req, res) {
  const validUser = req.validUser;

  try {
    res.send(validUser.wallet);
  } catch (error) {
    console.log(error);
    res.sendStatus(200);
  }
}
