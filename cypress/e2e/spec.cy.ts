/// <reference types="@testing-library/cypress" />
const path = require("path");

describe("Short link app", () => {
  it("generates a short url than can be copied, shared, visited and cleared", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Shorten links");
    cy.findByRole("textbox").type("https://www.google.com");
    cy.findByRole("button").click();
    cy.findByRole("button", { name: "Copy to clipboard" }).click();
    cy.findByRole("button", { name: "Share link" }).click();
    cy.findByRole("button", { name: "Visit link" }).click();
    cy.findByRole("button", { name: "Clear link" }).click();
  });

  it("displays a not found page when the route does not exist that enable the user to go to the homepage", () => {
    cy.visit({
      url: "http://localhost:3000/not-found",
      failOnStatusCode: false,
    });
    // Wait for uncaught exception (only in cypress)
    cy.on("uncaught:exception", (err) => {
      return false;
    });

    // Check that the 404 page is displayed
    cy.contains("Not Found");
    cy.contains("Generate a short URL").click();
    // Check it navigates to the homepage
    cy.contains("Shorten links");
  });

  it("displays error message when a input is empty", () => {
    cy.visit("http://localhost:3000");

    cy.findByRole("button").click();
    cy.contains("'url' is required");
    cy.contains("Submit failed!");
  });

  it("downloads a QR code when clicked on the download button", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("textbox").type("https://www.google.com");
    cy.get(".ant-qrcode").click();
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, "QRCode.png")).should("exist");
  });

  it("visits the page in a mobile device", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(375, 667);
    cy.contains("Shorten links");
    cy.findByRole("textbox").type("https://www.google.com");
    cy.findByRole("button").click();
  });
});
