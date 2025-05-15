import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';
import testData from '../data/testData.json';

// Credentials
const email = 'admin';
const password = 'password123';

test.describe('Login and Task Verification Tests', () => {
  let currentPage: Page; 
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => { 
    currentPage = page; 
    loginPage = new LoginPage(currentPage);
    dashboardPage = new DashboardPage(page);
    // Navigate to the demo app and login before each test
    await loginPage.goto();
    await loginPage.login(email, password);
    await expect(dashboardPage.getProjectHeaderTitle('Web Application')).toBeVisible(); // Default project
  });
    // Loop through the test data to create individual test cases
  for (const data of testData) {
    test(`Test Case ${data.id}: ${data.description}`, async () => {
      // 1. Navigate to the specified project (if not already on it)
        // Check current project in header to avoid unnecessary navigation clicks
      const currentProjectTitleLocator = currentPage.locator('header h1');
      const currentProjectTitleText = await currentProjectTitleLocator.innerText();
      if (currentProjectTitleText !== data.projectName) {
        await dashboardPage.navigateToProject(data.projectName);
      }
      // Verify header updated correctly
      await expect(dashboardPage.getProjectHeaderTitle(data.projectName)).toBeVisible();
      // 2. Get the specific card in the specified column
      const cardLocator = dashboardPage.getCardInColumn(data.columnName, data.cardTitle);
      // 3. Verify the card is visible (i.e., it's in the column)
      await expect(cardLocator).toBeVisible();
      // Verify the card title text explicitly on the card if needed
      await expect(cardLocator.getByRole('heading', { name: data.cardTitle, level: 3 })).toBeVisible();
      // 4. Confirm tags on the card
      await dashboardPage.verifyCardTags(cardLocator, data.tags);
    });
  }
});