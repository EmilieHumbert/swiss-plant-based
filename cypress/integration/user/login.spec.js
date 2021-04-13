describe("/login", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/login");
  });

  it("greets with Log in", () => {
    cy.contains("[data-cy-login-title]", "Log in");
  });

  it("has valid link to /signup", () => {
    cy.get("[data-cy-login-signuplink]").click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("has valid link to /resetPassword", () => {
    cy.get("[data-cy-login-resetpasswordlink]").click();
    cy.location("pathname").should("eq", "/resetPassword");
  });

  describe("email", () => {
    it("prevents missing email submission", () => {
      cy.get("[data-cy-login-button]").click();
      cy.focused().should("have.attr", "type", "email");
    });

    it("prevents invalid email submission", () => {
      cy.get("[data-cy-login-email]").type(`invalid`);
      cy.get("[data-cy-login-button]").click();
      cy.focused().should("have.attr", "type", "email");
    });
  });
  describe("password", () => {
    it("prevents missing password submission", () => {
      cy.get("[data-cy-login-email]").type(`${Cypress.env("email")}{enter}`);
      cy.focused().should("have.attr", "type", "password");
    });

    it("prevents invalid password submission", () => {
      cy.get("[data-cy-login-email]").type(`${Cypress.env("email")}`);
      cy.get("[data-cy-login-password]").type(`wrongPassword`);
      cy.get("[data-cy-login-button]").click();
      cy.get("[data-cy-error]").should("contain", "The password is invalid");
    });
  });

  it("navigates to / on successul login", () => {
    cy.get("[data-cy-login-email]").type(`${Cypress.env("email")}`);
    cy.get("[data-cy-login-password]").type(
      `${Cypress.env("password")}{enter}`
    );
    cy.location("pathname").should("eq", "/");
  });
});
