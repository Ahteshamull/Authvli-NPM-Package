import { verifyJWT } from "./auth/jwt.js";
import { runValidation } from "./validation/validate.js";
import { GuardError } from "./errors/GuardError.js";

export const authveli = (options = {}) => {
  const {
    auth = false,
    roles = [],
    validate,
    jwtSecret,
    userKey = "user",
  } = options;

  return (req, res, next) => {
    try {
      // 🔐 Authentication
      if (auth) {
        if (!jwtSecret) {
          throw new GuardError("JWT secret missing", 500);
        }
        const user = verifyJWT(req, jwtSecret);
        req[userKey] = user;
      }

      // 🛡 Role Authorization
      if (roles.length) {
        const role = req[userKey]?.role;
        if (!roles.includes(role)) {
          throw new GuardError("Forbidden", 403);
        }
      }

      // ✅ Validation
      if (validate) {
        runValidation(validate, req);
      }

      next();
    } catch (err) {
      res.status(err.status || 400).json({
        success: false,
        message: err.message,
      });
    }
  };
};
