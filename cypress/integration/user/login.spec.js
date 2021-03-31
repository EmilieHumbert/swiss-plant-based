describe("/login", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/login");
  });

  it("greets with Log in", () => {
    cy.contains("[data-cy-title]", "Log in");
  });

  it("links to /signup", () => {
    cy.contains("[data-cy-signup]", "Sign up").should(
      "have.attr",
      "href",
      "/signup"
    );
  });

  it("requires email", () => {
    cy.get("form").contains("Log in").click();
    cy.focused().should("have.attr", "type", "email");
  });

  it("requires valid email", () => {
    cy.get("[type=email]").type(`invalid`);
    cy.get("form").contains("Log in").click();
    cy.focused().should("have.attr", "type", "email");
  });

  it("requires password", () => {
    cy.get("[type=email]").type(`${Cypress.env('email')}{enter}`);
    cy.focused().should("have.attr", "type", "password");
  });

  it("requires valid password", () => {
    cy.get("[type=email]").type(`${Cypress.env('email')}`);
    cy.get("[type=password]").type(`wrongPassword`);
    cy.get("form").contains("Log in").click();
    cy.get("[data-cy-error]").should('contain', 'The password is invalid')
  });

  it("navigates to / on successul login", () => {
    cy.get("[type=email]").type(`${Cypress.env('email')}`);
    cy.get("[type=password").type(`${Cypress.env('password')}{enter}`);
    cy.location('pathname').should("eq", "/");
  });
});
