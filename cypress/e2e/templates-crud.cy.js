/// <reference types="cypress" />
describe("Templates", () => {
  const username = "master-open-base-version_milosh.sjeklokja";
  const password = "Test1234.";

  beforeEach(() => {
    cy.visit("https://productionportal.master.mediagenix.io");

    cy.origin(
      "https://accounts.master.mediagenix.io",
      { args: { username, password } },
      ({ username, password }) => {
        cy.get('input[name="username"]').should("be.visible").type(username);
        cy.contains("button", "Proceed").click();
        cy.get('input[name="password"]')
          .should("be.visible")
          .type(password, { log: false });
        cy.contains("button", "Sign in").click();
      },
    );

    cy.get('[data-testing-name="dropdown-menu-trigger"]')
      .should("be.visible")
      .click();
    cy.contains("Production Portal").should("be.visible").click();
    cy.get('a[title="Go to configurations page"]').should("be.visible").click();
    cy.get('a[href="/configurations/templates"]').should("be.visible").click();
  });

  it("Create template successfully", () => {
    const templateName = `Testing Milosh Template ${Date.now()}`;

    cy.get('[data-testing-name="add-Template-button"]')
      .should("be.visible")
      .click();

    cy.get('[data-testing-name="templates-name-form-input"]', {
      timeout: 15000,
    })
      .should("be.visible")
      .clear()
      .type(templateName)
      .should("have.value", templateName);

    cy.get('[data-testing-name="templates-isDefault-form-input"]')
      .should("be.visible")
      .and("have.attr", "aria-checked", "false")
      .click();

    cy.get('[data-testing-name="templates-isDefault-form-input"]').should(
      "have.attr",
      "aria-checked",
      "true",
    );

    cy.get(
      '[data-testing-name="templates-section-1-open-actions-button"]',
    ).click();
    cy.get(
      '[data-testing-name="templates-section-1-action-Disable all"]',
    ).click();

    cy.get(
      '[data-testing-name="templates-general_1_isActive-form-input"]',
    ).should("have.attr", "aria-checked", "false");
    cy.get(
      '[data-testing-name="templates-general_2_isActive-form-input"]',
    ).should("have.attr", "aria-checked", "false");
    cy.get(
      '[data-testing-name="templates-general_3_isActive-form-input"]',
    ).should("have.attr", "aria-checked", "false");

    cy.get('[data-testing-name="save-form"]').scrollIntoView().click();
    cy.contains(/template created/i, { timeout: 20000 }).should("be.visible");

    cy.get("ul.ant-pagination").scrollIntoView().should("be.visible");
    cy.get("ul.ant-pagination").find("li.ant-pagination-item a").last().click();

    cy.contains("td", templateName)
      .parents("tr")
      .within(() => {
        cy.get('svg[data-icon="check"]').should("exist");
      });
  });

  it("Edit template successfully", () => {
    const updatedTemplateName = `Edited Template ${Date.now()}`;
    cy.visit(
      "https://productionportal.master.mediagenix.io/configurations/templates",
    );

    cy.get('[data-testing-name="templates-table"]').should("be.visible");

    cy.get('[data-testing-name="templates-table"] tbody tr')
      .not(".ant-table-measure-row")
      .first()
      .find('[data-testing-name="edit-button"]')
      .click({ force: true });
    cy.get('[data-testing-name="templates-name-form-input"]')
      .should("be.visible")
      .clear()
      .type(updatedTemplateName)
      .should("have.value", updatedTemplateName);
    cy.get('[data-testing-name="save-form"]').scrollIntoView().click();
    cy.contains(/template updated/i, { timeout: 20000 }).should("be.visible");
    cy.get('[data-testing-name="templates-table"]', { timeout: 20000 }).should(
      "be.visible",
    );
    cy.get('[data-testing-name="templates-table"]')
      .find("tbody tr")
      .not(".ant-table-measure-row")
      .first()
      .within(() => {
        cy.contains(updatedTemplateName).should("be.visible");
      });
  });
});
