import { GuardError } from "../errors/GuardError.js";

export const runValidation = (schema, req) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
  } catch (err) {
    throw new GuardError("Validation failed", 400);
  }
};
