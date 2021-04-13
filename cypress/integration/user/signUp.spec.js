describe("sign up", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/signup");
  });

  afterEach(() => {
    cy.logout();
  });

  it("greets with Sign up", () => {
    cy.contains("[data-cy-signup-title]", "Sign up");
  });

  it("has valid link to /login", () => {
    cy.contains("[data-cy-signup-loginlink]", "Log In").should(
      "have.attr",
      "href",
      "/login"
    );
  });

  describe("name", () => {
    it("prevents missing name submission", () => {
      cy.get("[data-cy-signup-button]").click();
      cy.focused().should("have.attr", "type", "text");
    });

    it("prevents invalid name submission", () => {
      cy.get("[data-cy-signup-name]").type("e");
      cy.get("[data-cy-signup-email]").type("emi.m.humbert+test3@gmail.com");
      cy.get("[data-cy-signup-password]").type(`${Cypress.env("password")}`);
      cy.get("[data-cy-signup-button").click();
      cy.get("[data-cy-error]").should(
        "contain",
        "Should have at least 3 characters"
      );
    });
  });

  describe("email", () => {
    it("prevents missing email submission", () => {
      cy.get("[data-cy-signup-name]").type("Emilie");
      cy.get("[data-cy-signup-password]").type(`${Cypress.env("password")}`);
      cy.get("[data-cy-signup-button").click();
      cy.focused().should("have.attr", "type", "email");
    });

    it("prevents invalid email submission", () => {
      cy.get("[data-cy-signup-name]").type("Emilie");
      cy.get("[type=email]").type(`invalid`);
      cy.get("[data-cy-signup-password]").type(`${Cypress.env("password")}`);
      cy.get("[data-cy-signup-button").click();
      cy.focused().should("have.attr", "type", "email");
    });
  });

  describe("password", () => {
    it("prevents missing password submission", () => {
      cy.get("[data-cy-signup-name]").type("Emilie");
      cy.get("[data-cy-signup-email]").type("emi.m.humbert+test3@gmail.com");
      cy.get("[data-cy-signup-button").click();
      cy.focused().should("have.attr", "type", "password");
    });

    it("prevents invalid password submission", () => {
      cy.get("[data-cy-signup-name]").type("Emilie");
      cy.get("[data-cy-signup-email]").type("emi.m.humbert+test3@gmail.com");
      cy.get("[data-cy-signup-password]").type("e");
      cy.get("[data-cy-signup-button").click();
      cy.get("[data-cy-error]").should(
        "contain",
        "Should have at least 6 characters"
      );
    });
  });

  it("prevents signup when account already exist", () => {
    cy.get("[data-cy-signup-name]").type("Emilie");
    cy.get("[data-cy-signup-email]").type(`${Cypress.env("email")}`);
    cy.get("[data-cy-signup-password]").type(`${Cypress.env("password")}`);
    cy.get("[data-cy-signup-button").click();
    cy.get("[data-cy-error]").should(
      "contain",
      "The email address is already in use by another account"
    );
  });

  it("navigates to / on successul signup", () => {
    cy.get("[data-cy-signup-name]").type("Emilie");
    cy.get("[data-cy-signup-email]").type("emi.m.humbert+test3@gmail.com");
    cy.get("[data-cy-signup-password]").type(`${Cypress.env("password")}`);
    cy.get("[data-cy-signup-button").click();
    cy.location("pathname").should("eq", "/");
  });
});
