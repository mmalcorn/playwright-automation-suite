// pages/DashboardPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  // --- Navigation ---
  /**
   * Gets a locator for a project button in the sidebar.
   * @param projectName The exact name of the project (e.g., "Web Application").
   */
  getProjectNavButton(projectName: string): Locator {
    return this.page.locator('nav > button').filter({ has: this.page.getByRole('heading', { name: projectName, level: 2 }) });
    return this.page.locator('nav').getByRole('button', { name: projectName });
  }

  async navigateToProject(projectName: string) {
    await this.getProjectNavButton(projectName).click();
    // Wait for the header to update with the project name
    await this.getProjectHeaderTitle(projectName).waitFor();
  }

  // --- Header Information ---
  /**
   * Gets the main project title displayed in the header.
   * @param projectName The expected project name in the header.
   */
  getProjectHeaderTitle(projectName: string): Locator {
    // The header contains an <h1> with the project title.
    return this.page.locator('header').getByRole('heading', { name: projectName, level: 1 });
  }

  /**
   * Gets the project description displayed in the header.
   * @param projectDescription The expected project description.
   */
  getProjectHeaderDescription(projectDescription: string): Locator {
    // The header contains a <p> with the project description.
    return this.page.locator('header').getByText(projectDescription, { exact: true });
  }

  // --- Columns ---
  /**
   * Gets a locator for a specific Kanban column.
   * @param columnName The name of the column (e.g., "To Do", "In Progress").
   */
  getColumn(columnName: string): Locator {
    const columnSelector = `div.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4:has(h2.font-semibold.text-gray-700.mb-4.px-2:text-matches("^${columnName}"))`;
    return this.page.locator(`div.inline-flex.gap-6.p-6.h-full > ${columnSelector}`);
  }

  // --- Cards ---
  /**
   * Gets a locator for a specific card within a given column.
   * @param columnName The name of the column.
   * @param cardTitle The exact title of the card.
   */
  getCardInColumn(columnName: string, cardTitle: string): Locator {
    const columnLocator = this.getColumn(columnName);
    // Cards are divs with class 'bg-white p-4...' and contain an h3 with the card title.
    const cardSelector = `div.bg-white.p-4.rounded-lg.shadow-sm.border.border-gray-200:has(h3.font-medium.text-gray-900.mb-2:text-is("${cardTitle}"))`;
    return columnLocator.locator(cardSelector);
  }
  /**
   * Gets all tags for a given card locator.
   * Tags are <span> elements within a specific div structure.
   * @param cardLocator The locator for the card.
   */
  getCardTags(cardLocator: Locator): Locator {
    return cardLocator.locator('div.flex.flex-wrap.gap-2.mb-3 > span');
  }
  /**
   * Verifies if all expected tags are present on a card.
   * @param cardLocator The locator for the card.
   * @param expectedTags An array of tag strings to verify.
   */
  async verifyCardTags(cardLocator: Locator, expectedTags: string[]): Promise<void> {
    for (const tag of expectedTags) {
      // Check for each tag's visibility within the card's tags container.
      // Using getByText scoped to a span element that looks like a tag.
      const tagClassPartial = "span.px-2.py-1.rounded-full"; // Common classes for tags
      await expect(cardLocator.locator(tagClassPartial).getByText(tag, { exact: true })).toBeVisible();
    }
    // Optionally, verify the count of tags if it's important
    const allTagsOnCard = this.getCardTags(cardLocator);
    await expect(allTagsOnCard).toHaveCount(expectedTags.length);
  }

  // --- Logout ---
  getLogoutButton(): Locator {
      return this.page.getByRole('button', { name: 'Logout' });
  }

  async logout() {
      await this.getLogoutButton().click();
      // Wait for the login page to be visible again
      await this.page.waitForURL('/');
      await this.page.getByLabel('Username').waitFor();
  }
}