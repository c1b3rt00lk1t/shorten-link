describe("Short link app", () => {
  it("generates a short url than can be copied, shared, visited and cleared", async () => {
    cy.visit("http://localhost:3000");

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
    cy.contains("Let's share links ;)");
  });
});
