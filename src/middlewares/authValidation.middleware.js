import { sessionsCollection, usersCollection } from "../database/database.js";

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const session = await sessionsCollection.findOne({ token });
  const user = await usersCollection.findOne({ _id: session?.userId });

  delete user.password;

  req.validUser = user;

  next();
}
