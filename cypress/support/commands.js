import { auth } from "../../config/fire.config";
import "cypress-file-upload";

const email = Cypress.env("email");
const password = Cypress.env("password");

Cypress.Commands.add("login", () => {
  return auth.signInWithEmailAndPassword(email, password);
});

Cypress.Commands.add("logout", () => {
  return auth.signOut();
});
