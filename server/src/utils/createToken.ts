import { sign } from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const createAccessToken = (accountId: ObjectId) => {
  return sign(
    { id: accountId },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1d" }
  )
}
