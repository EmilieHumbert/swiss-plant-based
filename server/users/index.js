import { validateUser } from "../validation";

import { db } from "../../config/admin.config";

export async function createUser(id, data) {
  const valid = validateUser(data);
  if (!valid) {
    const validationError = new Error(
      `Validation error: ${validateUser.errors.join(", ")}`
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
  const valid = validateUser(data);
  if (!valid) {
    const validationError = new Error(
      `Validation error: ${validateUser.errors.join(", ")}`
    );
    validationError.statusCode = 400;
    throw validationError;
  }

  return db.collection("users").doc(id).update(data);
}
