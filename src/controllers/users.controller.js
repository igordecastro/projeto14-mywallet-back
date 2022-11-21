import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { sessionsCollection, usersCollection } from "../database/database.js";
import { userSchema } from "../models/user.schema.js";

export async function signUp(req, res) {
  const bodyInfos = req.body;
  const { username, email, password } = req.body;
  const { error } = userSchema.validate(bodyInfos, { abortEarly: false });

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
      username,
      email,
    };

    const passwordHash = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({ ...user, password: passwordHash, wallet: []});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const user = req.signedInUser;
  const token = uuidV4();
  delete user.password
  try {
    await sessionsCollection.insertOne({ token, userId: user._id });
    res.send({...user,token});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
