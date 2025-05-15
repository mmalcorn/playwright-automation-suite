// pages/LoginPage.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    console.log('LoginPage.ts Constructor called. Received page object:', page ? 'Defined' : 'UNDEFINED');
    this.page = page; 
    this.emailInput = this.page.getByLabel('Username'); 
    this.passwordInput = this.page.getByLabel('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Sign in' });
  }
  async goto() {
    await this.page.goto('/'); // Uses baseUrl from playwright.config.ts
  }
  async login(email: string, passwordValue: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(passwordValue);
    await this.loginButton.click();
    await this.page.waitForURL('/');
    await this.page.getByRole('heading', { name: 'Projects' }).waitFor();
  }
}