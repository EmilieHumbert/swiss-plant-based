describe("/settings", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/resetPassword");
  });

  it("greets with Reset your password", () => {
    cy.contains("[data-cy-resetpassword-title]", "Reset your password");
  });

  it("has valid link to /login", () => {
    cy.get("[data-cy-resetpassword-loginlink]").click();
    cy.location("pathname").should("eq", "/login");
  });

  it("prevents missing email submission", () => {
    cy.get("[data-cy-resetpassword-button]").click();
    cy.focused().should("have.attr", "type", "email");
  });

  it("prevents invalid email submission", () => {
    cy.get("[data-cy-resetpassword-email]").type("e");
    cy.get("[data-cy-resetpassword-button]").click();
    cy.focused().should("have.attr", "type", "email");
  });

  it("sends reset email", () => {
    cy.intercept(
      "POST",
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode"
    ).as("sendEmail");
    cy.get("[data-cy-resetpassword-email]").type(
      `${Cypress.env("email")}{enter}`
    );
    cy.wait("@sendEmail")
      .its("response.body.email")
      .should("include", `${Cypress.env("email")}`);
  });
});
