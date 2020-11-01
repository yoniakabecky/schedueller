import { sign } from "jsonwebtoken";
import { Account } from "../entity/Account";

export const createAccessToken = (account: Account) => {
  return sign(
    { id: account.id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1d" }
  )
}
