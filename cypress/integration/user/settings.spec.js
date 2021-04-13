describe("/settings", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/settings");
  });

  afterEach(() => {
    cy.logout();
  });

  it("greets with Settings", () => {
    cy.contains("[data-cy-settings-title]", "Settings");
  });

  describe("image", () => {
    it("uploads picture", () => {
      cy.intercept("POST", "https://firebasestorage.googleapis.com/v0/b/**").as(
        "upload"
      );
      cy.intercept("GET", "https://firebasestorage.googleapis.com/v0/b/**").as(
        "download"
      );

      cy.get("[data-cy-image-input]").attachFile("testPicture.jpg");
      cy.wait("@upload");
      cy.wait("@download");

      cy.get("[data-cy-image-onchange]")
        .should("have.attr", "src")
        .and("match", /^https:\/\/ik\.imagekit\.io\//);
    });
  });

  describe("name", () => {
    it("prevents missing name submission", () => {
      cy.get("[data-cy-name-editbutton]").click();
      cy.get("[type='text']").clear();
      cy.get("[data-cy-submitbutton]").click();
      cy.focused().should("have.attr", "type", "text");
    });

    it("updates name", () => {
      cy.get("[data-cy-name-editbutton]").click();
      cy.get("[type='text']").clear();
      cy.get("[data-cy-input]").type("nametest");
      cy.get("[data-cy-submitbutton]").click();
      cy.reload();
      cy.get("[data-cy-name]").contains("nametest");
    });
  });

  describe("email", () => {
    it("prevents invalid email submission", () => {
      cy.get("[data-cy-email-editbutton]").click();
      cy.get("[type='email']").clear();
      cy.get("[data-cy-input]").type("emailtest");
      cy.get("[data-cy-submitbutton]").click();
      cy.focused().should("have.attr", "type", "email");
    });

    it("prevents missing email submission", () => {
      cy.get("[data-cy-email-editbutton]").click();
      cy.get("[type='email']").clear();
      cy.get("[data-cy-submitbutton]").click();
      cy.focused().should("have.attr", "type", "email");
    });

    it("updates email", () => {
      cy.intercept(
        "POST",
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo"
      ).as("setAccountInfo");
      cy.intercept(
        "POST",
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo"
      ).as("getAccountInfo");

      cy.wait("@getAccountInfo");

      // Set
      cy.get("[data-cy-email-editbutton]").click();
      cy.get("[type='email']").clear();
      cy.get("[data-cy-input]").type("emi.m.humbert+test1@gmail.com");
      cy.get("[data-cy-submitbutton]").click();
      cy.wait("@setAccountInfo");
      cy.wait("@getAccountInfo");
      cy.get("[data-cy-email]").contains("emi.m.humbert+test1@gmail.com");

      // Reset
      cy.get("[data-cy-email-editbutton]").click();
      cy.get("[type='email']").clear();
      cy.get("[data-cy-input]").type("emi.m.humbert+test@gmail.com");
      cy.get("[data-cy-submitbutton]").click();
      cy.wait("@setAccountInfo");
      cy.wait("@getAccountInfo");
      cy.get("[data-cy-email]").contains("emi.m.humbert+test@gmail.com");
    });
  });

  describe("password", () => {
    it("prevents invalid password submission", () => {
      cy.get("[data-cy-password-editbutton]").click();
      cy.get("[data-cy-input]").type("e");
      cy.get("[data-cy-submitbutton]").click();
      cy.get("[data-cy-error]").contains("Should have at least 6 characters");
    });

    it("prevents missing password submission", () => {
      cy.get("[data-cy-password-editbutton]").click();
      cy.get("[type='password']").clear();
      cy.get("[data-cy-submitbutton]").click();
      cy.focused().should("have.attr", "type", "password");
    });

    it("updates password", () => {
      cy.intercept(
        "POST",
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo**"
      ).as("setAccountInfo");
      cy.intercept(
        "POST",
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo**"
      ).as("getAccountInfo");

      cy.wait("@getAccountInfo");

      // Set
      cy.get("[data-cy-password-editbutton]").click();
      cy.get("[data-cy-input]").type("newPassword");
      cy.get("[data-cy-submitbutton]").click();
      cy.wait("@setAccountInfo");
      cy.wait("@getAccountInfo")
        .its("response.body.users.passwordpdatedAt")
        .should("include", /\d/);

      // Reset
      cy.get("[data-cy-password-editbutton]").click();
      cy.get("[data-cy-input]").type(`${Cypress.env("password")}`);
      cy.get("[data-cy-submitbutton]").click();
      cy.wait("@setAccountInfo");
      cy.wait("@getAccountInfo");
    });
  });

  describe("location", () => {
    it("prevents location having more than 100 characters", () => {
      cy.get("[data-cy-location-editbutton]").click();
      cy.get("[type='text']").clear();
      cy.get("[data-cy-input]").type(
        "LevoncourtLevoncourtLevoncourtLevoncourtLevoncourtLevoncourtLevoncourtLevoncourtLevoncourtLevoncourtLevoncourt"
      );
      cy.get("[data-cy-submitbutton]").click();
      cy.get("[data-cy-error]").should(
        "contain",
        "Location should NOT have more than 100 characters"
      );
    });

    it("updates location", () => {
      cy.get("[data-cy-location-editbutton]").click();
      cy.get("[type='text']").clear();
      cy.get("[data-cy-input]").type("Levoncourt");
      cy.get("[data-cy-submitbutton]").click();
      cy.get("[data-cy-location]").contains("Levoncourt");
    });
  });
});
