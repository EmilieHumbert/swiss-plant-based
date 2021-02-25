import { db } from "../../config/admin.config";

export async function createUser(id, data) {
  return db.collection("users").doc(id).set(data);
}

export async function getUser(id) {
  const user = await db.collection("users").doc(id).get();
  return user.data();
}

export async function updateUser(id, data) {
  return db.collection("users").doc(id).update(data);
}
