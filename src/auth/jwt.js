import jwt from "jsonwebtoken";
import { GuardError } from "../errors/GuardError.js";

export const verifyJWT = (req, secret) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new GuardError("Unauthorized", 401);
  }

  const token = header.split(" ")[1];

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new GuardError("Invalid token", 401);
  }
};
