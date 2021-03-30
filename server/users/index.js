import Ajv from "ajv";

import { db } from "../../config/admin.config";

const schema = require("../schemas/user.json");
const ajv = new Ajv();
const validate = ajv.compile(schema);

export async function createUser(id, data) {
  const valid = validate(data);
  if (!valid) {
    const validationError = new Error(
      `Validation error: ${validate.errors.join(", ")}`
    );
    validationError.statusCode = 400;
    throw validationError;
  }

  return db.collection("users").doc(id).set(data);
}

export async function getUser(id) {
  const user = await db.collection("users").doc(id).get();
  return user?.data();
}

export async function updateUser(id, data) {
  const valid = validate(data);
  if (!valid) {
    const validationError = new Error(
      `Validation error: ${validate.errors.join(", ")}`
    );
    validationError.statusCode = 400;
    throw validationError;
  }

  return db.collection("users").doc(id).update(data);
}
