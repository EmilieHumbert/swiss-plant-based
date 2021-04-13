describe("navigation", () => {
  describe("when logged in", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/");
    });
    afterEach(() => {
      cy.logout();
    });

    it("sends you to '/' when clicking on home", () => {
      cy.visit("/settings");
      cy.get("[data-cy-navigation-homebutton]").click();
      cy.location("pathname").should("eq", "/");
    });

    it("sends you to '/profile' when clicking on profile", () => {
      cy.get("[data-cy-navigation-logo]").click();
      cy.get("[data-cy-navigation-profile]").click();
      cy.location("pathname").should("eq", "/profile");
    });

    it("sends you to '/settings' when clicking on settings", () => {
      cy.get("[data-cy-navigation-logo]").click();
      cy.get("[data-cy-navigation-settings]").click();
      cy.location("pathname").should("eq", "/settings");
    });

    it("sends you to '/login' when clicking on sign out", () => {
      cy.get("[data-cy-navigation-logo]").click();
      cy.get("[data-cy-navigation-signout]").click();
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("when logged out", () => {
    beforeEach(() => {
      cy.logout();
      cy.visit("/login");
    });

    it("sends you  to '/' when clicking on home", () => {
      cy.get("[data-cy-navigation-homebutton]").click();
      cy.location("pathname").should("eq", "/login");
    });

    it("sends you to /login when clicking on login button", () => {
      cy.get("[data-cy-navigation-login]").click();
      cy.location("pathname").should("eq", "/login");
    });

    it("sends you to /signup when clicking on sign up button", () => {
      cy.get("[data-cy-navigation-signin]").click();
      cy.location("pathname").should("eq", "/signup");
    });
  });
});
