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
});
