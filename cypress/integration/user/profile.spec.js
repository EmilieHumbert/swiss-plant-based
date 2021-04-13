describe("navigation", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/profile");
  });
  afterEach(() => {
    cy.logout();
  });

  it("display name in title", () => {
    cy.get("[data-cy-profile-title]").contains("nametest");
  });

  it("display your recipes title", () => {
    cy.get("[data-cy-profile-yourrecipes-title]").contains("Your recipes");
  });

  it("display saved recipes title", () => {
    cy.get("[data-cy-profile-savedrecipes-title]").contains("Saved recipes");
  });

  it("display profile image", () => {
    cy.get("[data-cy-profile-image]")
      .should("have.attr", "src")
      .and("contain", "profile_picture.jpg");
  });
});
