import bcrypt from "bcrypt";
import { usersCollection } from "../database/database.js";

export default async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Email is not valid, please sign up" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    req.signedInUser = user;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}
