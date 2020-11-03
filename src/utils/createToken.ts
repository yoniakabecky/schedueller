import { sign } from "jsonwebtoken";
import { ObjectID } from "mongodb";

export const createAccessToken = (accountId: ObjectID) => {
  return sign(
    { id: accountId },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1d" }
  )
}
