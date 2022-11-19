import bcrypt from "bcrypt";
import { usersCollection } from "../database/database.js";
import { userSchema } from "../models/user.schema.js";

// export async function signIn(req,res) {
//     const { user } = req.headers;

// }
export async function signUp(req, res) {
  const { name, password, email } = req.body;
  const { error } = userSchema.validate();

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const userAlreadyExists = await usersCollection.findOne({ email });

    if (userAlreadyExists) {
      return res.status(409).send({ message: "Email already registered" });
    }

    const user = {
      name,
      email,
    };

    const passwordHash = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({ ...user, password: passwordHash });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  res.sendStatus(201);
}
