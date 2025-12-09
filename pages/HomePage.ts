import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  async openSignupLogin(): Promise<void> {
    const signupLoginLink = this.page.getByRole('link', { name: 'Signup / Login' });
    await signupLoginLink.click();
    await this.page.waitForURL('**/login');
  }
}

export default HomePage;
