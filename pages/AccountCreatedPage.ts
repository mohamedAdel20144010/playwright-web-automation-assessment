import { Page, expect } from '@playwright/test';

export class AccountCreatedPage {
  constructor(private readonly page: Page) {}

  async expectAccountCreated(): Promise<void> {
    await expect(this.page.locator('[data-qa="account-created"]')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Continue' })).toBeVisible();
  }

  async continueToHome(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}

export default AccountCreatedPage;
